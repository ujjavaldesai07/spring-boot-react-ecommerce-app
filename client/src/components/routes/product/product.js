import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterSideNavbar/filterNavBar";
import FilterProductsDisplay from "./filterProductDisplay";
import log from 'loglevel';
import Box from "@material-ui/core/Box";
import FilterChips from "./filterChips";
import {Divider} from "@material-ui/core";
import FilterDropdown from "./filterDropdown";
import FilterPagination from "./filterPagination";
import {
    DELETE_FILTER_QUERY, REMOVE_FILTER_ATTRIBUTES,
    REMOVE_SELECTED_CATEGORY,
    SELECT_PRODUCT_PAGE,
    SELECT_SORT_CATEGORY
} from "../../../actions/types";
import {useDispatch} from "react-redux";
import {HOME_ROUTE, INITIAL_PAGINATION_STATE, INITIAL_SORT_STATE} from "../../../constants/constants";
import Hidden from "@material-ui/core/Hidden";
import BottomNavBar from "./bottomNavBar";
import history from "../../../history";
import BreadcrumbsSection from "../../ui/breadcrumbs";
import {SearchMatchesNotFound} from "../../ui/error/searchMatchesNotFound";
import {useBackButton} from "../../backButtonHook";

export const stickyBoxStyle = {
    position: 'sticky',
    top: 80,
    backgroundColor: '#fafafa',
    zIndex: 1040,
    paddingLeft: "1rem"
}

function Product() {
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

    useBackButton()

    if (history.location.pathname.localeCompare('/products') !== 0
        || !history.location.search.startsWith('?q=')) {
        return <SearchMatchesNotFound/>
    }

    log.info("[Product] Rendering Product Component.")
    return (
        <Grid container>
            <Grid item md={3} lg={2}>
                <FilterNavBar/>
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