# AUTO GENERATED FILE - DO NOT EDIT

dashboard <- function(children=NULL, id=NULL, label=NULL, value=NULL) {
    
    props <- list(children=children, id=id, label=label, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Dashboard',
        namespace = 'tep_dashboard',
        propNames = c('children', 'id', 'label', 'value'),
        package = 'tepDashboard'
        )

    structure(component, class = c('dash_component', 'list'))
}
