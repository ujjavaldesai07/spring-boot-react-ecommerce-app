import React, {useEffect} from "react";

import LocalMallIcon from '@material-ui/icons/LocalMall';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import {Menu, Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie';
import {getDataViaAPI, setTokenFromCookie, signOut} from '../../../actions';
import {connect, useDispatch} from 'react-redux'

import {
    AppBar, Toolbar, IconButton, Typography,
    Badge, Box
} from '@material-ui/core';

import useNavBarStyles from "../../../styles/materialUI/navBarStyles";
import TabList from "./tabList";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ADD_TO_CART, LOAD_TABS_DATA} from "../../../actions/types";
import log from "loglevel";
import Hidden from "@material-ui/core/Hidden";
import BagButton from "./bagButton";
import {tabsDataReducer} from "../../../reducers/screens/commonScreenReducer";
import Spinner from "../../ui/spinner";
import {HTTPError} from "../../ui/error/httpError";
import {BadRequest} from "../../ui/error/badRequest";
import SearchBar from "./searchBar";
import SideBar from "./sideBar";
import {SHOPPERS_PRODUCT_INFO_COOKIE, TOKEN_ID_COOKIE} from "../../../constants/cookies";
import {TABS_DATA_API} from "../../../constants/api_routes";
import {TABS_API_OBJECT_LEN} from "../../../constants/constants"

const NavBar = props => {
    const classes = useNavBarStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileSearchState, setMobileSearchState] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [hamburgerBtnState, setHamburgerBtnState] = React.useState(false);
    const {isSignedIn, tokenId} = useSelector(state => state.authApiReducer)
    const tabsAPIData = useSelector(state => state.tabsDataReducer)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const dispatch = useDispatch()

    /**
     * set the cart from saved Cookie
     */
    const setAddToCartValuesFromCookie = () => {
        let savedProductsFromCookie = Cookies.get(SHOPPERS_PRODUCT_INFO_COOKIE)
        let totalQuantity = 0
        if (savedProductsFromCookie) {
            savedProductsFromCookie = JSON.parse(savedProductsFromCookie)

            for (const [, qty] of Object.entries(savedProductsFromCookie.productQty)) {
                totalQuantity += parseInt(qty)
            }
            savedProductsFromCookie.totalQuantity = totalQuantity

            log.info(`[BagButton] savedProductsFromCookie = ${JSON.stringify(savedProductsFromCookie)}`)

            dispatch({
                type: ADD_TO_CART,
                payload: savedProductsFromCookie
            })
        }
    }

    /**
     * This will execute only once.
     */
    useEffect(() => {
        log.info(`[NavBar]: Component did update.`)

        // if user is not signed in then signed it in using
        // account details from the cookie.
        if (isSignedIn === null) {
            log.info(`[NavBar]: isSignedIn is null`)
            let tokenIdFromCookie = Cookies.get(TOKEN_ID_COOKIE)
            if (tokenIdFromCookie) {
                log.info(`[NavBar]: Token set from Cookie`)
                props.setTokenFromCookie(tokenIdFromCookie)
            }
        }

        // tabs data is not loaded then load it.
        if(!tabsAPIData.hasOwnProperty("data")) {
            props.getDataViaAPI(LOAD_TABS_DATA, TABS_DATA_API)
        }

        // set the cart values
        setAddToCartValuesFromCookie()

        // eslint-disable-next-line
    }, [isSignedIn, tabsDataReducer]);

    if (tabsAPIData.isLoading) {
        log.info("[NavBar]: loading")
        return <Spinner/>
    } else {
        if (tabsAPIData.hasOwnProperty("data")) {
            if (Object.entries(tabsAPIData.data).length !== TABS_API_OBJECT_LEN) {

                log.info(`[NavBar]: tabsAPIData.data length didn't matched` +
                    `actual length = ${Object.entries(tabsAPIData.data).length},` +
                    `expected length = ${TABS_API_OBJECT_LEN}`)

                return <BadRequest/>
            }
        } else {
            if (tabsAPIData.hasOwnProperty("statusCode")) {
                log.info(`[NavBar]: tabsAPIData.statusCode = ${tabsAPIData.statusCode}`)
                return <HTTPError statusCode={tabsAPIData.statusCode}/>
            }
        }
    }

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

    const handleMobileSearchOpen = () => {
        log.info("Mobile Search is clicked....")
        setMobileSearchState(true)
    }

    const handleMobileSearchClose = () => {
        log.info("Mobile Search is clicked....")
        setMobileSearchState(false)
    }

    const renderMobileSearchInputField = () => {
        if (mobileSearchState === false) {
            return null
        }
        return (
            <SearchBar size="medium" handleClose={handleMobileSearchClose}/>
        )
    }

    const handleHamburgerBtnClick = () => {
        log.info(`[NavBar] opening sidebar`)
        setHamburgerBtnState(true)
    }

    const sidebarCloseHandler = () => {
        log.info(`[NavBar] clickAwayListener is triggered`)
        setHamburgerBtnState(false)
    }

    log.info(`[NavBar]: Rendering NavBar Component`)
    return (
        <>
            <SideBar open={hamburgerBtnState} closeHandler={sidebarCloseHandler}/>

            <div style={{paddingBottom: 80}}>
                <AppBar color="default" className={classes.appBarRoot}>
                    <Toolbar classes={{root: classes.toolBarRoot}}>
                        <Hidden lgUp>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleHamburgerBtnClick}
                            >
                                <MenuIcon fontSize="large"/>
                            </IconButton>
                        </Hidden>

                        <Link to="/">
                            <Typography className={classes.title}>
                                Shoppers
                            </Typography>
                        </Link>

                        <div className={classes.growQuarter}/>

                        <Hidden mdDown>
                            <TabList/>
                        </Hidden>

                        <div className={classes.grow_1}/>

                        <Hidden xsDown>
                            <Grid item container sm={6} lg={4}>
                                <SearchBar size="small"/>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid item container justify="flex-end" xs={5}>
                                <IconButton onClick={handleMobileSearchOpen}
                                            edge="end">
                                    <SearchIcon fontSize="large"/>
                                </IconButton>
                            </Grid>
                            {renderMobileSearchInputField()}
                        </Hidden>

                        <div className={classes.grow_1}/>

                        <Hidden xsDown>
                            <Box display="flex" justifyContent="center" alignItems="center" css={{width: 90}}>
                                <Box width="50%" onClick={handleProfileMenuOpen} css={{cursor: 'pointer'}}>
                                    <Box pl={1} pt={0.3}>
                                        <AccountCircle/>
                                    </Box>
                                    <Box style={{color: "black", fontSize: "0.8rem", fontWeight: 'bold'}}>
                                        Profile
                                    </Box>
                                </Box>
                                <Box width="50%" p={1}>
                                    <Link to="/shopping-bag">
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
        </>
    );
};

export default connect(null, {setTokenFromCookie, signOut, getDataViaAPI})(NavBar);