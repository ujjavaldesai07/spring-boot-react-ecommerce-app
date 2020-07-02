import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {
    REMOVE_APPAREL_CATEGORY,
    REMOVE_BRAND_CATEGORY,
    REMOVE_GENDER_CATEGORY, REMOVE_PRICE_CATEGORY,
    SELECT_PRODUCT_PAGE, SELECT_SORT_CATEGORY
} from "../../../actions/types";
import Pagination from "@material-ui/lab/Pagination";
import {INITIAL_PAGINATION_STATE, INITIAL_SORT_STATE, MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {filterProductsReducer} from "../../../reducers/screens/filter/filterScreenReducer";
import {
    selectApparelReducer,
    selectBrandReducer,
    selectGenderReducer, selectPriceReducer
} from "../../../reducers/screens/filter/selectedFilterAttributesReducer";

export default function FilterPagination() {
    const dispatch = useDispatch()
    const selectedPage = useSelector(state => state.selectPageReducer)
    const totalProducts = useSelector(state => state.filterProductsReducer?
        state.filterProductsReducer.totalCount: null)
    const selectedGenders = useSelector(state => state.selectGenderReducer)
    const selectedApparels = useSelector(state => state.selectApparelReducer)
    const selectedBrands = useSelector(state => state.selectBrandReducer)
    const selectedPriceRanges = useSelector(state => state.selectPriceReducer)

    useEffect(() => {
        log.info("[FilterPagination] Component will mount...")
        dispatch({
            type: SELECT_PRODUCT_PAGE,
            payload: INITIAL_PAGINATION_STATE
        })
    },[selectedGenders, selectedApparels, selectedBrands, selectedPriceRanges])

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
        <Grid container direction="column"
              alignItems="center"
              justify="center"
              style={{padding: "30px 0 100px 0"}}>
            <Pagination onChange={handleChangePage}
                        page={selectedPage.pageNumber}
                        count={Math.floor(totalProducts/MAX_PRODUCTS_PER_PAGE)}
                        color="secondary"/>
        </Grid>
    );
}
