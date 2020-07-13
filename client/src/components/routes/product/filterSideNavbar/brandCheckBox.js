import React, {useState} from 'react';
import {NavBarHeader} from "../../../ui/headers";
import CollapsableSearch from "../../../ui/collapsableSearch";
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_SELECTED_CATEGORY} from "../../../../actions/types";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function BrandCheckBox() {
    const TITLE = "Brand"
    const dispatch = useDispatch()
    const brandList = useSelector(state => state.filterAttributesReducer ?
        state.filterAttributesReducer.brands : null)
    const selectedBrands = useSelector(state => state.selectedFilterAttributesReducer.brands)
    const [searchBrandList, setSearchBrandList] = useState(null)

    if (!brandList) {
        log.debug(`[BrandCheckBox] brandList is null`)
        return null
    }

    const handleSearchBarChange = value => {
        log.info(`[BrandCheckBox] handleSearchClick value = ${value}`)
        let filterBrandList = brandList.filter(info => info.value.toUpperCase().search(value.toUpperCase()) !== -1)
        setSearchBrandList(filterBrandList)
    }

    const handleSearchBarCancel = () => {
        setSearchBrandList(null)
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[BrandCheckBox] handleCheckBoxChange(id) = ${id}`)

        dispatch({
            type: ADD_SELECTED_CATEGORY,
            payload: {
                brands: {id, value}
            }
        })
    }

    const renderMoreButton = () => {
        if (brandList.length > 6) {
            return (
                <Box pl={1.5} pb={1}>
                    <Button color="secondary" onClick={handleMoreButton}>
                        {`+ ${brandList.length - 6} more`}
                    </Button>
                </Box>
            )
        }
        return null
    }

    const handleMoreButton = () => {

    }

    log.debug(`[BrandCheckBox] selectedBrands = ${JSON.stringify(selectedBrands)}`)

    log.info(`[BrandCheckBox] Rendering BrandCheckBox Component`)

    return (
        <>
            <Box display="flex" alignItems="center" pt={2}>
                <Box width="50%">
                    <NavBarHeader title={TITLE}/>
                </Box>
                <Box width="50%">
                    <CollapsableSearch
                        handleOnSearchChange={handleSearchBarChange}
                        handleCancelButton={handleSearchBarCancel}
                        placeholder="Search for Brands"
                    />
                </Box>
            </Box>
            <CheckboxList attrList={searchBrandList ? searchBrandList : brandList}
                          fontSize="0.9rem"
                          title="Brand"
                          maxItems={6}
                          selectedAttrList={selectedBrands}
                          onChangeHandler={handleCheckBoxChange}/>
            {renderMoreButton()}
        </>
    );
}
