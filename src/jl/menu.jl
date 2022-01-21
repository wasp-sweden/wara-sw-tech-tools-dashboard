# AUTO GENERATED FILE - DO NOT EDIT

export menu

"""
    menu(;kwargs...)

A Menu component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (optional): The ID used to identify this component in Dash callbacks.
- `dashboards` (optional): The list of dashboards displayed in the sidemenu.
- `isOpen` (optional): True if menu is open.
- `setProps` (optional): Dash-assigned callback that should be called to report property changes
to Dash, to make them available for callbacks.
- `toggle` (optional): Callback to toggle open state.
"""
function menu(; kwargs...)
        available_props = Symbol[:id, :dashboards, :isOpen, :toggle]
        wild_props = Symbol[]
        return Component("menu", "Menu", "tep_dashboard", available_props, wild_props; kwargs...)
end

