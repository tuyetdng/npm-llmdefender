import os
import dtale
import pandas as pd

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, 'structural_analysis_log.csv')

df = pd.read_csv(csv_path)
d = dtale.show(df, subprocess=False)
print(f"Open: http://localhost:{d.port}")
# dtale.show(df)  