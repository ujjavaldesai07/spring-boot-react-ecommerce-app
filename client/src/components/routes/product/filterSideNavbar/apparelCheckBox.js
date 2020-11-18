import React, {useEffect, useState} from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useSelector} from "react-redux";
import CheckboxMoreButton from "./checkboxMoreButton";
import CheckboxSearchBar from "./checkboxSearchBar";
import {toggleId} from "../../../../helper/toggleId";
import history from "../../../../history";
import {updateQueryString} from "../../../../helper/updateQueryString";

export default function ApparelCheckBox() {
    const TITLE = "Apparel"
    const propName = "apparels"
    const apparelList = useSelector(state => state.filterAttributesReducer.data ?
        state.filterAttributesReducer.data.apparels : null)
    const [searchApparelList, setSearchApparelList] = useState(null)
    const selectedApparels = useSelector(state => state.selectedFilterAttributesReducer.apparels)
    const [selectedList, setSelectedList] = useState([])
    const resetFilter = useSelector(state => state.clearFiltersReducer)

    useEffect(() => {
        if (selectedApparels.length > 0) {
            setSelectedList(selectedApparels)
        } else {
            setSelectedList([])
        }
    }, [selectedApparels])

    useEffect(() => {
        if (resetFilter) {
            if (selectedList.length > 0) {
                setSelectedList([])
            }
        }

        // eslint-disable-next-line
    }, [history.location.search])

    // return if doesn't got anything from the server
    if (!apparelList) {
        log.debug(`[ApparelCheckBox] apparelList is null`)
        return null
    }

    /**
     * return the normal list or list based on search keyword
     * @returns {any}
     */
    const getActiveApparelList = () => {
        return searchApparelList ? searchApparelList : apparelList
    }

    const handleSearchListChange = (searchList) => {
        setSearchApparelList(searchList)
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[ApparelCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        const {list, ids} = toggleId(id, value, selectedList)
        setSelectedList(list)
        history.push(updateQueryString(history, propName, id, ids))
    }

    log.info(`[ApparelCheckBox] Rendering ApparelCheckBox Component`)

    return (
        <>
            <CheckboxSearchBar title={TITLE}
                               placeholderText="Search for Apparels"
                               checkboxList={apparelList}
                               searchListHandler={handleSearchListChange}/>
            <CheckboxList attrList={getActiveApparelList()}
                          title={TITLE}
                          maxItems={6}
                          selectedAttrList={selectedList}
                          onChangeHandler={handleCheckBoxChange}/>
            <CheckboxMoreButton title={TITLE}
                                checkboxList={apparelList}
                                propName={propName}
                                size={6}
                                selectedCheckboxList={selectedList}
                                checkboxChangeHandler={handleCheckBoxChange}/>

        </>
    );
}
