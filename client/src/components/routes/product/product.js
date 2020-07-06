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
import {PageNotFound} from "../../ui/pageNotFound";

function Product() {

    const dispatch = useDispatch()
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
        log.info("[Product] Component will mount...")

        // componentWillUnmount
        return () => {
            log.info("[Product] Component will unmount...")
            dispatch({type: REMOVE_SELECTED_CATEGORY})
            dispatch({type: REMOVE_FILTER_ATTRIBUTES})
            dispatch({type: DELETE_FILTER_QUERY})
            dispatch({type: SELECT_PRODUCT_PAGE, payload: INITIAL_PAGINATION_STATE})
            dispatch({type: SELECT_SORT_CATEGORY, payload: INITIAL_SORT_STATE})
        };
    })

    console.log(`history.location.pathname = ${JSON.stringify(history.location)}`)

    if (history.location.pathname.localeCompare('/products') !== 0
        || !history.location.search.startsWith('?q=')) {
        return <PageNotFound/>
    }

    log.info("[Product] Rendering Product Component.")
    return (
        <>
            <Hidden mdDown>
                <Grid container>
                    <Grid item md={2}>
                        <FilterNavBar/>
                    </Grid>

                    <Grid item md={10}>
                        <Box display="flex" p={2}>
                            <Box width="80%">
                            <BreadcrumbsSection linkList={breadcrumbLinks}/>
                            </Box>
                            <Box width="auto">
                                <FilterDropdown/>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box width="75%" p={1}>
                                <FilterChips/>
                            </Box>
                        </Box>
                        <Divider/>
                        <FilterProductsDisplay/>
                        <Divider/>
                        <FilterPagination/>
                    </Grid>
                </Grid>
            </Hidden>

            <Hidden lgUp>
                <FilterNavBar/>
                <FilterProductsDisplay/>
                {/*<BottomNavBar/>*/}
            </Hidden>
        </>
    );
}

export default Product;