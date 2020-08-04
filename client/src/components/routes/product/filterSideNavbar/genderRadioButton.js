import React from 'react';
import log from 'loglevel';
import RadioButtonsGroup from "../../../ui/radioButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {ADD_SELECTED_CATEGORY} from "../../../../actions/types";
import {Box, Grid} from "@material-ui/core";
import {NavBarHeader} from "../../../ui/headers";

export default function GenderRadioButton() {
    const dispatch = useDispatch()
    const genderList = useSelector(state => state.filterAttributesReducer ?
        state.filterAttributesReducer.genders : null)
    const gender = useSelector(state => state.selectedFilterAttributesReducer.genders)

    if (!genderList) {
        log.debug(`[GenderRadioButton] genderList is null`)
        return null
    }

    const handleRadioButtonChange = value => {
        log.info(`[GenderRadioButton] handleRadioButtonChange value = ${value}`)

        // compare first character only as all the options has unique first character
        for (let i = 0; i < genderList.length; i++) {
            if (value.charAt(0).localeCompare(genderList[i].value.charAt(0)) === 0) {
                log.info(`[GenderRadioButton] handleRadioButtonChange id = ${genderList[i].id}`)
                dispatch({
                    type: ADD_SELECTED_CATEGORY,
                    payload: {
                        genders: {
                            id: genderList[i].id,
                            value: value,
                            append: false
                        }
                    }
                })
                return
            }
        }

        // scroll window to top after selection
        window.scrollTo(0, 80)
    }

    log.info(`[GenderRadioButton] Rendering FilterRadioButtonSection Component = ${JSON.stringify(gender[0])}`)

    return (
        <>
            <Grid item style={{padding: "1rem 0"}}>
                <NavBarHeader title="Gender"/>
            </Grid>
            <Grid item style={{marginLeft: "0.5rem"}}>
                <RadioButtonsGroup onChangeHandler={handleRadioButtonChange}
                                   attrList={genderList.filter(obj => obj.id < 5)}
                                   selectedValue={gender.length > 0 ? gender[0].value : false}
                                   title="Gender"/>
            </Grid>
        </>
    );
}
