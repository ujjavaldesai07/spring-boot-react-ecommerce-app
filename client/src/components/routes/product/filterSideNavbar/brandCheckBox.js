import React, {useEffect, useState} from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useSelector} from "react-redux";
import CheckboxMoreButton from "./checkboxMoreButton";
import CheckboxSearchBar from "./checkboxSearchBar";
import {toggleId} from "../../../../helper/toggleId";
import history from "../../../../history";
import {updateQueryString} from "../../../../helper/updateQueryString";

export default function BrandCheckBox() {
    const TITLE = "Brand"
    const propName = "brands"
    const brandList = useSelector(state => state.filterAttributesReducer.data ?
        state.filterAttributesReducer.data.brands : null)
    const [searchBrandList, setSearchBrandList] = useState(null)
    const selectedBrands = useSelector(state => state.selectedFilterAttributesReducer.brands)
    const [selectedList, setSelectedList] = useState([])
    const resetFilter = useSelector(state => state.clearFiltersReducer)

    useEffect(() => {
        if (selectedBrands.length > 0) {
            setSelectedList(selectedBrands)
        } else {
            setSelectedList([])
        }
    }, [selectedBrands])

    useEffect(() => {
        if(resetFilter) {
            if(selectedList.length > 0) {
                setSelectedList([])
            }
        }
    }, [history.location.search])

    // return if doesn't got anything from the server
    if (!brandList) {
        log.debug(`[BrandCheckBox] brandList is null`)
        return null
    }

    /**
     * return the normal list or list based on search keyword
     * @returns {any}
     */
    const getActiveBrandList = () => {
        console.log("sortedBrandList ==================> " + JSON.stringify(searchBrandList))
        return searchBrandList ? searchBrandList : brandList
    }

    const handleSearchListChange = (searchList) => {
        setSearchBrandList(searchList)
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[BrandCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        const {list, ids} = toggleId(id, value, selectedList)
        setSelectedList(list)
        history.push(updateQueryString(history, propName, id, ids))
    }

    log.info(`[BrandCheckBox] Rendering BrandCheckBox Component`)

    return (
        <>
            <CheckboxSearchBar title={TITLE}
                               placeholderText="Search for Brands"
                               checkboxList={brandList}
                               searchListHandler={handleSearchListChange}/>
            <CheckboxList attrList={getActiveBrandList()}
                          title="Brand"
                          maxItems={6}
                          selectedAttrList={selectedList}
                          onChangeHandler={handleCheckBoxChange}/>
            <CheckboxMoreButton title={TITLE}
                                propName={propName}
                                checkboxList={brandList}
                                size={9}
                                selectedCheckboxList={selectedList}
                                checkboxChangeHandler={handleCheckBoxChange}/>
        </>
    );
}
