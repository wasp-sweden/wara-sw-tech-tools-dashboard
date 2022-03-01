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
import { CssBaseline, Typography } from '@material-ui/core';
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
    logo: {
        height: "1.5em",
        marginLeft: "24px",
        marginRight: "24px",
    }
}))

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default function Dashboard(props) {
    const { children, dashboards, selected } = props;
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
                    <img className={classes.logo} src="https://wasp-sweden.org/wp-content/themes/wasp/assets/img/logo_inverse.png"/>
                    <Typography variant="h6">
                        WARA-SW Dashboard: <b>{ dashboards[selected] }</b>
                    </Typography>
                </Toolbar>
            </AppBar> 
            <Toolbar/>
            <Menu 
                toggle={toggleMenu}
                isOpen={isMenuOpen}
                dashboards={dashboards}>
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
     * Dashboards { key: title }
     */
    dashboards: PropTypes.object,

    /**
     * Currently open dashbord.
     */
    selected: PropTypes.string,

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
