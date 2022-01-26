import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    widget: {
        height: "100%",
        width: "100%",
        "&>*": {
            height: "100%"
        }    
    }
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
            {children}
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
