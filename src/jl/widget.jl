# AUTO GENERATED FILE - DO NOT EDIT

export widget

"""
    widget(;kwargs...)
    widget(children::Any;kwargs...)
    widget(children_maker::Function;kwargs...)


A Widget component.
Main is the part of the dashboard
that displays all data.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): Children.
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `value` (String; optional): The value displayed in the input.
"""
function widget(; kwargs...)
        available_props = Symbol[:children, :id, :value]
        wild_props = Symbol[]
        return Component("widget", "Widget", "tep_dashboard", available_props, wild_props; kwargs...)
end

widget(children::Any; kwargs...) = widget(;kwargs..., children = children)
widget(children_maker::Function; kwargs...) = widget(children_maker(); kwargs...)

