# AUTO GENERATED FILE - DO NOT EDIT

menu <- function(id=NULL, dashboards=NULL, isOpen=NULL, toggle=NULL) {
    
    props <- list(id=id, dashboards=dashboards, isOpen=isOpen, toggle=toggle)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Menu',
        namespace = 'tep_dashboard',
        propNames = c('id', 'dashboards', 'isOpen', 'toggle'),
        package = 'tepDashboard'
        )

    structure(component, class = c('dash_component', 'list'))
}
