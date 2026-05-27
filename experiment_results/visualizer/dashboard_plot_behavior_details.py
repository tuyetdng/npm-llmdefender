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

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, 'behavior_details.csv')
df = pd.read_csv(csv_path)
df['date'] = pd.to_datetime(df['timestamp']).dt.date

app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("NPM Package Security Analysis Dashboard"),
    
    dcc.Graph(id='category-dist'),
    
    dcc.Graph(id='confidence-trend'),
    
    dcc.Graph(id='confidence-analysis'),
    
    dcc.Graph(id='top-packages'),
    
    dcc.Graph(id='top-risk'),
    
    dcc.Dropdown(
        id='category-filter',
        options=[{'label': cat, 'value': cat} 
                for cat in df['category'].unique()],
        multi=True,
        placeholder="Select categories"
    ),
])

@app.callback(
    [Output('category-dist', 'figure'),
     Output('confidence-trend', 'figure'),
     Output('confidence-analysis', 'figure'),
     Output('top-packages', 'figure'),
     Output('top-risk', 'figure')],
    [Input('category-filter', 'value')]
)
def update_charts(selected_categories):
    filtered_df = df if not selected_categories else \
                 df[df['category'].isin(selected_categories)]
    
    category_counts = filtered_df['category'].value_counts().reset_index()
    category_counts.columns = ['category', 'count']

    fig1 = px.bar(category_counts,
                x='category', y='count',
                title='Threat Category Distribution')
    
    fig2 = px.scatter(filtered_df, x='timestamp', y='confidence',
                      color='category',
                      title='Confidence Scores Over Time',
                      hover_data=['package_name'])
    
    top_pkgs = filtered_df.groupby('package_name').agg({
        'confidence': 'mean',
        'behavior_id': 'count'
    }).reset_index()
    
    fig3 = make_subplots(
        rows=2, cols=2,
        subplot_titles=(
            'Histogram of Confidence Scores',
            'Cumulative Distribution',
            'Box Plot by Category',
            'Violin Plot'
        ),
        specs=[[{"type": "histogram"}, {"type": "scatter"}],
               [{"type": "box"}, {"type": "violin"}]]
    )

    fig3.add_trace(
        go.Histogram(
            x=filtered_df['confidence'],
            nbinsx=20,
            name='Distribution',
            marker_color='royalblue',
            opacity=0.7
        ),
        row=1, col=1
    )

    values = np.sort(filtered_df['confidence'])
    n = len(values)

    # ECDF
    ecdf_x = values
    ecdf_y = np.arange(1, n + 1) / n

    fig3.add_trace(
        go.Scatter(
            x=ecdf_x,
            y=ecdf_y,
            mode='lines',
            line=dict(color='red', width=2),
            name='ECDF'
        ),
        row=1, col=2
    )

    p50 = np.percentile(values, 50)
    p80 = np.percentile(values, 80)
    p90 = np.percentile(values, 90)

    percentiles = [
        (p50, "50th percentile"),
        (p80, "80th percentile"),
        (p90, "90th percentile")
    ]

    # Add vertical markers
    for x, label in percentiles:
        fig3.add_vline(
            x=x,
            line_width=2,
            line_dash="dash",
            line_color="gray",
            row=1, col=2
        )

    top_categories = filtered_df['category'].value_counts().head(5).index
    for category in top_categories:
        sub = filtered_df[filtered_df['category'] == category]
        fig3.add_trace(
            go.Box(
                y=sub['confidence'],
                name=category,
                boxpoints='outliers'
            ),
            row=2, col=1
        )

    fig3.add_trace(
        go.Violin(
            y=filtered_df['confidence'],
            box_visible=True,
            line_color='black',
            meanline_visible=True,
            fillcolor='lightseagreen',
            opacity=0.6,
            name='Confidence'
        ),
        row=2, col=2
    )

    fig3.update_layout(
        height=800,
        showlegend=False,
        title_text="Confidence Score Analysis"
    )
    
    fig4 = px.scatter(top_pkgs, x='behavior_id', y='confidence',
                      size='behavior_id', color='confidence',
                      hover_name='package_name',
                      title='Top Packages by Threat Count & Confidence')
    
    top_risky = top_pkgs.sort_values('behavior_id', ascending=False).head(10)

    fig5 = px.bar(
        top_risky,
        x='package_name',
        y='behavior_id',
        title='Top Packages by Number of Risks Detected',
        labels={'behavior_id': 'Risk Count'},
        text='behavior_id'
    )

    
    return fig1, fig2, fig3, fig4, fig5
if __name__ == '__main__':
    app.run_server(debug=True, port=8050)