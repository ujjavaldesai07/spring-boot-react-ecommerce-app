import React from 'react';
import Grid from "@material-ui/core/Grid";
import TitleHeader from "../../parts/titleHeader";
import CollapsableSearch from "../../parts/collapsableSearch";
import CheckboxList from "../../parts/checkboxList";
import log from 'loglevel';

export default function FilterCheckBoxSection(props) {
    const handleSearchClick = () => {
        log.debug(`[FilterCheckBoxSection] handleSearchClick is called`)
    }

    const addCollapsableSearch = () => {
        if(!props.searchBar) {
            log.debug(`[FilterCheckBoxSection] addCollapsableSearch is called`)
            return null
        }

        log.debug(`[FilterCheckBoxSection] addCollapsableSearch is called`)
        return (
            <Grid item xs={4}>
                <CollapsableSearch handleOnClick={handleSearchClick}/>
            </Grid>
        )
    }

    const getSelectedIdList = () => {
        let selectedIds = []
        if(props.selectedAttributeList && props.selectedAttributeList.length > 0) {
            props.selectedAttributeList.forEach(function (id) {
                selectedIds.push(id)
            })
        }

        log.debug(`[FilterCheckBoxSection] getSelectedIdList selectedIds = ${JSON.stringify(selectedIds)}`)
        return selectedIds
    }

    log.info(`[FilterCheckBoxSection] Rendering FilterCheckBoxSection Component`)

    return (
        <>
            <Grid container style={{paddingTop: '10px'}}>
                <Grid item xs={1}/>
                <Grid item xs={6} style={{paddingTop: '2px'}}>
                    <TitleHeader title={props.title} fontWeight="bold" fontSize="1.2rem"/>
                </Grid>
                {addCollapsableSearch()}
            </Grid>

            <CheckboxList attrList={props.attrList}
                          fontSize="1rem"
                          title={props.title}
                          checkBoxGroupId={props.checkBoxGroupId}
                          selectedIdList={getSelectedIdList()}
                          onChangeHandler={props.onChangeHandler}
            />
        </>
    );
}
