import React from 'react';
import Grid from "@material-ui/core/Grid";
import TitleHeader from "../../ui/titleHeader";
import CollapsableSearch from "../../ui/collapsableSearch";
import CheckboxList from "../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_APPAREL_CATEGORY, ADD_BRAND_CATEGORY} from "../../../actions/types";

export default function BrandCheckBox() {
    const TITLE = "Brand"
    const dispatch = useDispatch()
    const brandList = useSelector(state => state.filterAttributesReducer?
        state.filterAttributesReducer.brands : null)
    const selectedBrands = useSelector(state => state.selectBrandReducer)

    if(!brandList) {
        log.debug(`[BrandCheckBox] brandList is null`)
        return null
    }

    const handleSearchClick = () => {
        log.debug(`[BrandCheckBox] handleSearchClick is called`)
    }

    const addCollapsableSearch = () => {
        log.debug(`[BrandCheckBox] addCollapsableSearch is called`)
        return (
            <Grid item xs={4}>
                <CollapsableSearch handleOnClick={handleSearchClick}/>
            </Grid>
        )
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
        <>
            <Grid container style={{paddingTop: '10px'}}>
                <Grid item xs={1}/>
                <Grid item xs={6} style={{paddingTop: '2px'}}>
                    <TitleHeader title={TITLE} fontWeight="bold" fontSize="1.2rem"/>
                </Grid>
                {addCollapsableSearch()}
            </Grid>

            <CheckboxList attrList={brandList}
                          fontSize="1rem"
                          title={TITLE}
                          selectedAttrList={selectedBrands}
                          onChangeHandler={handleCheckBoxChange}/>
        </>
    );
}
