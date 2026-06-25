"""
csv_to_json.py

Usage:
    python csv_to_json.py --csv results.csv --out semantic_outputs/
"""

import argparse
import csv
import json
import os
import ast
from datetime import datetime
from pathlib import Path


def safe_parse_json(raw: str) -> dict:
    """Parse cột parsed_json (đã là JSON string thuần)."""
    if not raw or raw.strip() == "":
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Fallback: try eval if Python dict string
        try:
            return ast.literal_eval(raw)
        except Exception:
            return {}


def row_to_json(row: dict) -> dict:
    """Chuyển 1 dòng CSV → dict theo format save_parsed_output."""
    parsed_data = safe_parse_json(row.get("parsed_json", ""))

    try:
        structural_risk_score = float(row.get("structural_risk_score", 0))
    except (ValueError, TypeError):
        structural_risk_score = 0.0

    has_structural_backup = structural_risk_score > 0
    confirmed_signals_count = 1 if has_structural_backup else 0  # conservative estimate

    created_at = row.get("timestamp", datetime.now().isoformat())

    result = {
        "package_name": row.get("package_name", ""),
        "version":      row.get("version", ""),
        "label":        row.get("label", ""),
        # --- Core findings ---
        "behaviors":    parsed_data.get("behaviors", []),
        "risk_vector":  parsed_data.get("risk_vector", []),
        "analyst_note": row.get("analyst_note", "") or "",
        # --- Analysis metadata ---
        "analysis_metadata": {
            "model":                    row.get("model_name", "deepseek-coder-6.7b-instruct"),
            "stage":                    row.get("prompt_version", "semantic_v2.0"),
            "routing":                  row.get("routing", ""),
            "structural_risk_score":    structural_risk_score,
            "confirmed_signals_count":  confirmed_signals_count,
            "has_structural_backup":    has_structural_backup,
        },
        "created_at": created_at,
    }
    return result


def main():
    parser = argparse.ArgumentParser(description="Convert semantic CSV → per-package JSON files")
    parser.add_argument(
        "--csv",
        default="experiment_results/semantic_analysis.csv",
        help="Path to input CSV file",
    )
    parser.add_argument(
        "--out",
        default="experiment_results/semantic_output",
        help="Output directory for JSON files",
    )
    parser.add_argument("--skip-errors", action="store_true",
                        help="Skip rows with parse errors instead of stopping")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    success, skipped, errors = 0, 0, 0

    with open(args.csv, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=1):
            pkg  = row.get("package_name", f"unknown_{i}")
            ver  = row.get("version", "0.0.0")

            if row.get("parse_success", "True").strip().lower() == "false":
                parsed = safe_parse_json(row.get("parsed_json", ""))
                if not parsed:
                    print(f"[SKIP] {pkg}=={ver}: parse_success=False và parsed_json trống")
                    skipped += 1
                    continue

            try:
                result = row_to_json(row)
            except Exception as e:
                if args.skip_errors:
                    print(f"[ERROR] {pkg}=={ver}: {e}")
                    errors += 1
                    continue
                raise

            safe_name = f"{pkg.replace('/', '#')}-{ver}.json"
            file_path = out_dir / safe_name

            with open(file_path, "w", encoding="utf-8") as jf:
                json.dump(result, jf, indent=2, ensure_ascii=False)

            success += 1
            print(f"[OK] {safe_name}")

    print(f"\n✅ Done: {success} saved | {skipped} skipped | {errors} errors")
    print(f"📁 Output: {out_dir.resolve()}")


if __name__ == "__main__":
    main()