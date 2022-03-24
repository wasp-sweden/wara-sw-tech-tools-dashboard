import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}))

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default function Menu(props) {
    const { id, setProps, dashboards, toggle, isOpen } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            open={isOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggle}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {Object.keys(dashboards).map(key => (
                <ListItem 
                    button 
                    key={key}
                    onClick={ () => window.location.href = key}
                >
                    <ListItemText primary={dashboards[key]} />
                </ListItem>
            ))}
            </List>
        </Drawer>
    )
}

Menu.defaultProps = {};

Menu.propTypes = {

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The list of dashboards displayed in the sidemenu.
     */
    dashboards: PropTypes.object,

    /**
     * Callback to toggle open state.
     */
    toggle: PropTypes.func,

    /**
     * True if menu is open.
     */
    isOpen: PropTypes.bool,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
