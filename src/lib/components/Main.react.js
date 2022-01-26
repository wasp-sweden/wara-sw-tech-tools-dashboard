import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridLayout, { WidthProvider } from "react-grid-layout";
import Widget from './Widget.react';

const Grid = WidthProvider(GridLayout)

const useStyles = makeStyles((theme) => ({
    layout: {
        "&>div": {backgroundColor: "white"},
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
        {i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2},
        {i: 'd', x: 6, y: 0, w:4, h:4}
      ];
    
    // TO-DO: make children to widgets and display all children
    
    return (
        <Grid 
            className={classes.layout}
            layout={layout}
            cols={12}
            rowHeight={30}
        >
            <div key='d'>
                <Widget>
                    {children}
                </Widget>
            </div>
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
