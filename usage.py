import tep_dashboard
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

app.layout = html.Div([
    tep_dashboard.Dashboard(
        id='input',
        value='my-value',
        label='my-label'
    ),
])

if __name__ == '__main__':
    app.run_server(debug=True)
