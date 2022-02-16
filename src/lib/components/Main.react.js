import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import clsx from 'clsx';

import { SizeContext } from "./visualization/depclean/DepcleanGraph";

const Grid = WidthProvider(GridLayout)

export const WidgetContext = React.createContext({ showMetaData: () => {}, key: -1 })

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

/**
 * Main is the part of the dashboard
 * that displays all data.
 */
export default function Main(props) {
    const {id, label, setProps, value, showMetaData, className, children} = props;
    const classes = useStyles();
    const theme = useTheme();

    const layout = [
        {i: '0', x: 0, y: 0, w: 6, h: 6},
        {i: '1', x: 1, y: 0, w: 6, h: 6},
        {i: '2', x: 4, y: 0, w: 6, h: 6},
        {i: '3', x: 6, y: 0, w:6, h:6}
      ];
    
    return (
            <Grid 
                className={clsx(classes.layout, className)}
                layout={layout}
                cols={12}
                rowHeight={50}
                isResizable
                draggableHandle=".dragIcon"
            >
                {children.map( (widget, key) => 
                    <div key={key}> 
                        <WidgetContext.Provider
                            value={{showMetaData, key}}
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
