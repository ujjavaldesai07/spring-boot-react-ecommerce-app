import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterSideNavbar/filterNavBar";
import FilterProductsDisplay from "./filterProductDisplay";
import log from 'loglevel';
import FilterChips from "./filterChips";
import {Divider} from "@material-ui/core";
import FilterDropdown from "./filterDropdown";
import FilterPagination from "./filterPagination";
import Hidden from "@material-ui/core/Hidden";
// import BottomNavBar from "./bottomNavBar";
import history from "../../../history";
import BreadcrumbsSection from "../../ui/breadcrumbs";
import {useDispatch} from "react-redux";
import {
    RESET_QUERY_STATUS,
    RESET_SELECT_PRODUCT_PAGE,
    RESET_SELECT_SORT_CATEGORY,
    RESET_SELECTED_CATEGORY,
} from "../../../actions/types";
import {BadRequest} from "../../ui/error/badRequest";
import {HOME_ROUTE} from "../../../constants/react_routes";
import {DocumentTitle} from "../../ui/documentTitle";

export const stickyBoxStyle = {
    position: 'sticky',
    top: 80,
    backgroundColor: '#fafafa',
    zIndex: 1040,
    paddingLeft: "1rem"
}

const RESET_ALL_PRODUCT_STATES = [
    RESET_SELECTED_CATEGORY,
    RESET_SELECT_PRODUCT_PAGE,
    RESET_SELECT_SORT_CATEGORY,
    RESET_QUERY_STATUS]


function Product() {
    const dispatch = useDispatch();

    // define breadcrumbs
    const breadcrumbLinks = [
        {
            name: 'Home',
            link: HOME_ROUTE
        },
        {
            name: 'Products',
            link: `${history.location.pathname + history.location.search}`
        },
    ]

    useEffect(() => {
        log.info(`[Product] Component did mount...`)

        return () => {
            log.info(`[Product] Component will unmount...`)

            // reset the saved query as we will load
            // next time from the URL.
            // This required to support the case where user
            // executes URL directly and we need to construct
            // fresh states for eg selecting options based on URL
            RESET_ALL_PRODUCT_STATES.forEach(type => {
                dispatch({
                    type: type
                })
            })

        }
        // dont need any dependency as we want to update any states
        // eslint-disable-next-line
    }, [])

    // if we got unexpected uri then just send bad request component.
    if (history.location.pathname.localeCompare('/products') !== 0
        || !history.location.search.startsWith('?q=')) {
        return <BadRequest/>
    }

    log.info("[Product] Rendering Product Component.")
    return (
        <Grid container>
            <DocumentTitle title="Shoppers Products"/>
            <Grid item md={3} lg={2}>
                <FilterNavBar linkList={breadcrumbLinks}/>
            </Grid>

            <Grid item md={9} lg={10}>
                <Grid item style={{padding: "1rem", backgroundColor: '#fafafa'}}>
                    <BreadcrumbsSection linkList={breadcrumbLinks}/>
                </Grid>

                <Hidden xsDown>
                    <Grid item container alignItems="center" style={stickyBoxStyle}>
                        <Grid item sm={8}>
                            <FilterChips/>
                        </Grid>
                        <Grid item container justify="flex-end" sm={4} style={{padding: "0 2.5rem 0.5rem 0"}}>
                            <FilterDropdown/>
                        </Grid>
                    </Grid>
                </Hidden>
                <Divider/>
                <FilterProductsDisplay/>
                <Divider/>
                <FilterPagination/>
            </Grid>
        </Grid>
    );
}

export default Product;