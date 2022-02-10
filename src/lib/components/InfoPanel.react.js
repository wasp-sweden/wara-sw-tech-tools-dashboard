import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { AppBar, List, ListItem, Toolbar } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import { Paper } from '@material-ui/core';
import { Palette, PaletteRounded } from '@material-ui/icons';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { drawerWidth } from './Menu.react';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.default,
    },
    metaPaper: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
    }
}))

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default function InfoPanel(props) {
    const { id, setProps, toggle, isOpen, meta } = props;
    const classes = useStyles();
    const theme = useTheme();

    const formattedMeta = 
        "tool" in meta ? 
        <div>
            <div>
                <b>Tool: </b>
                    {meta["tool"]}
            </div>
            <div>
            <b>Subject: </b>
                {meta["subject"]}
            </div>
            <div>
            <b>Tag: </b>
                {meta["tag"]}
            </div>
            <div>
            <b>Timestamp: </b>
                {meta["timestamp"]}
            </div>
            <div>
            <b>Environment: </b>
                {meta["env"]["uname"].map( elem => <div>{elem}</div>)}
            </div>
        </div>
        : <></>

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={isOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <Divider/>
            <Paper
                className={classes.metaPaper} 
                classes={{
                    paper: classes.metaPaper
                }}
            >
                {formattedMeta}
            </Paper>
        </Drawer>
    )
}

InfoPanel.defaultProps = {};

InfoPanel.propTypes = {

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

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
