import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterSideNavbar/filterNavBar";
import FilterProductsDisplay from "./filterProductDisplay";
import log from 'loglevel';
import FilterChips from "./filterChips";
import {Divider} from "@material-ui/core";
import FilterDropdown from "./filterDropdown";
import FilterPagination from "./filterPagination";
import {HOME_ROUTE} from "../../../constants/constants";
import Hidden from "@material-ui/core/Hidden";
import BottomNavBar from "./bottomNavBar";
import history from "../../../history";
import BreadcrumbsSection from "../../ui/breadcrumbs";
import {SearchMatchesNotFound} from "../../ui/error/searchMatchesNotFound";
import {useDispatch} from "react-redux";
import {SAVE_QUERY_STATUS} from "../../../actions/types";
import {BadRequest} from "../../ui/error/badRequest";

export const stickyBoxStyle = {
    position: 'sticky',
    top: 80,
    backgroundColor: '#fafafa',
    zIndex: 1040,
    paddingLeft: "1rem"
}

function Product() {
    const dispatch = useDispatch();
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

        const reloadPage = () => {
            window.location.reload()
        }

        window.addEventListener("popstate", reloadPage);

        return () => {
            log.info(`[Product] Component will unmount...`)

            window.removeEventListener("popstate", reloadPage);

            dispatch({
                type: SAVE_QUERY_STATUS,
                payload: null
            })

        }
    }, [])

    if (history.location.pathname.localeCompare('/products') !== 0
        || !history.location.search.startsWith('?q=')) {
        return <BadRequest/>
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