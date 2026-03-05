import os
import subprocess
import json

# Ép UTF-8 cho Windows
os.environ["PYTHONUTF8"] = "1"

def inspect_package(path):
    print(f"--- Đang kiểm tra sâu: {os.path.basename(path)} ---")
    try:
        # Chạy GuardDog ngay tại thư mục của gói (dùng cwd và ".")
        result = subprocess.run(
            ["guarddog", "npm", "scan", ".", "--output-format", "json"],
            cwd=path,
            capture_output=True, 
            text=True, 
            timeout=60,
            encoding='utf-8', 
            errors='ignore'
        )

        # 1. In thử mã thoát (Exit code) - GuardDog thường trả về 0 kể cả khi có lỗi bảo mật
        print(f"Exit Code: {result.returncode}")

        # 2. Nếu có lỗi hệ thống (stderr)
        if result.stderr:
            print(f"System Stderr: {result.stderr}")

        # 3. Phân tích kết quả JSON
        if not result.stdout.strip():
            print("Kết quả: Trống (No Output)")
            return

        data = json.loads(result.stdout)
        
        # In toàn bộ JSON để soi cấu trúc (đã format đẹp)
        # print("JSON RAW:", json.dumps(data, indent=2)) 

        issues = data.get("issues", [])
        if isinstance(issues, list) and len(issues) > 0:
            print(f"SỐ LƯỢNG LỖ TÌM THẤY: {len(issues)}")
            print("-" * 30)
            for issue in issues:
                rule = issue.get("rule")
                description = issue.get("description")
                print(f"[!] Vi phạm luật: {rule}")
                print(f"    Mô tả: {description}")
                print("-" * 30)
        else:
            print("KẾT QUẢ: GuardDog không tìm thấy bất kỳ dấu hiệu khả nghi nào (Clean).")

    except Exception as e:
        print(f"Lỗi Python: {e}")

# THAY ĐƯỜNG DẪN GÓI BẠN MUỐN KIỂM TRA VÀO ĐÂY
test_path = r"C:\PROJECT_BUILDING\CAPSTONE\LLMDefender_core\npm-llmdefender\extracted_packages\mal\@anemone95evil-1.0.9"
inspect_package(test_path)