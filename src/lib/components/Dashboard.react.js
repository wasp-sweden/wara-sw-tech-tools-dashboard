import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { drawerWidth } from './Menu.react';
import Box from '@material-ui/core/Box';
import { CssBaseline } from '@material-ui/core';
import { styled, createTheme, ThemeProvider } from '@material-ui/core';

import Main from './Main.react';
import Menu from './Menu.react';
import InfoPanel from './InfoPanel.react';

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
    main: {
        backgroundColor: "grey",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
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
    const [isMenuOpen, setisMenuOpen] = useState(false);

    const toggleMenu = () => { setisMenuOpen(!isMenuOpen) };
    
    // TO-DO: "dashboards" should be prop for Dashboard
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isMenuOpen,
                })}
            >
                <Toolbar>
                    <IconButton 
                    aria-label="menu"
                    onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar> 
            <Toolbar/>
            <Menu 
                toggle={toggleMenu}
                isOpen={isMenuOpen}
                dashboards={ {
                    depclean: "DepClean",
                    vaccinate: "V.A.C.C.I.N.A.T.E",
            } }>
            </Menu>
            <InfoPanel
                isOpen={false}
            >

            </InfoPanel>
            <Main className={classes.main}>
                {children}
            </Main>
            
        </ThemeProvider>
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
