import React, {useEffect} from "react";

import LocalMallIcon from '@material-ui/icons/LocalMall';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie';
import {setTokenFromCookie, signOut} from '../../actions';
import {connect} from 'react-redux'

import {
    AppBar, Toolbar, IconButton, Typography,
    InputBase, Badge
} from '@material-ui/core';

import useNavBarStyles from "../../styles/materialUI/navBarStyles";
import TabList from "../parts/tabList";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {HANDLE_TOKEN_ID} from "../../actions/types";

// css styles
const iconButtonLabel = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
    paddingLeft: '10px'
};

const NavBar = props => {
    const classes = useNavBarStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const {isSignedIn, tokenId} = useSelector(state => state.authApiReducer)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        if(isSignedIn === null) {
            let tokenIdFromCookie = Cookies.get(HANDLE_TOKEN_ID)
            if(tokenIdFromCookie) {
                props.setTokenFromCookie(tokenIdFromCookie)
            }
        }
    }, [props, isSignedIn]);

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
        if(tokenId && isSignedIn) {
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
            <Link to={!tokenId? "/login": "/"}>
                <MenuItem onClick={handleLoginStatus}>{!tokenId? 'Login': 'Logout'}</MenuItem>
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
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <LoyaltyIcon/>
                    </Badge>
                </IconButton>
                <p>Wishlist</p>
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

    return (
        <div style={{paddingBottom: '62px'}}>
            <AppBar color="default" className={classes.appBarRoot}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Link to="/">
                        <Typography className={classes.title} variant="h4">
                            Shoppers
                        </Typography>
                    </Link>
                    <div className={classes.grow}/>
                    <TabList/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search for products, brands and more"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{"aria-label": "search"}}
                        />
                    </div>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <div style={iconButtonLabel}>
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleProfileMenuOpen}
                                classes={{root: classes.iconButtonRoot}}
                            >
                                <AccountCircle/>
                            </IconButton>
                            Profile
                        </div>
                        <div style={iconButtonLabel}>
                            <IconButton aria-label="show 1004 new mails"
                                        color="inherit"
                                        classes={{root: classes.iconButtonRoot}}>
                                <Badge badgeContent={1004} color="secondary">
                                    <LoyaltyIcon/>
                                </Badge>
                            </IconButton>
                            Wishlist
                        </div>
                        <div style={iconButtonLabel}>
                            <IconButton aria-label="show 17 new notifications"
                                        color="inherit"
                                        classes={{root: classes.iconButtonRoot}}>
                                <Badge badgeContent={17} color="secondary">
                                    <LocalMallIcon/>
                                </Badge>
                            </IconButton>
                            Bag
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
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