import React, {useEffect, useState} from 'react';
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {SELECT_SORT_CATEGORY} from "../../../actions/types";
import DropdownSection from "../../ui/dropDown";
import {MAX_PRODUCTS_PER_PAGE, SORT_ATTRIBUTE} from "../../../constants/constants";
import history from "../../../history";

export default function FilterDropdown() {
    const sortList = useSelector(state => state.filterAttributesReducer.data ?
        state.filterAttributesReducer.data[SORT_ATTRIBUTE] : null)
    const selectedSort = useSelector(state => state.selectSortReducer)
    const [sortValue, setSortValue] = useState({id:1, value: ""})

    useEffect(() => {
        if (selectedSort != null) {
            setSortValue(selectedSort)
        }
    }, [selectedSort])

    if (!sortList) {
        return null
    }

    const onChangeHandler = (id, value) => {
        log.info(`[FilterDropdown] onChangeHandler id = ${id}, value = ${value}`)
        setSortValue({id, value})
        let route = history.location.pathname
        let queryStr = history.location.search
        if (history.location.search.search("sortby") === -1) {
            history.push(`${route}${queryStr}::sortby=${id}`)
        } else {
            history.push(`${route}${queryStr.replace(new RegExp(`sortby=[0-9]`), `sortby=${id}`)}`)
        }
    }

    log.info(`[FilterDropdown] Rendering FilterDropdown Component`)

    return (
        <DropdownSection
            attrList={sortList}
            selectedValue={sortValue}
            appendText="Sort by:"
            title="sortby"
            size="lg"
            onChangeHandler={onChangeHandler}/>
    );
}
