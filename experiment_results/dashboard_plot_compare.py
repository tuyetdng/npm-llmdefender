# dashboard.py
import os
import dash
from dash import dcc, html, dash_table
import plotly.express as px
import pandas as pd
import plotly.graph_objects as go
from dash.dependencies import Input, Output
from plotly.subplots import make_subplots
import numpy as np

current_dir = os.path.dirname(os.path.abspath(__file__))
behavior_csv_path = os.path.join(current_dir, 'behavior_details.csv')
structural_csv_path = os.path.join(current_dir, 'structural_analysis_log.csv')
behavior_df = pd.read_csv(behavior_csv_path)
structural_df = pd.read_csv(structural_csv_path)


total_packages = structural_df['package_name'].nunique()
packages_with_risk = structural_df[structural_df['total_risks_found'] > 0]['package_name'].nunique()
risk_percentage = (packages_with_risk / total_packages * 100)

structural_risks = []
for _, row in structural_df.iterrows():
    if row['total_risks_found'] > 0:
        package = row['package_name']
        risk_types = str(row['risk_types']).split(';')
        severities = str(row['severities']).split(';')
        categories = str(row['categories']).split(';')
        
        for rt, sev, cat in zip(risk_types, severities, categories):
            structural_risks.append({
                'package_name': package,
                'risk_type': rt.strip(),
                'severity': sev.strip(),
                'category': cat.strip(),
                'source': 'structural'
            })

structural_risk_df = pd.DataFrame(structural_risks)

# 3. Phân tích behavior
behavior_risk_df = behavior_df[['package_name', 'category']].copy()
behavior_risk_df['source'] = 'behavior'

# 4. Kết hợp dữ liệu từ cả 2 nguồn
combined_df = pd.concat([
    structural_risk_df[['package_name', 'category', 'source']],
    behavior_risk_df[['package_name', 'category', 'source']]
])

# Khởi tạo Dash app
app = dash.Dash(__name__)

# Layout dashboard
app.layout = html.Div([
    html.H1("Package Security Analysis Dashboard", style={'textAlign': 'center'}),
    
    # Summary Cards
    html.Div([
        html.Div([
            html.H3(f"{total_packages}", style={'color': '#1f77b4'}),
            html.P("Total Packages")
        ], className='card', style={'flex': '1', 'margin': '10px', 'padding': '20px', 'backgroundColor': '#f8f9fa'}),
        
        html.Div([
            html.H3(f"{packages_with_risk}", style={'color': '#ff7f0e'}),
            html.P("Packages with Risks")
        ], className='card', style={'flex': '1', 'margin': '10px', 'padding': '20px', 'backgroundColor': '#f8f9fa'}),
        
        html.Div([
            html.H3(f"{risk_percentage:.1f}%", style={'color': '#d62728'}),
            html.P("Risk Percentage")
        ], className='card', style={'flex': '1', 'margin': '10px', 'padding': '20px', 'backgroundColor': '#f8f9fa'})
    ], style={'display': 'flex', 'justifyContent': 'center'}),
    
    # Tabs
    dcc.Tabs([
        # Tab 1: Tổng quan
        dcc.Tab(label='Tổng quan', children=[
            html.Div([
                # Biểu đồ 1: So sánh phát hiện từ 2 phương pháp
                dcc.Graph(id='detection-method-comparison'),
                
                # Biểu đồ 2: Top packages có nhiều risk nhất
                dcc.Graph(id='top-risky-packages'),
                
                # Biểu đồ 3: Phân bố severity
                dcc.Graph(id='severity-distribution'),
            ], style={'padding': '20px'})
        ]),
        
        # Tab 2: Phân tích chi tiết theo category
        dcc.Tab(label='Phân tích Category', children=[
            html.Div([
                dcc.Dropdown(
                    id='source-selector',
                    options=[
                        {'label': 'Cả hai phương pháp', 'value': 'both'},
                        {'label': 'Structural Analysis', 'value': 'structural'},
                        {'label': 'Behavior Analysis', 'value': 'behavior'}
                    ],
                    value='both',
                    style={'width': '300px', 'margin': '20px'}
                ),
                dcc.Graph(id='category-comparison-chart'),
                dcc.Graph(id='category-by-package-chart')
            ])
        ]),
        
        # Tab 3: Chi tiết từng package
        dcc.Tab(label='Package Details', children=[
            html.Div([
                dcc.Dropdown(
                    id='package-selector',
                    options=[{'label': pkg, 'value': pkg} 
                            for pkg in sorted(structural_df['package_name'].unique())],
                    value='@actions/core',
                    style={'width': '400px', 'margin': '20px'}
                ),
                html.Div(id='package-details-container')
            ])
        ])
    ])
])

