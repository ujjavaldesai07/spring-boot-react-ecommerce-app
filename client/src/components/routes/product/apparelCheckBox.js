import React from 'react';
import Grid from "@material-ui/core/Grid";
import TitleHeader from "../../ui/titleHeader";
import CollapsableSearch from "../../ui/collapsableSearch";
import CheckboxList from "../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_APPAREL_CATEGORY} from "../../../actions/types";

export default function ApparelCheckBox(props) {
    const TITLE = "Apparel"
    const dispatch = useDispatch()
    const apparelList = useSelector(state => state.filterAttributesReducer?
        state.filterAttributesReducer.apparels : null)
    const selectedApparels = useSelector(state => state.selectApparelReducer)

    const handleSearchClick = () => {
        log.debug(`[ApparelCheckBox] handleSearchClick is called`)
    }

    const addCollapsableSearch = () => {
        log.debug(`[ApparelCheckBox] addCollapsableSearch is called`)
        return (
            <Grid item xs={4}>
                <CollapsableSearch handleOnClick={handleSearchClick}/>
            </Grid>
        )
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[ApparelCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        dispatch({
            type: ADD_APPAREL_CATEGORY,
            payload: {
                id, value
            }
        })
    }

    log.info(`[ApparelCheckBox] selectedApparels = ${JSON.stringify(selectedApparels)}`)

    log.info(`[ApparelCheckBox] Rendering ApparelCheckBox Component`)

    return (
        <>
            <Grid container style={{paddingTop: '10px'}}>
                <Grid item xs={1}/>
                <Grid item xs={6} style={{paddingTop: '2px'}}>
                    <TitleHeader title={TITLE} fontWeight="bold" fontSize="1.2rem"/>
                </Grid>
                {addCollapsableSearch()}
            </Grid>

            <CheckboxList attrList={apparelList}
                          fontSize="1rem"
                          title={TITLE}
                          selectedAttrList={selectedApparels}
                          onChangeHandler={handleCheckBoxChange}/>
        </>
    );
}
