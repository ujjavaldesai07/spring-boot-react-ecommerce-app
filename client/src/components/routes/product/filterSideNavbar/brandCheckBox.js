import React, {useEffect, useState} from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_SELECTED_CATEGORY, SAVE_SORT_LIST} from "../../../../actions/types";
import CheckboxMoreButton from "./checkboxMoreButton";
import CheckboxSearchBar from "./checkboxSearchBar";
import {useSortList} from "./sortListHook";

export default function BrandCheckBox() {
    const TITLE = "Brand"
    const propName="brands"
    const dispatch = useDispatch()
    const brandList = useSelector(state => state.filterAttributesReducer ?
        state.filterAttributesReducer.brands : null)
    const selectedBrands = useSelector(state => state.selectedFilterAttributesReducer.brands)
    const [searchBrandList, setSearchBrandList] = useState(null)

    useSortList(brandList, propName)

    if (!brandList) {
        log.debug(`[BrandCheckBox] brandList is null`)
        return null
    }

    const getActiveBrandList = () => {
        return searchBrandList ? searchBrandList : brandList
    }

    const handleSearchListChange = (searchList) => {
        setSearchBrandList(searchList)
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[BrandCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        dispatch({
            type: ADD_SELECTED_CATEGORY,
            payload: {
                brands: {
                    id, value
                }
            }
        })
    }

    log.debug(`[BrandCheckBox] selectedBrands = ${JSON.stringify(selectedBrands)}`)

    log.info(`[BrandCheckBox] Rendering BrandCheckBox Component`)

    return (
        <>
            <CheckboxSearchBar title={TITLE}
                               placeholderText="Search for Brands"
                               checkboxList={brandList}
                               searchListHandler={handleSearchListChange}
            />
            <CheckboxList attrList={getActiveBrandList()}
                          fontSize="0.9rem"
                          title="Brand"
                          maxItems={6}
                          selectedAttrList={selectedBrands}
                          onChangeHandler={handleCheckBoxChange}/>
            <CheckboxMoreButton title={TITLE}
                                propName={propName}
                                checkboxList={brandList}
                                selectedCheckboxList={selectedBrands}
                                checkboxChangeHandler={handleCheckBoxChange}/>
        </>
    );
}
