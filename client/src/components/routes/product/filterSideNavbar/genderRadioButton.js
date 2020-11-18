import React, {useEffect, useState} from 'react';
import log from 'loglevel';
import RadioButtonsGroup from "../../../ui/radioButtonGroup";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {NavBarHeader} from "../../../ui/headers";
import history from "../../../../history";

export default function GenderRadioButton() {
    const genderList = useSelector(state => state.filterAttributesReducer.data ?
        state.filterAttributesReducer.data.genders : null)
    const resetFilter = useSelector(state => state.clearFiltersReducer)
    const selectedGenders = useSelector(state => state.selectedFilterAttributesReducer.genders)
    const [selectedValue, setSelectedValue] = useState(false)

    useEffect(() => {
        if(selectedGenders.length > 0) {
            setSelectedValue(selectedGenders[0].value)
        } else {
            setSelectedValue(false)
        }
    }, [selectedGenders])

    useEffect(() => {
        if(resetFilter) {
            if(selectedValue !== false) {
                setSelectedValue(false)
            }
        }
    }, [resetFilter])

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
                setSelectedValue(value)
                let route = history.location.pathname
                let queryStr = history.location.search
                if(history.location.search.search("genders") === -1) {
                    history.push(`${route}${queryStr}::genders=${genderList[i].id}`)
                } else {
                    history.push(`${route}${queryStr.replace(/genders=[0-9]/gi, `genders=${genderList[i].id}`)}`)
                }
                return
            }
        }

        // scroll window to top after selection
        window.scrollTo(0, 80)
    }

    log.info(`[GenderRadioButton] Rendering FilterRadioButtonSection Component...`)

    return (
        <>
            <Grid item style={{padding: "1rem 0"}}>
                <NavBarHeader title="Gender"/>
            </Grid>
            <Grid item style={{marginLeft: "0.5rem"}}>
                <RadioButtonsGroup onChangeHandler={handleRadioButtonChange}
                                   attrList={genderList.filter(obj => obj.id < 5)}
                                   selectedValue={selectedValue}
                                   title="Gender"/>
            </Grid>
        </>
    );
}
