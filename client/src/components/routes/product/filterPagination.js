import React from 'react';
import Grid from "@material-ui/core/Grid";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {SELECT_PRODUCT_PAGE} from "../../../actions/types";
import Pagination from "@material-ui/lab/Pagination";
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";

export default function FilterPagination() {
    const dispatch = useDispatch()
    const selectedPage = useSelector(state => state.selectPageReducer)

    // const handleChangePage = (event, page) => {
    //     log.info(`[FilterProductDisplay] dispatching SET_FILTER_ATTRIBUTES for page = ${page}`)
    //     dispatch({
    //         type: SELECT_FILTER_ATTRIBUTES,
    //         payload: {
    //             page: [page === 1 ? 0 : (page - 1) * MAX_PRODUCTS_PER_PAGE, MAX_PRODUCTS_PER_PAGE]
    //         }
    //     })
    // }

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

    log.info(`[FilterPagination] Rendering ApparelCheckBox Component`)

    return (
        // <Grid container direction="column"
        //       alignItems="center"
        //       justify="center"
        //       style={{padding: "30px 0 100px 0"}}>
        //     <Pagination onChange={handleChangePage}
        //                 page={selectedFilterAttributes.page[0] === 0 ?
        //                     1 : (selectedFilterAttributes.page[0] / MAX_PRODUCTS_PER_PAGE) + 1}
        //                 count={5}
        //                 color="secondary"/>
        // </Grid>
        <Grid container direction="column"
              alignItems="center"
              justify="center"
              style={{padding: "30px 0 100px 0"}}>
            <Pagination onChange={handleChangePage}
                        page={selectedPage.pageNumber}
                        count={5}
                        color="secondary"/>
        </Grid>
    );
}
