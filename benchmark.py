import pandas as pd

# ==========================
# Load CSV files
# ==========================

structural = pd.read_csv(
    "experiment_results/structural_analysis_layer_log.csv",
    engine="python"
)

semantic = pd.read_csv(
    "experiment_results/semantic_analysis.csv",
    engine="python"
)

verification = pd.read_csv(
    "experiment_results/verification_analysis.csv",
    engine="python"
)

# ==========================
# Dataset overview 
# ==========================

total_packages = semantic["package_name"].nunique()

malicious = semantic[semantic["label"] == "malicious"]["package_name"].nunique()
benign = semantic[semantic["label"] == "benign"]["package_name"].nunique()

print("\n================ DATASET =================")
print(f"Total packages : {total_packages}")
print(f"Malicious      : {malicious}")
print(f"Benign         : {benign}")

# ==========================
# RQ1 – Routing effectiveness
# ==========================

print("\n================ RQ1: ROUTING =================")

routing_stats = structural.groupby(["routing", "label"]).size().unstack(fill_value=0)

print(routing_stats)

# ==========================
# RQ2 – Detection performance
# ==========================

print("\n================ RQ2: DETECTION =================")

# predicted malicious if behaviors detected
semantic["predicted_malicious"] = semantic["total_behaviors"] > 0

tp = len(semantic[(semantic.label == "malicious") & (semantic.predicted_malicious)])
fn = len(semantic[(semantic.label == "malicious") & (~semantic.predicted_malicious)])
fp = len(semantic[(semantic.label == "benign") & (semantic.predicted_malicious)])
tn = len(semantic[(semantic.label == "benign") & (~semantic.predicted_malicious)])

precision = tp / (tp + fp) if (tp + fp) else 0
recall = tp / (tp + fn) if (tp + fn) else 0
f1 = 2 * precision * recall / (precision + recall) if (precision + recall) else 0

print("TP:", tp)
print("FN:", fn)
print("FP:", fp)
print("TN:", tn)

print(f"Precision: {precision:.3f}")
print(f"Recall:    {recall:.3f}")
print(f"F1 score:  {f1:.3f}")

# ==========================
# Behavior categories
# ==========================

print("\n================ BEHAVIOR CATEGORIES =================")

categories = (
    semantic["behavior_categories"]
    .dropna()
    .str.split(";")
    .explode()
)

print(categories.value_counts().head(10))

# ==========================
# Model robustness
# ==========================

print("\n================ MODEL ERRORS =================")

print("Parse success rate:",
      semantic["parse_success"].mean())

# ==========================
# RQ3 – Attack chain reconstruction
# ==========================

print("\n================ RQ3: ATTACK CHAINS =================")

coherent_rate = verification["is_coherent_chain"].mean()
avg_chain_score = verification["chain_score"].mean()

print(f"Coherent chains rate : {coherent_rate:.2f}")
print(f"Average chain score  : {avg_chain_score:.2f}")

print("\n==============================================")