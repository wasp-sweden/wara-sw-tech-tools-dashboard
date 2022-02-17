import React, {useContext, useState, useLayoutEffect, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { WidgetContext } from './common';

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
        cursor: "grab",
    },
    tools: {
        display: "flex",
        alignItems: "center"
    },
    content: {
        flexGrow: 1,
        "&>*": {
            height: "100%",
            width: "100%",
        },
        position: "relative",
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

    const ref = useRef(null);
    const [size, setSize] = useState({
        width: 100,
        height: 100,
    });

    const recomputeSize = () => {
        if (ref.current != null) {
            const width = ref.current.clientWidth;
            const height = ref.current.clientHeight;
            if (width != size.width || height != size.height) {
                setSize({
                    width: ref.current.clientWidth,
                    height: ref.current.clientHeight,
                });
            }
        }
    }

    useLayoutEffect(recomputeSize);
    useEffect(() => {
        window.addEventListener("resize", recomputeSize);
        return () => window.removeEventListener("resize", recomputeSize);
    });
    
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
                    <div className={classes.tools}>
                        <DragIndicatorIcon 
                            className={`${classes.dragIcon} dragIcon`}
                            color={theme.palette.text.secondary}
                        >
                        </DragIndicatorIcon>
                        <IconButton onClick={ () => showMetaData(meta, key)}>
                            <VisibilityIcon position="right">
                            </VisibilityIcon>
                        </IconButton>
                        
                    </div>
                </Toolbar>
            </AppBar>
            <div 
                ref={ref}
                className={classes.content}
            >
                <WidgetContext.Provider value={{ showMetaData, key, width: size.width, height: size.height }}>
                    {children}
                </WidgetContext.Provider>
            </div>  
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
