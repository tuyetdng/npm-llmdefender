# SEMAD: Semantic-Enhanced Malicious Package Detection Using LLMs and Prompt Engineering

[![Python](https://img.shields.io/badge/python-3.10%2B-blue)]()
[![PyTorch](https://img.shields.io/badge/framework-PyTorch-red)]()
[![Status](https://img.shields.io/badge/status-research%20artifact-orange)]()

**SEMAD** (Structural-Enhanced Malware Analysis and Detection) is a hierarchical hybrid framework for detecting malicious npm packages and reconstructing their **behavioral attack chains**. Instead of a single binary "malicious / benign" verdict, SEMAD combines deterministic static program analysis with LLM-based semantic reasoning to explain *how* an attack unfolds - from install-hook trigger to data exfiltration or backdoor persistence.

This repository contains the reference implementation accompanying the paper:

> Tuyet A. Dang-Thi, Hoang-Ly Nguyen, Thanh M. Truong-Le, Duc-Ly Vu.
> *SEMAD: Semantic-Enhanced Malicious Package Detection Using LLMs and Prompt Engineering.*
> Submitted to *Information and Software Technology (IST)*, 2026.

---

## 1. Overview

Conventional npm malware scanners are largely limited to binary classification and cannot explain the *sequential stages* of an attack (analogous to the Cyber Kill Chain). SEMAD addresses this gap with a **five-stage pipeline**:

```
npm package (.tar.gz)
        │
        ▼
 Step 0 - Data Ingestion            (rule-based)   Secure extraction + PackageProfile
        │
        ▼
 Step 1 - Structural Analysis       (rule-based)   L1: metadata/hook scan
        │                                          L2: AST-based taint tracking
        │                                          SignalAggregator → StructuralContext
        ▼
 Step 2 - Semantic Analysis         (LLM)          Attention-primed behavior classification
        │                                          (DeepSeek-Coder-6.7B-Instruct)
        ▼
 Step 3 - Verification              (LLM, cond.)   Attack-chain reconstruction +
        │                                          contextual legitimacy check
        │                                          (only runs if ≥1 behavior detected)
        ▼
 Step 4 - Final Classification      (deterministic) Confidence calibration
        │                                          → verdict + risk level
        ▼
   JSON report  +  Markdown report
```

Steps 0-1 are fully rule-based and require no LLM. Steps 2-3 invoke a locally-hosted LLM. Step 4 applies a fixed, non-generative scoring function so that identical structured inputs always produce identical final verdicts (reproducibility and auditability by design).

### Key contributions

- **Attention-primed LLM prompting** - pre-computed structural risk profiles are injected into the semantic prompt to anchor the model's focus on anomalous constructs.
- **Context-aware target routing** - packages are triaged into `flag` / `review` / `skip` tiers, controlling both LLM context budget and prompt framing.
- **Evidence-grounded behavioral classification** - every detected behavior must cite concrete indicators (API calls, commands, domains, file paths) against a fixed taxonomy.
- **Interpretable attack-chain reconstruction** - a dedicated verification stage links isolated behaviors into a causally ordered narrative (0.98 verification recall in our evaluation).
- **Deterministic confidence calibration** - the final verdict is computed by a fixed, non-LLM scoring function, eliminating silent generative failures.

---

## 2. Repository Structure

```
NPM-LLMDEFENDER/
├── config/                          # Logging & model configuration
│   ├── csv_logger_config.py
│   └── model_config.py
│
├── dataset/                         # Raw package archives
│   ├── ben/                         #   benign samples
│   └── mal/                         #   malicious samples
│
├── extracted_packages/              # Sandboxed extraction output (ben/ mal/)
│
├── experiment_results/
│   ├── semantic_output/             # Step 2 raw JSON per package
│   ├── verification_output/         # Step 3 raw JSON per package
│   ├── output_machine_readable/     # Step 4 final JSON verdicts
│   ├── report_human_readable/       # Step 4 final Markdown reports
│   ├── visualizer/                  # Figures used in the paper (routing, confidence, etc.)
│   └── *.csv                        # Aggregated logs (structural / semantic / verification)
│
├── src/
│   ├── analysis/
│   │   ├── structural_analysis.py   # Layer 1 (metadata + install-hook heuristics)
│   │   ├── ast_analyzer.py          # Layer 2 (tree-sitter AST + TaintTracker)
│   │   └── signal_aggregator.py     # SignalAggregator → StructuralContext
│   │
│   ├── data/
│   │   ├── loader.py                # DatasetLoader (secure ETL, caching, validation)
│   │   └── models.py                # PackageProfile
│   │
│   ├── detection/decision/
│   │   ├── classificator.py         # FinalClassifier (deterministic calibration)
│   │   └── batch_classifier.py
│   │
│   ├── enums/
│   │   ├── behavior_category.py     # Fixed malicious-behavior taxonomy
│   │   └── severity.py
│   │
│   ├── models/
│   │   ├── prompts/templates/
│   │   │   ├── semantic_prompt_analysis.py       # Step 2 prompt builder
│   │   │   └── multi_perspective_verification.py # Step 3 prompt builder
│   │   └── providers/
│   │       ├── base_adapter.py       # Abstract LLMAdapter interface
│   │       └── deepseek_adapter.py   # DeepSeek-Coder-6.7B-Instruct adapter (4-/8-bit, HF)
│   │
│   └── utils/
│       └── response_parser.py        # Fault-tolerant JSON extraction/repair
│
├── tests/                             # Per-stage manual test scripts (see §6)
│
├── run_pipeline.py                    # Single-package end-to-end CLI entry point
├── benchmark.py / benchmark_tools.py  # Batch evaluation utilities
├── pyproject.toml / poetry.lock       # Dependency management (Poetry)
└── README.md
```

---

## 3. Methodology Summary

### 3.1 Step 0 - Data Ingestion (`src/data/loader.py`)

- Extracts `.tar.gz` archives into a sandboxed directory; `is_safe_path()` guards against path-traversal ("Zip Slip") attacks; file permissions are normalized (dirs `755`, files `644`).
- Retains only security-critical artifacts: `package.json`, lifecycle scripts (`preinstall`, `postinstall`), and the entry point (`index.js` / `main.js`).
- Caches parsed `PackageProfile` objects via `pickle` to avoid repeated I/O. 
- Filters corrupted archives / invalid manifests and enforces a balanced malicious/benign split for controlled experiments.

### 3.2 Step 1 - Structural Analysis (`src/analysis/`)

- **Layer 1 (metadata):** regex / string-matching / edit-distance heuristics over `package.json` and install hooks - 7 risk dimensions (install-hook scan, install-script scan, typosquatting, dependency confusion, hardcoded external IP, version inflation, empty package). 
- **Layer 2 (AST):** `tree-sitter`-based parsing of JavaScript source; includes a two-pass interprocedural `TaintTracker` (source: `process.env.*` → sink: `fetch`/`axios`/`http.*`) that reports `credential_exfiltration_path` at HIGH severity, plus detectors for obfuscator signatures, encoded `require()`, indirect `eval`, hardcoded URLs/IPs, and dynamic `child_process` execution. 
- **SignalAggregator:** deterministically combines both layers into a scalar risk score

  ```
  s = min( Σ_f  w_sev(f) · c_f  /  N ,  1.0 ),   N = 1.5
  ```

  where `w_sev` ∈ {CRITICAL=1.0, HIGH=0.7, MEDIUM=0.3, LOW=0.0} and `c_f` is per-finding confidence. Findings are tiered into confirmed (`c ≥ 0.70`), supporting (`0.40 ≤ c < 0.70`), and filtered noise (`c < 0.40`). The risk score maps to a routing decision - `skip` (`s < 0.30`), `review` (`0.30 ≤ s < 0.60`), `flag` (`s ≥ 0.60`) - which controls the semantic-stage context budget (4,000 / 7,000 / 10,000 characters respectively). **All packages proceed to Step 2 regardless of tier** - routing is a token allocation strategy, not a gatekeeping filter.

### 3.3 Step 2 - Semantic Analysis (`src/models/prompts/templates/semantic_prompt_analysis.py`)

- Runs a locally-hosted **DeepSeek-Coder-6.7B-Instruct** model via `DeepSeekAdapter` (`src/models/providers/deepseek_adapter.py`), which supports FP16 / 4-bit / 8-bit loading.
- Prompt architecture: persona adoption (security analyst role), structural-context injection, metadata anchoring, prioritized code segmentation (hooks before library code), routing-aware instructions, a fixed behavior taxonomy constraint, and strict JSON schema enforcement. 
- Output is parsed by a fault-tolerant extractor (`src/utils/response_parser.py`) that repairs trailing commas, markdown fences, and inline comments; non-JSON trailing text is retained as an optional analyst note.

### 3.4 Step 3 - Verification (`src/models/prompts/templates/multi_perspective_verification.py`)

- Runs **only if** Step 2 detected at least one behavior.
- The LLM performs two complementary checks: (1) reconstructs a causal attack chain linking detected behaviors, and (2) assesses contextual legitimacy against the package's stated purpose (description, keywords, documentation).
- Produces a chain narrative, an ordered attack-vector/IOC list, a chain coherence score ∈ [0, 1], and a preliminary verdict (`MALICIOUS` / `SUSPICIOUS` / `BENIGN`).

### 3.5 Step 4 - Final Classification (`src/detection/decision/classificator.py`)

Fully deterministic - no LLM involved.

```
c_final = 0.40 · c̄_sem + 0.60 · s_chain     (if verification ran)
c_final = c̄_sem                             (semantic-only fallback)
```

- Semantic-only fallback thresholds: `≥0.70 → MALICIOUS`, `≥0.45 → SUSPICIOUS`, else `BENIGN`.
- Risk level (`CRITICAL/HIGH/MEDIUM/LOW/NONE`) additionally escalates to `CRITICAL` whenever a `MALICIOUS` verdict co-occurs with a high-impact category (RCE, credential theft, backdoor, supply-chain propagation) and `c_final ≥ 0.70`.
- Clean path: if Step 2 finds no behaviors but structural risk `s ≥ 0.60`, the verdict is demoted to `SUSPICIOUS`/`LOW` rather than silently marked clean.
- Emits two artifacts per package: a machine-readable JSON record (`experiment_results/output_machine_readable/`) for CI/CD or dashboard integration, and a human-readable Markdown report (`experiment_results/report_human_readable/`) with executive summary, IOCs, evidence, and remediation steps.

---

## 4. Installation

```bash
git clone <repo-url>
cd NPM-LLMDEFENDER

# Dependency management via Poetry
poetry install
```

### Requirements

- Python ≥ 3.10
- PyTorch (CUDA-enabled build)
- `transformers`
- `bitsandbytes` (for 4-bit / 8-bit quantized inference)
- `tree-sitter` (+ JavaScript grammar) for AST-based structural analysis
- A CUDA-capable GPU is strongly recommended for Step 2/3 (see §5 for the reference
  environment; 4-bit quantization is supported for smaller GPUs)

> Exact pinned versions are defined in `pyproject.toml` / `poetry.lock`.

---

## 5. Reference Experimental Environment

- **Hardware:** 2× NVIDIA GeForce RTX 3080 (20 GB total VRAM)
- **Model:** `deepseek-ai/deepseek-coder-6.7b-instruct`, loaded in `torch.float16`,
  `device_map="auto"`
- **Generation config:** `temperature=0.0`, `do_sample=False` (greedy decoding for full
  reproducibility), `max_new_tokens=4096`

---

## 6. Usage

### 6.1 Run the full pipeline on a single package

```bash
python run_pipeline.py --package 1ru-cache-0.0.1
```

This runs Steps 0–4 sequentially for the package located under `dataset/mal/` or `dataset/ben/`, writing intermediate results to `experiment_results/semantic_output/` and `experiment_results/verification_output/`, and the final verdict to `experiment_results/output_machine_readable/` and `experiment_results/report_human_readable/`. 
Programmatic usage:

```python
from run_pipeline import PipelineRunner

runner = PipelineRunner("1ru-cache-0.0.1")
runner.run()
```

### 6.2 Run an individual stage (for debugging / ablation)

Scripts under `tests/` allow inspecting each stage in isolation, given previously saved
intermediate outputs:

```bash
python tests/test_structural_analyser_v2.py          # Layer 1 + Layer 2 + Aggregator
python tests/test_semantic_prompt_analysis_v2.py      # Step 2 only
python tests/test_multi_perspective_verification.py   # Step 3 only
python tests/test_final_classifier.py --package 1ru-cache-0.0.1   # Step 4 only, from saved JSON
```

`test_final_classifier.py` loads `semantic_output/<package>.json` (required) and `verification_output/<package>.json` (optional - falls back to semantic-only calibration if absent), then reproduces the same verdict, executive summary, IOCs, and reports as the full pipeline. 

---

## 7. Dataset

Experiments are conducted on a curated subset of **MalnpmDB** (Wang et al., 2025):

| | Total | Malicious | Benign |
|---|---|---|---|
| Full corpus | 7,309 packages | - | - |
| Evaluation subset used in this study | **246** | **142** | **104** |

The subset was sampled to cover a diverse range of threat vectors while keeping deep, multi-layered forensic inspection computationally feasible.

---

## 8. Limitations

- Preliminary case-study-scale evaluation (246 packages); a large-scale benchmark across the full MalnpmDB corpus is left to future work.
- The contextual legitimacy check relies on package metadata/documentation, which sophisticated adversaries could craft to evade verification.
- Semantic-stage LLM inference introduces per-package latency (~5–9s), which is acceptable for targeted audits but not yet suited to real-time, synchronous registry-scale ingestion.
- Results are tied to the specific model (DeepSeek-Coder-6.7B-Instruct) and prompt templates used; cross-model generalization has not yet been evaluated.

---

## 10. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 11. Data Availability

The SEMAD source code is publicly available in this repository and archived on Zenodo (DOI:https://doi.org/10.5281/zenodo.21205974).

The evaluation dataset is derived from **MalnpmDB**, introduced by Wang et al. in *"MalPacDetector: An LLM-based Malicious NPM Package Detector"* (IEEE Transactions on Information Forensics and Security, 2025; [repository](https://github.com/CGCL-codes/MalPacDetector-core)). In accordance with the original authors' data-sharing policy, the malicious package samples are **not redistributed in this repository** for security reasons. Researchers who wish to obtain the dataset for academic purposes should contact the original authors directly at `hust_jianw@hust.edu.cn`, as instructed in the MalPacDetector repository. 

The curated evaluation subset used in this study (246 packages: 142 malicious, 104 benign) is a sample drawn from MalnpmDB; 

If you use this dataset, please cite both this work and the original MalnpmDB/MalPacDetector paper (Wang et al., 2025).

## 12. Authors

- Tuyet A. Dang-Thi - Eastern International University (tuyet.dangthi.cit21@eiu.edu.vn)
- Hoang-Ly Nguyen - Eastern International University (ly.nguyen@eiu.edu.vn)
- Thanh M. Truong-Le - Eastern International University (thanh.truonglemy@eiu.edu.vn)
- Duc-Ly Vu (corresponding author) - Thu Dau Mot University (ly.vu@eiu.edu.vn)