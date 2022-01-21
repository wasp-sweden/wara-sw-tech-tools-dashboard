# AUTO GENERATED FILE - DO NOT EDIT

export main

"""
    main(;kwargs...)
    main(children::Any;kwargs...)
    main(children_maker::Function;kwargs...)


A Main component.
Main is the part of the dashboard
that displays all data.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): Children.
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `value` (String; optional): The value displayed in the input.
"""
function main(; kwargs...)
        available_props = Symbol[:children, :id, :value]
        wild_props = Symbol[]
        return Component("main", "Main", "tep_dashboard", available_props, wild_props; kwargs...)
end

main(children::Any; kwargs...) = main(;kwargs..., children = children)
main(children_maker::Function; kwargs...) = main(children_maker(); kwargs...)

