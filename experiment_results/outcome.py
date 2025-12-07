import pandas as pd
import os

base_dir = os.path.dirname(__file__) 
file_path = os.path.join(base_dir, "behavior_details.csv") 
df = pd.read_csv(file_path)

print("=" * 80)
print(" STATISTICS BY BEHAVIOR")
print("=" * 80)

print("\n 1. QUANTITY BY BEHAVIOR:")
behavior_counts = df['behavior_id'].value_counts()
print(behavior_counts.to_string())

print("\n 2. DETAILS FOR EACH BEHAVIOR:")

for behavior_id in df['behavior_id'].unique():
    print(f"\n{'='*50}")
    print(f"BEHAVIOR: {behavior_id}")
    print(f"{'='*50}")
    
    behavior_df = df[df['behavior_id'] == behavior_id]
    
    print(f" Number of occurrences: {len(behavior_df)}")
    print(f" Category: {behavior_df['category'].iloc[0]}")
    print(f" Summary: {behavior_df['summary'].iloc[0]}")
    print(f" Average Confidence: {behavior_df['confidence'].mean():.2f}")
    
    packages = behavior_df['package_name'].unique()
    print(f" Affected Packages ({len(packages)}): {', '.join(packages[:5])}")
    if len(packages) > 5:
        print(f"   ... and {len(packages)-5} other packages")

print("\n 3. CONFIDENCE DISTRIBUTION:")
print(df.groupby('behavior_id')['confidence'].agg(['count', 'mean', 'min', 'max']).round(2))

print("\n 4. TOP PACKAGES WITH MOST BEHAVIORS:")
package_stats = df.groupby('package_name').agg({
    'behavior_id': lambda x: ', '.join(sorted(set(x))),
    'confidence': 'mean'
})
print(package_stats.to_string())

print("\n" + "="*80)
print(" SUMMARY:")
print("="*80)

for behavior_id, count in behavior_counts.items():
    behavior_data = df[df['behavior_id'] == behavior_id]
    print(f"• {behavior_id}: {count} lần - {behavior_data['category'].iloc[0]} (Confidence: {behavior_data['confidence'].mean():.2f})")
    print(f"  {behavior_data['summary'].iloc[0][:100]}...")

print(f"\n Total different behaviors: {df['behavior_id'].nunique()}")
print(f" Total records: {len(df)}")
print(f" Affected packages: {df['package_name'].nunique()}")