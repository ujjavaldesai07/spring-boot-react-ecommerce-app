import React from 'react';
import log from 'loglevel';
import RadioButtonsGroup from "../../../ui/radioButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {ADD_GENDER_CATEGORY} from "../../../../actions/types";

export default function GenderRadioButton() {
    const dispatch = useDispatch()
    const genderList = useSelector(state => state.filterAttributesReducer?
        state.filterAttributesReducer.genders : null)
    const gender = useSelector(state => state.selectGenderReducer)

    if(!genderList) {
        log.debug(`[GenderRadioButton] genderList is null`)
        return null
    }

    const handleRadioButtonChange = value => {
        log.debug(`[GenderRadioButton] handleRadioButtonChange value = ${value}`)
        for (let i = 0; i < genderList.length; i++) {
            if (value.charAt(0).localeCompare(genderList[i].type.charAt(0)) === 0) {
                log.debug(`[GenderRadioButton] handleRadioButtonChange id = ${genderList[i].id}`)
                dispatch({
                    type: ADD_GENDER_CATEGORY,
                    payload: {
                        id: genderList[i].id,
                        value: value
                    }
                })
                return
            }
        }
    }

    log.info(`[GenderRadioButton] Rendering FilterRadioButtonSection Component`)

    return (
        <div style={{padding: '8px 0 8px 0'}}>
        <RadioButtonsGroup onChangeHandler={handleRadioButtonChange}
                           attrList={genderList.filter(obj => obj.id < 5)}
                           selectedValue={gender.length > 0? gender[0].value: false}
                           title="Gender"/>
        </div>
    );
}
