# dashboard.py
import os
import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd
import plotly.graph_objects as go
from dash.dependencies import Input, Output
from plotly.subplots import make_subplots
import numpy as np
import ast
from collections import Counter

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, 'structural_analysis_log.csv')
df = pd.read_csv(csv_path)

df['timestamp'] = pd.to_datetime(df['timestamp'])
df['date'] = df['timestamp'].dt.date

def parse_list_string(s):
    if pd.isna(s) or s == '' or s == '[]':
        return []
    try:
        return ast.literal_eval(s)
    except:
        return str(s).split(';') if ';' in str(s) else [str(s)]

df['risk_types_list'] = df['risk_types'].apply(parse_list_string)
df['severities_list'] = df['severities'].apply(parse_list_string)
df['categories_list'] = df['categories'].apply(parse_list_string)

def extract_confidences(raw_output):
    try:
        if pd.isna(raw_output) or raw_output == '[]':
            return []
        data = ast.literal_eval(raw_output)
        return [item.get('confidence', 0) for item in data]
    except:
        return []

df['confidences'] = df['raw_output'].apply(extract_confidences)
df['avg_confidence'] = df['confidences'].apply(
    lambda x: np.mean(x) if x else 0
)

df['risk_count'] = df['total_risks_found']

app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("NPM Package Security Analysis Dashboard"),
    
    html.Div([
        html.Div([
            html.H3("Thống kê tổng quan", style={'text-align': 'center'}),
            html.Div(id='summary-stats', style={
                'display': 'grid',
                'grid-template-columns': 'repeat(4, 1fr)',
                'gap': '20px',
                'margin': '20px 0'
            })
        ], style={'width': '100%'}),
    ]),
    
    dcc.Dropdown(
        id='severity-filter',
        options=[
            {'label': 'All Severities', 'value': 'all'},
            {'label': 'High', 'value': 'high'},
            {'label': 'Medium', 'value': 'medium'},
            {'label': 'Low', 'value': 'low'},
            {'label': 'None', 'value': 'none'}
        ],
        value='all',
        style={'width': '50%', 'margin': '10px 0'}
    ),
    
    dcc.Dropdown(
        id='category-filter',
        options=[{'label': cat, 'value': cat} 
                for cat in sorted(df.explode('categories_list')['categories_list'].dropna().unique())],
        multi=True,
        placeholder="Select categories",
        style={'width': '100%', 'margin': '10px 0'}
    ),
    
    html.Div([
        dcc.Graph(id='severity-dist', style={'width': '50%', 'display': 'inline-block'}),
        dcc.Graph(id='risk-trend', style={'width': '50%', 'display': 'inline-block'}),
    ]),
    
    dcc.Graph(id='category-dist'),
    
    dcc.Graph(id='top-risk-packages'),
    
    dcc.Graph(id='risk-type-dist'),
    
    dcc.Graph(id='confidence-analysis'),
    
    html.Div([
        dcc.Graph(id='package-versions', style={'width': '50%', 'display': 'inline-block'}),
        dcc.Graph(id='time-analysis', style={'width': '50%', 'display': 'inline-block'}),
    ]),
])

