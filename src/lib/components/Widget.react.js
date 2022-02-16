import React, {Component, useContext} from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { WidgetContext } from './Main.react';

const useStyles = makeStyles((theme) => ({
    widget: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    titleBar: {
       
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dragIcon: {
    },
    content: {
        flexGrow: 1,
        "&>*": {
            height: "100%",
            width: "100%",
        },
        overflow: "hidden",
    },
}))


/**
 * A widget to display data in the grid
 */
 export default function Widget(props) {
    const {id, label, setProps, value, title, meta, children} = props;
    const classes = useStyles();
    const theme = useTheme();
    const { showMetaData, key } = useContext(WidgetContext);
    
    return (
        <Paper 
            className={classes.widget}
            elevation={3}
        >
            <AppBar 
                className={classes.titleBar}
                position="static"
            >
                <Toolbar 
                    className={classes.toolBar}
                    variant="dense"
                >
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <div>
                        <IconButton className={`${classes.dragIcon} dragIcon`}>
                            <DragIndicatorIcon/>
                        </IconButton>
                        <IconButton onClick={ () => showMetaData(meta, key)}>
                            <VisibilityIcon position="right">
                            </VisibilityIcon>
                        </IconButton>
                        
                    </div>
                </Toolbar>
            </AppBar>
            <Box 
                className={classes.content}
            >
                {children}
            </Box>  
        </Paper> 
    );
}

Widget.defaultProps = {};

Widget.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * The title that will be displayed on the widget.
     */
    title: PropTypes.string,

    /**
     * Meta data for the widget
     */
    meta: PropTypes.object,

    /**
     * Children.
     */
    children: PropTypes.node,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
