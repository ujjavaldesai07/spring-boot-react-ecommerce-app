import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {SELECT_PRODUCT_PAGE} from "../../../actions/types";
import Pagination from "@material-ui/lab/Pagination";
import {INITIAL_PAGINATION_STATE, MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";

export default function FilterPagination() {
    const dispatch = useDispatch()
    const selectedPage = useSelector(state => state.selectPageReducer)
    const filterProductsReducer = useSelector(state => state.filterProductsReducer)
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)
    let totalProducts = 0

    useEffect(() => {
        log.info("[FilterPagination] Component will mount...")
        dispatch({
            type: SELECT_PRODUCT_PAGE,
            payload: INITIAL_PAGINATION_STATE
        })

        // eslint-disable-next-line
    },[selectedFilterAttributes])

    const handleChangePage = (event, page) => {
        log.info(`[FilterPagination] dispatching SELECT_PRODUCT_PAGE for page = ${page}`)
        dispatch({
            type: SELECT_PRODUCT_PAGE,
            payload: {
                pageNumber: page,
                maxProducts: MAX_PRODUCTS_PER_PAGE
            }
        })
    }

    if(!filterProductsReducer || filterProductsReducer.hasOwnProperty("data") === false ||
        filterProductsReducer.data.hasOwnProperty("totalCount") === false) {
        log.info(`[FilterPagination] totalProducts = ${totalProducts}`)
        return null
    } else {
        totalProducts = filterProductsReducer.data.totalCount
    }

    log.info(`[FilterPagination] Rendering FilterPagination Component selectedPage = ${JSON.stringify(selectedPage)}`)

    return (
        <Grid container direction="column"
              alignItems="center"
              justify="center"
              style={{padding: "30px 0 100px 0"}}>
            <Pagination onChange={handleChangePage}
                        page={selectedPage.pageNumber}
                        count={totalProducts <= MAX_PRODUCTS_PER_PAGE? 1: Math.floor(totalProducts/MAX_PRODUCTS_PER_PAGE)}
                        color="secondary"/>
        </Grid>
    );
}
