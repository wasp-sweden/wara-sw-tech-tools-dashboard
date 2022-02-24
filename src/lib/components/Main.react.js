import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridLayout, { WidthProvider } from "react-grid-layout";
import { WidgetContext } from "./common";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import clsx from 'clsx';

import { SizeContext } from "./visualization/depclean/DepcleanGraph.react";

const Grid = WidthProvider(GridLayout)

const useStyles = makeStyles((theme) => ({
    layout: {
        "&>div": 
            {backgroundColor: "white"},
    },
}))

const GridComponent = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (ref.current) {
            console.log(ref.current.clientWidth, ref.current.clientHeight);
            setSize({ width: ref.current.clientWidth, height: ref.current.clientHeight });
        }
    });

    return (
        <div style={{ width: "100%", height: "100%" }} ref={ref}>
            <SizeContext.Provider value={size}>{ children }</SizeContext.Provider>
        </div>
    );
};

const initialLayout = (children) => children.map((_, i) => ({
    i: `${i}`, x: (i%2)*6, y: Math.ceil(i / 2) * 8, w: 6, h: 8
}));

/**
 * Main is the part of the dashboard
 * that displays all data.
 */
export default function Main(props) {
    const {id, label, setProps, value, showMetaData, className} = props;
    const classes = useStyles();
    const theme = useTheme();
    const children = React.Children.toArray(props.children);

    const [layout, setLayout] = useState(initialLayout(children));
    
    return (
            <Grid 
                className={clsx(classes.layout, className)}
                layout={layout}
                onLayoutChange={layout => setLayout(layout)}
                cols={12}
                rowHeight={50}
                isResizable
                draggableHandle=".dragIcon"
            >
                {children.map( (widget, key) => 
                    <div key={key}> 
                        <WidgetContext.Provider
                            value={{showMetaData, key, width: 100, height: 100}}
                        >
                            {widget}
                        </WidgetContext.Provider> 
                    </div>)}
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
