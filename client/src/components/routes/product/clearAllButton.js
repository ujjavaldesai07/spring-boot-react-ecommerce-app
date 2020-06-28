import React from 'react';
import log from 'loglevel';
import {connect, useDispatch, useSelector} from "react-redux";
import {
    REMOVE_APPAREL_CATEGORY, REMOVE_BRAND_CATEGORY,
    REMOVE_GENDER_CATEGORY, REMOVE_PRICE_CATEGORY
} from "../../../actions/types";
import Button from "@material-ui/core/Button";
import {loadProducts} from "../../../actions";

function ClearAllButton() {
    const dispatch = useDispatch()
    const selectedGenders = useSelector(state => state.selectGenderReducer)
    const selectedApparels = useSelector(state => state.selectApparelReducer)
    const selectedBrands = useSelector(state => state.selectBrandReducer)
    const selectedPriceRanges = useSelector(state => state.selectPriceReducer)

    if((selectedGenders.length + selectedApparels.length
        + selectedBrands.length + selectedPriceRanges.length) === 0) {
        log.info(`[ClearAllButton] selected attribute are null`)
        return null
    }

    const handleClearAllClick = () => {
        log.info(`[ClearAllButton] handleClearAllClick(value)`)

        if(selectedGenders.length > 0) {
            dispatch({type: REMOVE_GENDER_CATEGORY})
        }
        if(selectedApparels.length > 0) {
            dispatch({type: REMOVE_APPAREL_CATEGORY})
        }
        if(selectedBrands.length > 0) {
            dispatch({type: REMOVE_BRAND_CATEGORY})
        }
        if(selectedPriceRanges.length > 0) {
            dispatch({type: REMOVE_PRICE_CATEGORY})
        }
    }

    log.info(`[ClearAllButton] Rendering ClearAllButton Component`)

    return (
        <>
            <Button onClick={handleClearAllClick} style={{fontWeight: "bold"}}
                    color="secondary">CLEAR ALL</Button>
        </>
    );
}

export default connect(null, {loadProducts})(ClearAllButton);