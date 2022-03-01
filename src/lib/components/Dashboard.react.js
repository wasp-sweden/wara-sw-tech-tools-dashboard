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
        flexGrow: 1,
        height: "100vh",
        overflow: "visible",
        marginRight: 0,
    },
    mainShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
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
    const { children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [metaData, setMetaData] = useState({})
    const [metaDataKey, setMetaDataKey] = useState(-1)
    const isPanelOpen = metaDataKey !== -1;

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) }

    const showMetaData = (meta, key) => {
        setMetaData(meta)
        if (key === metaDataKey) {
            setMetaDataKey(-1)
        } else {
            setMetaDataKey(key)
        }
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1);
    } 
    
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
                <Main 
                    className={clsx(classes.main, {
                        [classes.mainShift]: isPanelOpen,
                    })}
                    showMetaData={showMetaData}
                >
                    {children}
                </Main>
            <InfoPanel
                isOpen={isPanelOpen}
                meta={metaData}
            >
            </InfoPanel>
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
     * Children.
     */
    children: PropTypes.node,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
