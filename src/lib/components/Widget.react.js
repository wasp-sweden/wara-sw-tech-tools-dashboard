import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// TO-DO: A widget should include meta-data

const useStyles = makeStyles((theme) => ({
    widget: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    titleBar: {
        height: "20px",
        backgroundColor: "blue",
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
    const {id, label, setProps, value, children} = props;
    const classes = useStyles();
    const theme = useTheme();
    
    return (
        <div className={classes.widget}>
            <div className={`${classes.titleBar} titleBar`}>
                title
            </div>
            <div className={classes.content} >
                {children}
            </div>  
        </div> 
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
     * Children.
     */
    children: PropTypes.node,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
