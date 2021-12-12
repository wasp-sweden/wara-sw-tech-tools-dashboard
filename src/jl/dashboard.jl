# AUTO GENERATED FILE - DO NOT EDIT

export dashboard

"""
    dashboard(;kwargs...)
    dashboard(children::Any;kwargs...)
    dashboard(children_maker::Function;kwargs...)


A Dashboard component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): Children.
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `label` (String; required): A label that will be printed when this component is rendered.
- `value` (String; optional): The value displayed in the input.
"""
function dashboard(; kwargs...)
        available_props = Symbol[:children, :id, :label, :value]
        wild_props = Symbol[]
        return Component("dashboard", "Dashboard", "tep_dashboard", available_props, wild_props; kwargs...)
end

dashboard(children::Any; kwargs...) = dashboard(;kwargs..., children = children)
dashboard(children_maker::Function; kwargs...) = dashboard(children_maker(); kwargs...)