# Callback 1: So sánh phương pháp phát hiện
@app.callback(
    Output('detection-method-comparison', 'figure'),
    Input('detection-method-comparison', 'id')
)
def update_detection_comparison(_):
    # Đếm unique packages phát hiện được bởi mỗi phương pháp
    structural_pkgs = set(structural_risk_df['package_name'].unique())
    behavior_pkgs = set(behavior_risk_df['package_name'].unique())
    
    venn_data = {
        'Both Methods': len(structural_pkgs.intersection(behavior_pkgs)),
        'Structural Only': len(structural_pkgs - behavior_pkgs),
        'Behavior Only': len(behavior_pkgs - structural_pkgs)
    }
    
    fig = px.bar(
        x=list(venn_data.keys()),
        y=list(venn_data.values()),
        title='Package Detection Comparison by Method',
        labels={'x': 'Detection Method', 'y': 'Number of Packages'},
        color=list(venn_data.keys()),
        color_discrete_sequence=['#1f77b4', '#ff7f0e', '#2ca02c']
    )
    
    return fig

# Callback 2: Top risky packages
@app.callback(
    Output('top-risky-packages', 'figure'),
    Input('top-risky-packages', 'id')
)
def update_top_risky_packages(_):
    # Tính tổng risk count cho mỗi package
    structural_counts = structural_risk_df.groupby('package_name').size().reset_index(name='structural_count')
    behavior_counts = behavior_df.groupby('package_name').size().reset_index(name='behavior_count')
    
    # Merge counts
    risk_counts = pd.merge(structural_counts, behavior_counts, on='package_name', how='outer').fillna(0)
    risk_counts['total_count'] = risk_counts['structural_count'] + risk_counts['behavior_count']
    
    # Lấy top 10
    top_10 = risk_counts.nlargest(10, 'total_count')
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=top_10['package_name'],
        y=top_10['structural_count'],
        name='Structural Risks',
        marker_color='#1f77b4'
    ))
    
    fig.add_trace(go.Bar(
        x=top_10['package_name'],
        y=top_10['behavior_count'],
        name='Behavior Risks',
        marker_color='#ff7f0e'
    ))
    
    fig.update_layout(
        title='Top 10 Riskiest Packages',
        xaxis_title='Package Name',
        yaxis_title='Number of Risks',
        barmode='stack',
        xaxis={'categoryorder': 'total descending'}
    )
    
    return fig

# Callback 3: Phân bố severity
@app.callback(
    Output('severity-distribution', 'figure'),
    Input('severity-distribution', 'id')
)
def update_severity_distribution(_):
    severity_counts = structural_risk_df['severity'].value_counts().reset_index()
    severity_counts.columns = ['severity', 'count']
    
    fig = px.pie(
        severity_counts,
        values='count',
        names='severity',
        title='Risk Severity Distribution',
        color='severity',
        color_discrete_map={
            'high': '#d62728',
            'medium': '#ff7f0e',
            'low': '#2ca02c',
            'none': '#7f7f7f'
        }
    )
    
    return fig

# Callback 4: So sánh category theo phương pháp
@app.callback(
    Output('category-comparison-chart', 'figure'),
    Input('source-selector', 'value')
)
def update_category_comparison(source):
    if source == 'both':
        df = combined_df
        title = 'Category Distribution (Both Methods)'
    elif source == 'structural':
        df = structural_risk_df
        title = 'Category Distribution (Structural Analysis)'
    else:
        df = behavior_risk_df
        title = 'Category Distribution (Behavior Analysis)'
    
    category_counts = df['category'].value_counts().reset_index()
    category_counts.columns = ['category', 'count']
    
    fig = px.bar(
        category_counts,
        x='category',
        y='count',
        title=title,
        labels={'category': 'Risk Category', 'count': 'Number of Occurrences'},
        color='count',
        color_continuous_scale='viridis'
    )
    
    fig.update_layout(xaxis={'categoryorder': 'total descending'})
    
    return fig

