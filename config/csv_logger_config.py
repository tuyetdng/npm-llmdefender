"""
Docstring for config .csv_logger_config
"""
import csv
from datetime import datetime
import json
import os
from pathlib import Path
import sys
from typing import Dict, List, Optional
import uuid

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

from analysis.structural_analysis import StructuralAnalysisFinding


class CSVLoggerConfig:
    """
    Configuration class for CSV Logger.
    """

    def __init__(self, output_dir: str, prompt_version: str):
        self.output_dir = output_dir
        self.prompt_version = prompt_version
        os.makedirs(output_dir, exist_ok=True)
        self.behavior_counter = {}
        
    def log_structural_anlyser(self, package_name: str, version: str, findings: List[StructuralAnalysisFinding]):
        """
        Logs structural analysis findings to a CSV file.

        Args:
            package_name (str): Name of the package.
            version (str): Version of the package.
            findings (List[StructuralAnalysisFinding]): List of structural analysis findings.
        """
        timestamp = datetime.now().isoformat()
        
        raw_output = [
            {
                'risk_type': f.risk_type,
                'severity': f.severity.value,
                'evidence': f.evidence,
                'confidence': f.confidence,
                'category': f.category.value
            }
            for f in findings
        ]
        
        row = {
            'package_name': package_name,
            'version': version,
            'timestamp': timestamp,
            'total_risks_found': len(findings),
            'risk_types': ';'.join([f.risk_type for f in findings]) if findings else '',
            'severities': ';'.join([f.severity.value for f in findings]) if findings else '',
            'categories': ';'.join([f.category.value for f in findings]) if findings else '[]',
            'max_severity': max([f.severity.value for f in findings], default='none'),
            'raw_output': json.dumps(raw_output)
        }
        
        self._append_to_csv('structural_analysis_log.csv', row)
        
    def log_semantic_analysis(self, package_name: str, version: str,
                             raw_response: str, parsed_json: Optional[Dict]):
        """Log LLM analysis results"""
        timestamp = datetime.now().isoformat()
        
        if parsed_json:
            behaviors = parsed_json.get('behaviors', [])
            
            for i, behavior in enumerate(behaviors):
                if 'id' not in behavior:
                    behavior['id'] = f"BR{uuid.uuid4().hex[:8].upper()}"
                    
            row = {
                'package_name': package_name,
                'version': version,
                'timestamp': timestamp,
                'model_name': 'DeepSeek-Coder-6.7B-Instruct',
                'prompt_version': self.prompt_version,
                'total_risks_found': len(behaviors),
                'behavior': ';'.join(sorted({b.get('category','') for b in behaviors})),
                'risk_vector': json.dumps(parsed_json.get('risk_vector', [])),
                'max_confidence': max((b.get('confidence', 0) for b in behaviors), default=0),
                'raw_response': raw_response[:5000],  # Truncate
                'parsed_json': json.dumps(parsed_json)
            }
            self._append_to_csv('semantic_analysis.csv', row)
            
            for behavior in behaviors:
                self._log_individual_behavior(package_name, version, behavior, 'semantic_analysis')
                
    def _log_individual_behavior(self, package_name: str, version: str, 
                            behavior: Dict, detected_in: str):
        """Log individual behavior for granular analysis"""
        timestamp = datetime.now().isoformat()
        
        behavior_id = behavior.get('id')
        if not behavior_id:
            behavior_id = f"BR{uuid.uuid4().hex[:8].upper()}"
        
        details = behavior.get('details', {})
        if isinstance(details, str):
            details_str = details
            file_locations = '[]'
            api_calls = '[]'
        else:
            details_str = json.dumps(details)
            file_locations = json.dumps(details.get('affected_files', {}))
            api_calls = json.dumps(details.get('api_calls', []))
        
        row = {
            'package_name': package_name,
            'version': version,
            'timestamp': timestamp,
            'behavior_id': behavior_id,
            'category': behavior.get('category', 'unknown'),
            'summary': behavior.get('summary', '')[:200],
            'details': details_str[:1000],
            'confidence': behavior.get('confidence', 0.0),
            'detected_in': detected_in,
            'file_locations': file_locations,
            'api_calls': api_calls
        }
        self._append_to_csv('behavior_details.csv', row)
        
    def log_model_failure(self, package_name: str, version: str,
                         response: str, failure_type: str):
        """Log failed json parsing model responses"""
        timestamp = datetime.now().isoformat()
        
        row = {
            'package_name': package_name,
            'version': version,
            'analysis_timestamp': timestamp,
            'model_name': 'DeepSeek-Coder-6.7B-Instruct',
            'prompt_version': self.prompt_version,
            'failure_type': failure_type,
            'error_message': self._extract_error_reason(response),
            'full_response': response
        }
        self._append_to_csv('model_failures.csv', row)
        
    def log_verification_analysis(self, package_name: str, version: str, parsed_json: Dict, raw_response: str):
        """
        Logs Verification
        """
        timestamp = datetime.now().isoformat()

        chain_data = parsed_json.get('chain_analysis', {})
        legitimacy_data = parsed_json.get('legitimacy_check', {})
        final_data = parsed_json.get('final_verification', {})
        
        row = {
            'package_name': package_name,
            'version': version,
            'timestamp': timestamp,
            'model_name': 'DeepSeek-Coder-6.7B-Instruct',
            'prompt_version': self.prompt_version,
            
            'verdict': final_data.get('verdict', 'UNKNOWN'),
            'confidence': final_data.get('calibrated_confidence', 0.0),
            
            'chain_score': chain_data.get('chain_score', 0.0),
            'is_coherent_chain': chain_data.get('is_coherent_chain', False),
            
            'legitimacy_score': legitimacy_data.get('legitimacy_score', 0.0),
            'is_justified': legitimacy_data.get('is_justified', False),
            
            'explanation': final_data.get('explanation', '')[:1000], # Cắt ngắn nếu quá dài
            'chain_narrative': chain_data.get('chain_narrative', '')[:500],
            'justification_reasoning': legitimacy_data.get('reasoning', '')[:500],
            "raw_response": raw_response[:1000],
            'parsed_json': json.dumps(parsed_json)
        }
        
        self._append_to_csv('verification_analysis.csv', row)
        
    def _extract_error_reason(self, response: str) -> str:
        response_lower = response.lower()
    
        if any(word in response_lower for word in ["i'm not capable", "i cannot", "i can't assist", "i'm sorry"]):
            return "model_refusal"
        
        if "{" not in response:
            return "no_json"
        
        if response.count("{") != response.count("}"):
            return "invalid_json"
        
        return "parse_error"
    
    def _append_to_csv(self, filename: str, row: Dict):
        """
        Appends to the CSV log file.

        """
        filepath = os.path.join(self.output_dir, filename)
        file_exists = os.path.exists(filepath)
        
        with open(filepath, 'a', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=row.keys())
            if not file_exists:
                writer.writeheader()
            writer.writerow(row)