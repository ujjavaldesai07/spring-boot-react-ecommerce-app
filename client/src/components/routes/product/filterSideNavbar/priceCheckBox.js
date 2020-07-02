import React from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_PRICE_CATEGORY} from "../../../../actions/types";

export default function PriceCheckBox() {
    const TITLE = "Price"
    const dispatch = useDispatch()
    const priceRangeList = useSelector(state => state.filterAttributesReducer?
        state.filterAttributesReducer.priceRanges : null)
    const selectedPriceRanges = useSelector(state => state.selectPriceReducer)

    if(!priceRangeList) {
        log.debug(`[PriceCheckBox] priceRangeList is null`)
        return null
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[PriceCheckBox] handleCheckBoxChange(id) = ${id}`)

        dispatch({
            type: ADD_PRICE_CATEGORY,
            payload: {
                id, value
            }
        })
    }

    log.debug(`[PriceCheckBox] selectedPriceRanges = ${JSON.stringify(selectedPriceRanges)}`)

    log.info(`[PriceCheckBox] Rendering PriceCheckBox Component`)

    return (
        <>
            <CheckboxList attrList={priceRangeList}
                          fontSize="1rem"
                          title={TITLE}
                          selectedAttrList={selectedPriceRanges}
                          onChangeHandler={handleCheckBoxChange}/>
        </>
    );
}