# Callback 5: Category phân bổ theo package
@app.callback(
    Output('category-by-package-chart', 'figure'),
    Input('source-selector', 'value')
)
def update_category_by_package(source):
    if source == 'both':
        df = combined_df
    elif source == 'structural':
        df = structural_risk_df
    else:
        df = behavior_risk_df
    
    # Tạo heatmap data
    heatmap_data = pd.crosstab(df['package_name'], df['category'])
    
    fig = px.imshow(
        heatmap_data,
        title=f'Package vs Category Heatmap ({source.capitalize()} Analysis)',
        labels=dict(x="Category", y="Package", color="Risk Count"),
        color_continuous_scale='YlOrRd'
    )
    
    fig.update_layout(height=600)
    
    return fig

# Callback 6: Chi tiết package
@app.callback(
    Output('package-details-container', 'children'),
    Input('package-selector', 'value')
)
def update_package_details(selected_package):
    # Lấy dữ liệu structural
    structural_data = structural_df[structural_df['package_name'] == selected_package]
    
    # Lấy dữ liệu behavior
    behavior_data = behavior_df[behavior_df['package_name'] == selected_package]
    
    children = []
    
    if not structural_data.empty:
        row = structural_data.iloc[0]
        
        children.append(html.H3(f"Structural Analysis: {selected_package}"))
        children.append(html.P(f"Version: {row['version']}"))
        children.append(html.P(f"Total Risks Found: {row['total_risks_found']}"))
        children.append(html.P(f"Max Severity: {row['max_severity']}"))
        
        if row['total_risks_found'] > 0:
            risk_types = str(row['risk_types']).split(';')
            severities = str(row['severities']).split(';')
            categories = str(row['categories']).split(';')
            
            risk_table = []
            for i, (rt, sev, cat) in enumerate(zip(risk_types, severities, categories)):
                risk_table.append(html.Tr([
                    html.Td(rt.strip()),
                    html.Td(sev.strip()),
                    html.Td(cat.strip())
                ]))
            
            children.append(html.Table([
                html.Thead(html.Tr([
                    html.Th("Risk Type"),
                    html.Th("Severity"),
                    html.Th("Category")
                ])),
                html.Tbody(risk_table)
            ], style={'margin': '20px'}))
    
    if not behavior_data.empty:
        children.append(html.H3(f"Behavior Analysis: {selected_package}"))
        
        behavior_table = []
        for _, row in behavior_data.iterrows():
            behavior_table.append(html.Tr([
                html.Td(row['category']),
                html.Td(row['summary']),
                html.Td(f"{row['confidence']:.2f}")
            ]))
        
        children.append(html.Table([
            html.Thead(html.Tr([
                html.Th("Category"),
                html.Th("Summary"),
                html.Th("Confidence")
            ])),
            html.Tbody(behavior_table)
        ], style={'margin': '20px'}))
    
    # Thêm biểu đồ so sánh
    if not structural_data.empty and not behavior_data.empty:
        # Tạo radar chart cho so sánh
        structural_cats = structural_risk_df[structural_risk_df['package_name'] == selected_package]['category'].value_counts()
        behavior_cats = behavior_data['category'].value_counts()
        
        all_cats = set(structural_cats.index).union(set(behavior_cats.index))
        
        radar_data = []
        for cat in all_cats:
            radar_data.append({
                'category': cat,
                'structural': structural_cats.get(cat, 0),
                'behavior': behavior_cats.get(cat, 0)
            })
        
        radar_df = pd.DataFrame(radar_data)
        
        fig = go.Figure()
        
        fig.add_trace(go.Scatterpolar(
            r=radar_df['structural'].tolist(),
            theta=radar_df['category'].tolist(),
            fill='toself',
            name='Structural Analysis',
            line_color='#1f77b4'
        ))
        
        fig.add_trace(go.Scatterpolar(
            r=radar_df['behavior'].tolist(),
            theta=radar_df['category'].tolist(),
            fill='toself',
            name='Behavior Analysis',
            line_color='#ff7f0e'
        ))
        
        fig.update_layout(
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, max(radar_df[['structural', 'behavior']].max().max(), 1)]
                )
            ),
            title=f"Risk Category Comparison for {selected_package}"
        )
        
        children.append(dcc.Graph(figure=fig))
    
    return children

# CSS
app.index_string = '''
<!DOCTYPE html>
<html>
    <head>
        {%metas%}
        <title>Package Security Dashboard</title>
        {%favicon%}
        {%css%}
        <style>
            .card {
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                text-align: center;
            }
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin: 10px 0;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
            .tab {
                padding: 20px;
            }
        </style>
    </head>
    <body>
        {%app_entry%}
        <footer>
            {%config%}
            {%scripts%}
            {%renderer%}
        </footer>
    </body>
</html>
'''

if __name__ == '__main__':
    app.run_server(debug=True, port=8050)