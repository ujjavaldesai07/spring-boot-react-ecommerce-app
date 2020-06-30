import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterNavBar";
import FilterProductsDisplay from "./filterProductDisplay";
import log from 'loglevel';
import Box from "@material-ui/core/Box";
import FilterChips from "./filterChips";
import {Divider} from "@material-ui/core";
import FilterDropdown from "./filterDropdown";
import FilterPagination from "./filterPagination";
import {
    REMOVE_APPAREL_CATEGORY,
    REMOVE_BRAND_CATEGORY,
    REMOVE_GENDER_CATEGORY,
    REMOVE_PRICE_CATEGORY, SELECT_PRODUCT_PAGE, SELECT_SORT_CATEGORY
} from "../../../actions/types";
import {useDispatch} from "react-redux";
import {INITIAL_PAGINATION_STATE, INITIAL_SORT_STATE} from "../../../constants/constants";
import Hidden from "@material-ui/core/Hidden";
import BottomNavBar from "./bottomNavBar";

function Product() {

    const dispatch = useDispatch()

    useEffect(() => {

        // componentWillUnmount
        return () => {
            log.info("[Product] Component will unmount...")
            dispatch({type: REMOVE_GENDER_CATEGORY})
            dispatch({type: REMOVE_APPAREL_CATEGORY})
            dispatch({type: REMOVE_BRAND_CATEGORY})
            dispatch({type: REMOVE_PRICE_CATEGORY})
            dispatch({type: SELECT_PRODUCT_PAGE, payload: INITIAL_PAGINATION_STATE})
            dispatch({type: SELECT_SORT_CATEGORY, payload: INITIAL_SORT_STATE})
        };
    })

    log.info("[Product] Rendering Product Component.")
    return (
        <>
            <Hidden mdDown>
                <Grid container>
                    <Grid item md={2}>
                        <FilterNavBar/>
                    </Grid>

                    <Grid item md={10}>
                        <Box display="flex" py={4}>
                            <Box width="75%" p={1}>
                                <FilterChips/>
                            </Box>
                            <Box width="auto">
                                <FilterDropdown/>
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