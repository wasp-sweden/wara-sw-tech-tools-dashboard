# AUTO GENERATED FILE - DO NOT EDIT

main <- function(children=NULL, id=NULL, value=NULL) {
    
    props <- list(children=children, id=id, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Main',
        namespace = 'tep_dashboard',
        propNames = c('children', 'id', 'value'),
        package = 'tepDashboard'
        )

    structure(component, class = c('dash_component', 'list'))
}
