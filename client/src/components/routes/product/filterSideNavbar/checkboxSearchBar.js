import React from 'react';
import log from 'loglevel';
import {NavBarHeader} from "../../../ui/headers";
import {Box} from "@material-ui/core";
import CollapsableSearch from "../../../ui/collapsableSearch";

export default function CheckboxSearchBar(props) {

    if (!props.checkboxList) {
        log.debug(`[CheckboxSearchBar] apparelList is null`)
        return null
    }

    const handleSearchBarChange = value => {
        log.info(`[CheckboxSearchBar] handleSearchClick value = ${value}`)
        let filterApparelList = props.checkboxList.filter(info => info.value.toUpperCase().search(value.toUpperCase()) !== -1)
        props.searchListHandler(filterApparelList)
    }

    const handleSearchBarCancel = () => {
        props.searchListHandler(null)
    }

    log.info(`[CheckboxSearchBar] Rendering CheckboxSearchBar Component`)

    return (
        <Box display="flex" alignItems="center" pt={2}>
            <Box width="50%">
                <NavBarHeader title={props.title}/>
            </Box>
            <Box width="50%">
                <CollapsableSearch
                    handleOnSearchChange={handleSearchBarChange}
                    handleCancelButton={handleSearchBarCancel}
                    placeholder={props.placeholderText}
                />
            </Box>
        </Box>
    );
}
