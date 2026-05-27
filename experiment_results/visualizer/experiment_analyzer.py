# experiments/run_experiments.py
import pandas as pd
import json
from collections import defaultdict
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, auc
import numpy as np

class ExperimentAnalyzer:
    def __init__(self, results_dir="experiment_results"):
        self.results_dir = results_dir
        
    def load_results(self):
        """Load all CSV results into DataFrames"""
        self.structural_df = pd.read_csv(f"{self.results_dir}/structural_analysis_log.csv")
        self.semantic_df = pd.read_csv(f"{self.results_dir}/semantic_analysis.csv")
        self.behavior_df = pd.read_csv(f"{self.results_dir}/behavior_details.csv")
        
    def calculate_metrics_per_package(self):
        """Calculate metrics for each package"""
        metrics = []
        
        for _, row in self.semantic_df.iterrows():
            package_name = row['package_name']
            
            struct_risks = self.structural_df[
                self.structural_df['package_name'] == package_name
            ]['total_risks_found'].values
            
            semantic_behaviors = self.behavior_df[
                self.behavior_df['package_name'] == package_name
            ]
            
            metrics.append({
                'package': package_name,
                'structural_risks': struct_risks[0] if len(struct_risks) > 0 else 0,
                'semantic_behaviors': len(semantic_behaviors),
                'max_confidence': row['max_confidence'],
                'risk_categories': row['behavior'],
                'is_malicious': self._is_malicious(package_name)
            })
        
        return pd.DataFrame(metrics)
    
    def _is_malicious(self, package_name):
        """Check if package is in malicious list"""
        malicious_list = ['flatmap-stream', 'event-stream', 'crossenv', 'discord-selfbot']
        return any(mal in package_name.lower() for mal in malicious_list)
    
    def generate_roc_curve(self):
        """Generate ROC curve using confidence scores"""
        metrics_df = self.calculate_metrics_per_package()
        
        y_true = metrics_df['is_malicious'].astype(int).values
        y_scores = metrics_df['max_confidence'].values
        
        fpr, tpr, thresholds = roc_curve(y_true, y_scores)
        roc_auc = auc(fpr, tpr)
        
        # Plot
        plt.figure(figsize=(8, 6))
        plt.plot(fpr, tpr, color='darkorange', lw=2, 
                 label=f'ROC curve (AUC = {roc_auc:.2f})')
        plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve - Malicious Package Detection')
        plt.legend(loc="lower right")
        plt.grid(True)
        
        # Save plot
        plt.savefig(f"{self.results_dir}/roc_curve.png", dpi=300, bbox_inches='tight')
        plt.show()
        
        return fpr, tpr, thresholds, roc_auc
    
    def calculate_accuracy(self, threshold=0.5):
        """Calculate accuracy at given threshold"""
        metrics_df = self.calculate_metrics_per_package()
        
        y_true = metrics_df['is_malicious'].astype(int).values
        y_scores = metrics_df['max_confidence'].values
        
        y_pred = (y_scores > threshold).astype(int)
        
        accuracy = np.mean(y_true == y_pred)
        
        print(f"Threshold: {threshold}")
        print(f"Accuracy: {accuracy:.2%}")
        print(f"True Positives: {sum((y_true == 1) & (y_pred == 1))}")
        print(f"False Positives: {sum((y_true == 0) & (y_pred == 1))}")
        print(f"True Negatives: {sum((y_true == 0) & (y_pred == 0))}")
        print(f"False Negatives: {sum((y_true == 1) & (y_pred == 0))}")
        
        return accuracy
    
    def generate_summary_report(self):
        """Generate comprehensive report"""
        metrics_df = self.calculate_metrics_per_package()
        
        report = {
            'total_packages': len(metrics_df),
            'malicious_packages': sum(metrics_df['is_malicious']),
            'benign_packages': sum(~metrics_df['is_malicious']),
            'avg_structural_risks_malicious': metrics_df[metrics_df['is_malicious']]['structural_risks'].mean(),
            'avg_structural_risks_benign': metrics_df[~metrics_df['is_malicious']]['structural_risks'].mean(),
            'avg_confidence_malicious': metrics_df[metrics_df['is_malicious']]['max_confidence'].mean(),
            'avg_confidence_benign': metrics_df[~metrics_df['is_malicious']]['max_confidence'].mean(),
            'most_common_risk_categories': self._get_most_common_categories()
        }
        
        with open(f"{self.results_dir}/experiment_summary.json", 'w') as f:
            json.dump(report, f, indent=2)
        
        return report
    
    def _get_most_common_categories(self):
        """Get most common risk categories"""
        all_categories = []
        for cats in self.semantic_df['behavior'].dropna():
            all_categories.extend(cats.split(';'))
        
        from collections import Counter
        return Counter(all_categories).most_common(5)

if __name__ == "__main__":
    analyzer = ExperimentAnalyzer()
    analyzer.load_results()
    
    metrics_df = analyzer.calculate_metrics_per_package()
    print("Metrics per package:")
    print(metrics_df.to_string())
    
    analyzer.generate_roc_curve()
    
    for threshold in [0.3, 0.5, 0.7, 0.9]:
        analyzer.calculate_accuracy(threshold)
    
    report = analyzer.generate_summary_report()
    print("\nSummary Report:")
    print(json.dumps(report, indent=2))