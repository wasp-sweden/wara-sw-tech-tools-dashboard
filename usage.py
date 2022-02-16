import tep_dashboard
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import plotly.express as px
import dash_core_components as dcc


app = dash.Dash(__name__)

# Meta data for testing dashboard
meta_data = {"tool": "dmce", "subject": "vaccinate", "tag": "default", "timestamp": "2022-01-20T15:34:07.895069", "env": {"uname": ["Linux", "f17d33f949ee", "3.10.0-1062.12.1.el7.x86_64", "#1 SMP Tue Feb 4 23:02:59 UTC 2020", "x86_64"]}}

# Data for testing dashboard
data = [29.93325909419153, 0.0, 0.0, 2710.5302064356338, 2710.364920079951, 2674.580153968095, 29.93325909419153, 29.93325909419153, 29.93325909419153, 29.93325909419153, 29.93325909419153, 29.93325909419153, 29.949958263743873, 29.93325909419153, 29.93325909419153, 29.93325909419153]
barchart = px.bar(data)
piechart = px.line(data)

widgets = [
    tep_dashboard.Widget(
        meta=meta_data,
        children=[
            dcc.Graph(figure=barchart)
        ]
    ),
    tep_dashboard.Widget(
        meta=meta_data,
        children=[
            dcc.Graph(figure=piechart)
        ]
    )
]


app.layout = tep_dashboard.Dashboard(
                id='input',
                value='my-value',
                label='my-label',
                children=widgets,
            )

if __name__ == '__main__':
    app.run_server(host="0.0.0.0", debug=True)
