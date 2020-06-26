import React from 'react';
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {SELECT_SORT_CATEGORY} from "../../../actions/types";
import DropdownSection from "../../ui/dropDown";

export default function FilterDropdown() {
    const dispatch = useDispatch()
    const sortList = useSelector(state => state.filterAttributesReducer?
        state.filterAttributesReducer.sorts : null)
    const selectedSortValue = useSelector(state => state.selectSortReducer)

    if (!sortList) {
        return null
    }

    const onChangeHandler = (id, value) => {
        log.info(`[FilterDropdown] onChangeHandler id = ${id}, value = ${value}`)
        dispatch({
            type: SELECT_SORT_CATEGORY,
            payload: {
                id, value
            }
        })
    }

    log.info(`[FilterDropdown] Rendering FilterDropdown Component selectedSortValue = ${selectedSortValue}`)

    return (
        <DropdownSection
            attrList={sortList}
            selectedValue={selectedSortValue}
            onChangeHandler={onChangeHandler}/>
    );
}
