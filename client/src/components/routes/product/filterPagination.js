import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {SELECT_PRODUCT_PAGE} from "../../../actions/types";
import Pagination from "@material-ui/lab/Pagination";
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {toggleId} from "../../../helper/toggleId";
import history from "../../../history";
import {updateQueryString} from "../../../helper/updateQueryString";

export default function FilterPagination() {
    const selectedPage = useSelector(state => state.selectPageReducer)
    const filterProductsReducer = useSelector(state => state.filterProductsReducer)
    const [page, setPage] = useState(1)
    let totalProducts = 0

    useEffect(() => {
        if(selectedPage != null) {
            setPage(selectedPage.pageNumber)
        }
    }, [selectedPage])

    const handleChangePage = (event, page) => {
        log.info(`[FilterPagination] dispatching SELECT_PRODUCT_PAGE for page = ${page}`)

        setPage(page)
        let route = history.location.pathname
        let queryStr = history.location.search
        if (history.location.search.search("page") === -1) {
            history.push(`${route}${queryStr}::page=${page-1},${MAX_PRODUCTS_PER_PAGE}`)
        } else {
            history.push(`${route}${queryStr.replace(new RegExp(`page=[0-9]+,${MAX_PRODUCTS_PER_PAGE}`),
                `page=${page-1},${MAX_PRODUCTS_PER_PAGE}`)}`)
        }
    }

    // if we got data from the server side
    if (!filterProductsReducer || filterProductsReducer.hasOwnProperty("data") === false ||
        filterProductsReducer.data.hasOwnProperty("totalCount") === false) {
        log.info(`[FilterPagination] totalProducts = ${totalProducts}`)
        return null
    } else {
        // set the total products used to calculate how many pages require
        totalProducts = filterProductsReducer.data.totalCount
    }

    log.info(`[FilterPagination] Rendering FilterPagination Component selectedPage = ${JSON.stringify(selectedPage)}`)

    return (
        <Grid container direction="column"
              alignItems="center"
              justify="center"
              style={{padding: "30px 0 100px 0"}}>
            <Pagination onChange={handleChangePage}
                        page={page}
                        count={totalProducts <= MAX_PRODUCTS_PER_PAGE ? 1 : Math.floor(totalProducts / MAX_PRODUCTS_PER_PAGE)}
                        color="secondary"/>
        </Grid>
    );
}
