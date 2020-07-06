import React, {useEffect} from "react";

import LocalMallIcon from '@material-ui/icons/LocalMall';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Cookies from 'js-cookie';
import {setTokenFromCookie, signOut} from '../../../actions';
import {connect, useDispatch} from 'react-redux'

import {
    AppBar, Toolbar, IconButton, Typography,
    InputBase, Badge, Box
} from '@material-ui/core';

import useNavBarStyles from "../../../styles/materialUI/navBarStyles";
import TabList from "./tabList";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {HANDLE_TAB_HOVER_EVENT, HANDLE_TOKEN_ID} from "../../../actions/types";
import log from "loglevel";
import Hidden from "@material-ui/core/Hidden";
import BagButton from "./bagButton";

const NavBar = props => {
    const classes = useNavBarStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileSearchState, setMobileSearchState] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const {isSignedIn, tokenId} = useSelector(state => state.authApiReducer)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const dispatch = useDispatch()

    useEffect(() => {
        log.info(`[NavBar]: Component did update.`)
        if (isSignedIn === null) {
            log.info(`[NavBar]: isSignedIn is null`)
            let tokenIdFromCookie = Cookies.get(HANDLE_TOKEN_ID)
            if (tokenIdFromCookie) {
                log.info(`[NavBar]: Token set from Cookie`)
                props.setTokenFromCookie(tokenIdFromCookie)
            }
        }
        // eslint-disable-next-line
    }, [isSignedIn]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLoginStatus = () => {
        if (tokenId && isSignedIn) {
            props.signOut()
        }
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={!tokenId ? "/login" : "/"}>
                <MenuItem onClick={handleLoginStatus}>{!tokenId ? 'Login' : 'Logout'}</MenuItem>
            </Link>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Login</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <LocalMallIcon/>
                    </Badge>
                </IconButton>
                <p>Bag</p>
            </MenuItem>
        </Menu>
    );

    const handleMobileSearch = () => {
        log.info("Mobile Search is clicked....")
        setMobileSearchState(true)
    }

    const renderMobileSearchInputField = () => {
        if (!mobileSearchState) {
            return null
        }
        return (
            <InputBase
                placeholder="Search for products, brands and more"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={{"aria-label": "search"}}/>
        )
    }

    const mouseEnterHandler = () => {
        log.info(`[NavBar]: dispatching HANDLE_TAB_HOVER_EVENT with index and hover as false`)
        dispatch({
            type: HANDLE_TAB_HOVER_EVENT, payload: {
                index: false,
                hover: false
            }
        })
    }

    log.info(`[NavBar]: Rendering NavBar Component`)
    return (
        <div style={{paddingBottom: 80}}>
            <AppBar color="default" className={classes.appBarRoot}>
                <Toolbar classes={{root: classes.toolBarRoot}}>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon fontSize="large"/>
                        </IconButton>
                    </Hidden>

                    <Link to="/">
                        <Typography className={classes.title} onMouseEnter={mouseEnterHandler}>
                            Shoppers
                        </Typography>
                    </Link>

                    <div className={classes.growQuarter}/>

                    <Hidden mdDown>
                        <TabList/>
                    </Hidden>

                    <div className={classes.grow_1}/>

                    <Hidden xsDown>
                        <div className={classes.searchContainer} onMouseEnter={mouseEnterHandler}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon fontSize="large"/>
                                </div>
                                <InputBase
                                    placeholder="Search for products, brands and more"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput
                                    }}
                                    inputProps={{"aria-label": "search"}}/>
                            </div>
                            <div className={classes.arrowIcon}>
                                <IconButton size="medium">
                                    <ArrowForwardIcon fontSize="large"/>
                                </IconButton>
                            </div>
                        </div>
                    </Hidden>

                    <Hidden smUp>
                        <div className={classes.mobileSearchContainer}>
                            <div className={classes.mobileSearchButton}>
                                <IconButton size="medium"
                                            onClick={handleMobileSearch}
                                            edge="end">
                                    <SearchIcon fontSize="large"/>
                                </IconButton>
                            </div>
                            {renderMobileSearchInputField()}
                        </div>
                    </Hidden>

                    <div className={classes.grow_1}/>

                    <Hidden smDown>
                        <Box display="flex" justifyContent="center" alignItems="center" css={{width: 90}}>
                            <Box width="50%" onClick={handleProfileMenuOpen} css={{cursor: 'pointer'}}>
                                <Box pl={1}>
                                    <AccountCircle/>
                                </Box>
                                <Box style={{fontSize: "0.8rem", fontWeight: 'bold'}}>
                                    Profile
                                </Box>
                            </Box>
                            <Box width="50%" p={1}>
                                <Link to="/checkout">
                                    <Box pb={0.5}>
                                        <BagButton/>
                                    </Box>
                                    <Box style={{color: "black", fontSize: "0.8rem", fontWeight: 'bold'}}>
                                        Bag
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Hidden>


                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            edge="end"
                        >
                            <MoreIcon fontSize="large"/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
};

export default connect(null, {setTokenFromCookie, signOut})(NavBar);