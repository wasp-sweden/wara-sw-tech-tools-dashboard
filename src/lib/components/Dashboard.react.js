import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from './Menu.react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { drawerWidth } from './Menu.react';


const useStyles = makeStyles( (theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
}))

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default function Dashboard(props) {
    const {id, label, setProps, value, children} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const toggle = () => { setOpen(!open) };
    
    // TO-DO: "dashboards" should be prop for Dashboard
    return (
        <div id={id}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton 
                    aria-label="menu"
                    onClick={toggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu 
                toggle={toggle}
                isOpen={open}
                dashboards={ {
                    depclean: "DepClean",
                    vaccinate: "V.A.C.C.I.N.A.T.E",
            } }>
            </Menu>
            <Button variant="contained">TEP Dashboard</Button>
            <div style={{backgroundColor: "20px", padding: "20px", backgroundColor: "green"}}>{children}</div>
            What: {label}&nbsp;
            <input
                value={value}
                onChange={
                    /*
                        * Send the new value to the parent component.
                        * setProps is a prop that is automatically supplied
                        * by dash's front-end ("dash-renderer").
                        * In a Dash app, this will update the component's
                        * props and send the data back to the Python Dash
                        * app server if a callback uses the modified prop as
                        * Input or State.
                        */
                    e => setProps({ value: e.target.value })
                }
            />
        </div>
    );
}

Dashboard.defaultProps = {};

Dashboard.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

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
