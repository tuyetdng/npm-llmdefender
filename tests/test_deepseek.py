# test_deepseek.py
import sys
from pathlib import Path

from models.providers.deepseek_adapter import DeepSeekAdapter
import time, json

sys.path.append(str(Path(__file__).resolve().parent.parent / "src"))


def main():
    # cấu hình (tuỳ chỉnh nếu cần)
    config = {
        "torch_dtype": "float16",   # nếu GPU hỗ trợ fp16
        "device_map": "auto",
        "max_new_tokens": 256,
        "temperature": 0.0,
        "top_k": 50,
        "top_p": 0.95,
        "do_sample": False
    }

    adapter = DeepSeekAdapter(config=config)

    prompt = (
        "You are a security analyst. "
        "Given the following package info and a short snippet of code, "
        "extract the package's semantic behavior in JSON with keys: "
        "package_name, behaviors (list), suspicious_patterns (list), evidence (dict), confidence (0-1). "
        "Return valid JSON only.\n\n"
        "===PACKAGE.JSON===\n"
        '{"name": "example", "version":"1.0.0"}\n\n'
        "===FILE: index.js===\n"
        "console.log('hello world');\n"
    )

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
