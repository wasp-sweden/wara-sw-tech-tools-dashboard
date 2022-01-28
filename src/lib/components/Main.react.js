import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Grid = WidthProvider(GridLayout)

const useStyles = makeStyles((theme) => ({
    layout: {
        "&>div": 
            {backgroundColor: "white"},
    },
}))

/**
 * Main is the part of the dashboard
 * that displays all data.
 */
export default function Main(props) {
    const {id, label, setProps, value, children} = props;
    const classes = useStyles();
    const theme = useTheme();

    const layout = [
        {i: '0', x: 0, y: 0, w: 6, h: 6},
        {i: '1', x: 1, y: 0, w: 6, h: 6},
        {i: '2', x: 4, y: 0, w: 6, h: 6},
        {i: '3', x: 6, y: 0, w:6, h:6}
      ];

    // *BUG* widgets are not resizeable. Try adding handle?
    
    return (
            <Grid 
                className={classes.layout}
                layout={layout}
                cols={12}
                rowHeight={50}
                isResizable
                draggableHandle=".titleBar"
            >
                {children.map( (widget, key) => <div key={key}> {widget} </div>)}
            </Grid>
    );
}

Main.defaultProps = {};

Main.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

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
