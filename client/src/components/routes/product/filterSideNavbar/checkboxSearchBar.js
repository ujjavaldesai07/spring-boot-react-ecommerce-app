import React from 'react';
import log from 'loglevel';
import {NavBarHeader} from "../../../ui/headers";
import {Grid} from "@material-ui/core";
import CollapsableSearch from "../../../ui/collapsableSearch";

export default function CheckboxSearchBar(props) {

    if (!props.checkboxList) {
        log.debug(`[CheckboxSearchBar] apparelList is null`)
        return null
    }

    const handleSearchBarChange = value => {
        log.info(`[CheckboxSearchBar] handleSearchClick value = ${value}`)
        let filterApparelList = props.checkboxList.filter(info => info.value.toUpperCase().startsWith(value.toUpperCase()))
        props.searchListHandler(filterApparelList)
    }

    const handleSearchBarCancel = () => {
        props.searchListHandler(null)
    }

    log.info(`[CheckboxSearchBar] Rendering CheckboxSearchBar Component`)

    return (
        <Grid container alignItems="center" style={{padding: "1rem 0", height: "fit-content"}}>
            <Grid item style={{paddingLeft: "0.1rem"}}>
                <NavBarHeader title={props.title}/>
            </Grid>
            <CollapsableSearch
                handleOnSearchChange={handleSearchBarChange}
                handleCancelButton={handleSearchBarCancel}
                placeholder={props.placeholderText}
            />
        </Grid>
    );
}
