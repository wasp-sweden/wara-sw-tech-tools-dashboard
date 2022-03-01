import React, {Component, useLayoutEffect, useRef, useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridLayout, { WidthProvider } from "react-grid-layout";
import { WidgetContext } from "./common";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import clsx from 'clsx';

const Grid = WidthProvider(GridLayout)

const useStyles = makeStyles((theme) => ({
    layout: {
        "&>div": 
            {backgroundColor: "white"},
    },
}))

const initialLayout = (children) => children.map((_, i) => ({
    i: `${i}`, x: (i%2)*6, y: Math.ceil(i / 2) * 8, w: 6, h: 8
}));

/**
 * Main is the part of the dashboard
 * that displays all data.
 */
export default function Main(props) {
    const {showMetaData, className} = props;
    const classes = useStyles();
    const children = useMemo(() => React.Children.toArray(props.children), [props.children]);

    const [layout, setLayout] = useState([]);
    
    // When children change, calculate new initial layout (a bit of a hack):
    useEffect(() => setLayout(initialLayout(children)), [children]);
    
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
     * Children.
     */
    children: PropTypes.node,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
