import React from 'react';
import Grid from "@material-ui/core/Grid";
import TitleHeader from "../../ui/titleHeader";
import CollapsableSearch from "../../ui/collapsableSearch";
import CheckboxList from "../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_BRAND_CATEGORY} from "../../../actions/types";

export default function BrandCheckBox() {
    const dispatch = useDispatch()
    const brandList = useSelector(state => state.filterAttributesReducer ?
        state.filterAttributesReducer.brands : null)
    const selectedBrands = useSelector(state => state.selectBrandReducer)

    if (!brandList) {
        log.debug(`[BrandCheckBox] brandList is null`)
        return null
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[BrandCheckBox] handleCheckBoxChange(id) = ${id}`)

        dispatch({
            type: ADD_BRAND_CATEGORY,
            payload: {
                id, value
            }
        })
    }

    log.debug(`[BrandCheckBox] selectedBrands = ${JSON.stringify(selectedBrands)}`)

    log.info(`[BrandCheckBox] Rendering BrandCheckBox Component`)

    return (

        <CheckboxList attrList={brandList}
                      fontSize="1rem"
                      title="Brand"
                      selectedAttrList={selectedBrands}
                      onChangeHandler={handleCheckBoxChange}/>
    );
}