@app.callback(
    [Output('summary-stats', 'children'),
     Output('severity-dist', 'figure'),
     Output('risk-trend', 'figure'),
     Output('category-dist', 'figure'),
     Output('top-risk-packages', 'figure'),
     Output('risk-type-dist', 'figure'),
     Output('confidence-analysis', 'figure'),
     Output('package-versions', 'figure'),
     Output('time-analysis', 'figure')],
    [Input('severity-filter', 'value'),
     Input('category-filter', 'value')]
)
def update_dashboard(severity_filter, selected_categories):
    filtered_df = df.copy()
    
    if severity_filter != 'all':
        filtered_df = filtered_df[filtered_df['max_severity'] == severity_filter]
    
    if selected_categories:
        mask = filtered_df['categories_list'].apply(
            lambda x: any(cat in x for cat in selected_categories)
        )
        filtered_df = filtered_df[mask]
    
    total_packages = filtered_df['package_name'].nunique()
    total_risks = filtered_df['risk_count'].sum()
    packages_with_risks = filtered_df[filtered_df['risk_count'] > 0]['package_name'].nunique()
    avg_risks_per_package = total_risks / total_packages if total_packages > 0 else 0
    
    summary_stats = [
        html.Div([
            html.H4(f"{total_packages:,}", style={'color': '#2E86AB'}),
            html.P("Total Packages")
        ], style={'text-align': 'center', 'padding': '10px', 'background': '#f8f9fa', 'border-radius': '5px'}),
        
        html.Div([
            html.H4(f"{total_risks:,}", style={'color': '#A23B72'}),
            html.P("Total Risks Found")
        ], style={'text-align': 'center', 'padding': '10px', 'background': '#f8f9fa', 'border-radius': '5px'}),
        
        html.Div([
            html.H4(f"{packages_with_risks:,}", style={'color': '#F18F01'}),
            html.P("Packages with Risks")
        ], style={'text-align': 'center', 'padding': '10px', 'background': '#f8f9fa', 'border-radius': '5px'}),
        
        html.Div([
            html.H4(f"{avg_risks_per_package:.2f}", style={'color': '#C73E1D'}),
            html.P("Avg Risks per Package")
        ], style={'text-align': 'center', 'padding': '10px', 'background': '#f8f9fa', 'border-radius': '5px'}),
    ]
    
    severity_counts = filtered_df['max_severity'].value_counts().reset_index()
    severity_counts.columns = ['severity', 'count']
    
    fig1 = px.pie(
        severity_counts,
        names='severity',
        values='count',
        title='Severity Distribution',
        color='severity',
        color_discrete_map={
            'high': '#FF6B6B',
            'medium': '#FFD166',
            'low': '#06D6A0',
            'none': '#118AB2'
        }
    )
    
    daily_risks = filtered_df.groupby('date').agg({
        'risk_count': 'sum',
        'package_name': 'nunique'
    }).reset_index()
    
    fig2 = make_subplots(
        specs=[[{"secondary_y": True}]]
    )
    
    fig2.add_trace(
        go.Scatter(
            x=daily_risks['date'],
            y=daily_risks['risk_count'],
            mode='lines+markers',
            name='Total Risks',
            line=dict(color='#FF6B6B', width=3)
        ),
        secondary_y=False
    )
    
    fig2.add_trace(
        go.Bar(
            x=daily_risks['date'],
            y=daily_risks['package_name'],
            name='Packages Scanned',
            marker_color='#118AB2',
            opacity=0.6
        ),
        secondary_y=True
    )
    
    fig2.update_layout(
        title='Risk Trend Over Time',
        xaxis_title='Date',
        hovermode='x unified'
    )
    fig2.update_yaxes(title_text="Total Risks", secondary_y=False)
    fig2.update_yaxes(title_text="Packages Scanned", secondary_y=True)
    
    all_categories = []
    for categories in filtered_df['categories_list']:
        all_categories.extend(categories)

    category_counter = Counter(all_categories)

    # Thay vì dùng most_common(10), tạo DataFrame từ tất cả categories
    all_categories_df = pd.DataFrame(
        list(category_counter.items()),  # Sử dụng items() thay vì most_common()
        columns=['category', 'count']
    )

    # Sắp xếp theo count giảm dần để dễ đọc
    all_categories_df = all_categories_df.sort_values('count', ascending=False)

    fig3 = px.bar(
        all_categories_df,
        x='count',
        y='category',
        orientation='h',
        title='All Risk Categories Found',
        color='count',
        color_continuous_scale='Viridis'
    )
    fig3.update_layout(yaxis={'categoryorder': 'total ascending'})
    
    top_packages = filtered_df.groupby('package_name').agg({
        'risk_count': 'sum',
        'max_severity': lambda x: x.mode()[0] if not x.mode().empty else 'none',
        'avg_confidence': 'mean'
    }).reset_index()
    top_packages = top_packages.sort_values('risk_count', ascending=False).head(15)
    
    fig4 = px.bar(
        top_packages,
        x='risk_count',
        y='package_name',
        orientation='h',
        title='Top 15 Riskiest Packages',
        color='max_severity',
        color_discrete_map={
            'high': '#FF6B6B',
            'medium': '#FFD166',
            'low': '#06D6A0',
            'none': '#118AB2'
        },
        hover_data=['avg_confidence']
    )
    fig4.update_layout(yaxis={'categoryorder': 'total ascending'})
    
    all_risk_types = []
    for risk_types in filtered_df['risk_types_list']:
        all_risk_types.extend(risk_types)
    
    risk_type_counter = Counter(all_risk_types)
    top_risk_types = pd.DataFrame(
        risk_type_counter.most_common(15),
        columns=['risk_type', 'count']
    )
    
    fig5 = px.treemap(
        top_risk_types,
        path=['risk_type'],
        values='count',
        title='Risk Types Distribution',
        color='count',
        color_continuous_scale='RdBu'
    )
    
    confidence_data = filtered_df[filtered_df['avg_confidence'] > 0]
    
    if not confidence_data.empty:
        fig6 = make_subplots(
            rows=2, cols=2,
            subplot_titles=(
                'Confidence Distribution',  
                'Confidence vs Risk Count',
                'Confidence by Severity',
                'Cumulative Distribution'
            )
        )
        
        fig6.add_trace(
            go.Histogram(
                x=confidence_data['avg_confidence'],
                nbinsx=20,
                name='Distribution',
                marker_color='royalblue'
            ),
            row=1, col=1
        )
        
        fig6.add_trace(
            go.Scatter(
                x=confidence_data['risk_count'],
                y=confidence_data['avg_confidence'],
                mode='markers',
                marker=dict(
                    size=8,
                    color=confidence_data['risk_count'],
                    colorscale='Viridis',
                    showscale=True
                ),
                text=confidence_data['package_name'],
                name='Packages'
            ),
            row=1, col=2
        )
        
        severities = ['high', 'medium', 'low', 'none']
        for severity in severities:
            subset = confidence_data[confidence_data['max_severity'] == severity]
            if not subset.empty:
                fig6.add_trace(
                    go.Box(
                        y=subset['avg_confidence'],
                        name=severity,
                        boxpoints='outliers'
                    ),
                    row=2, col=1
                )
        
        # ECDF
        values = np.sort(confidence_data['avg_confidence'])
        n = len(values)
        ecdf_y = np.arange(1, n + 1) / n
        
        fig6.add_trace(
            go.Scatter(
                x=values,
                y=ecdf_y,
                mode='lines',
                line=dict(color='red', width=2),
                name='ECDF'
            ),
            row=2, col=2
        )
        
        percentiles = [50, 75, 90, 95]
        for p in percentiles:
            percentile_value = np.percentile(values, p)
            fig6.add_vline(
                x=percentile_value,
                line_width=1,
                line_dash="dash",
                line_color="gray",
                row=2, col=2
            )
        
        fig6.update_layout(
            height=800,
            showlegend=False,
            title_text="Confidence Score Analysis"
        )
    else:
        fig6 = go.Figure()
        fig6.add_annotation(
            text="No confidence data available",
            xref="paper", yref="paper",
            x=0.5, y=0.5, showarrow=False
        )
        fig6.update_layout(title_text="Confidence Score Analysis")
    
    package_versions = filtered_df.groupby(['package_name', 'version']).agg({
        'risk_count': 'sum',
        'max_severity': lambda x: x.mode()[0] if not x.mode().empty else 'none'
    }).reset_index()
    
    top_pkg_names = package_versions.groupby('package_name')['risk_count'].sum().nlargest(8).index
    top_pkg_versions = package_versions[package_versions['package_name'].isin(top_pkg_names)]
    
    fig7 = px.scatter(
        top_pkg_versions,
        x='version',
        y='package_name',
        size='risk_count',
        color='max_severity',
        color_discrete_map={
            'high': '#FF6B6B',
            'medium': '#FFD166',
            'low': '#06D6A0',
            'none': '#118AB2'
        },
        title='Risk Analysis by Package Version',
        hover_data=['risk_count']
    )
    fig7.update_layout(
        xaxis_title='Version',
        yaxis_title='Package Name'
    )
    
    filtered_df['hour'] = filtered_df['timestamp'].dt.hour
    hourly_analysis = filtered_df.groupby('hour').agg({
        'risk_count': 'sum',
        'package_name': 'nunique',
        'avg_confidence': 'mean'
    }).reset_index()
    
    fig8 = make_subplots(
        specs=[[{"secondary_y": True}]]
    )
    
    fig8.add_trace(
        go.Bar(
            x=hourly_analysis['hour'],
            y=hourly_analysis['risk_count'],
            name='Risks Found',
            marker_color='#A23B72',
            opacity=0.7
        ),
        secondary_y=False
    )
    
    fig8.add_trace(
        go.Scatter(
            x=hourly_analysis['hour'],
            y=hourly_analysis['avg_confidence'],
            name='Avg Confidence',
            line=dict(color='#2E86AB', width=3),
            mode='lines+markers'
        ),
        secondary_y=True
    )
    
    fig8.update_layout(
        title='Hourly Analysis of Scans',
        xaxis_title='Hour of Day',
        hovermode='x unified'
    )
    fig8.update_yaxes(title_text="Total Risks", secondary_y=False)
    fig8.update_yaxes(title_text="Average Confidence", secondary_y=True)
    fig8.update_xaxes(tickmode='linear', dtick=1)
    
    return (
        summary_stats,
        fig1, fig2, fig3, fig4, fig5, fig6, fig7, fig8
    )

if __name__ == '__main__':
    app.run_server(debug=True, port=8050)