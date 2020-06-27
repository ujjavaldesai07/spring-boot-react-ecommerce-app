import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Chip from "@material-ui/core/Chip";
import Box from '@material-ui/core/Box';
import log from "loglevel";
import {
    ADD_APPAREL_CATEGORY,
    ADD_BRAND_CATEGORY,
    ADD_GENDER_CATEGORY,
    ADD_PRICE_CATEGORY
} from "../../../actions/types";

const FilterChips = () => {
    const selectedGenders = useSelector(state => state.selectGenderReducer)
    const selectedApparels = useSelector(state => state.selectApparelReducer)
    const selectedBrands = useSelector(state => state.selectBrandReducer)
    const selectedPriceRanges = useSelector(state => state.selectPriceReducer)
    const dispatch = useDispatch()

    if ((selectedGenders.length + selectedApparels.length
        + selectedBrands.length + selectedPriceRanges.length) === 0) {
        log.debug(`[FilterChips] Filter are empty`)
        return null
    }

    const addBoxTagToList = (selectedAttrList, categoryId) => {
        let chipBoxList = []
        log.debug(`[FilterChips] addBoxTagToList boxDataList = ${JSON.stringify(selectedAttrList)}`)

        selectedAttrList.forEach(({id,value}) => {
            log.debug(`[FilterChips] renderChipBoxes id = ${id}, value = ${value}`)
            chipBoxList.push(
                <Box key={`${categoryId}-${id}`} width="auto" display="inline-block" p={0.2}>
                    <Chip label={value}
                          color="primary"
                          onDelete={handleDelete(`${categoryId}-${id}`)}/>
                </Box>
            )
        })

        return chipBoxList
    }

    const renderChipBoxes = () => {
        log.debug(`[FilterChips] renderChipBoxes is invoked`)

        let chipBoxList = []
        if (selectedGenders.length > 0) {
            chipBoxList = chipBoxList.concat(addBoxTagToList(selectedGenders, "ge"))
        }
        if (selectedApparels.length > 0) {
            chipBoxList = chipBoxList.concat(addBoxTagToList(selectedApparels, "ap"))
        }
        if (selectedBrands.length > 0) {
            chipBoxList = chipBoxList.concat(addBoxTagToList(selectedBrands, "br"))
        }
        if (selectedPriceRanges.length > 0) {
            chipBoxList = chipBoxList.concat(addBoxTagToList(selectedPriceRanges, "pr"))
        }

        if (chipBoxList) {
            log.debug(`[FilterChips] renderChipBoxes chipBoxList = ${chipBoxList}`)
            return chipBoxList
        }

        log.info(`[FilterChips] renderChipBoxes is returning null`)
        return null
    }

    const findValueAndDispatch = (actionType, id, selectedAttrList) => {
        log.debug(`[FilterChips] findValueAndDispatch id = ${id}`+
            `, actionType = ${actionType}, selectedAttrList = ${JSON.stringify(selectedAttrList)}`)

        for (let i = 0; i < selectedAttrList.length; i++) {
            if(selectedAttrList[i].id === parseInt(id)) {
                log.info(`[FilterChips] id = ${id} dispatch for actionType = ${actionType}`)
                dispatch({
                    type: actionType,
                    payload: {
                        id: selectedAttrList[i].id,
                        value: selectedAttrList[i].value
                    }
                })
                return
            }
        }
    }

    const handleDelete = (id) => () => {
        log.info(`[FilterChips] handleDelete for chip for id = ${id}`)
        const splitId = id.split("-")

        if(selectedGenders.length > 0 && splitId[0].localeCompare("ge") === 0) {
            findValueAndDispatch(ADD_GENDER_CATEGORY, splitId[1], selectedGenders)
        }
        if(selectedApparels.length > 0 && splitId[0].localeCompare("ap") === 0) {
            findValueAndDispatch(ADD_APPAREL_CATEGORY, splitId[1], selectedApparels)
        }
        if(selectedBrands.length > 0 && splitId[0].localeCompare("br") === 0) {
            findValueAndDispatch(ADD_BRAND_CATEGORY, splitId[1], selectedBrands)
        }
        if(selectedPriceRanges.length > 0 && splitId[0].localeCompare("pr") === 0) {
            findValueAndDispatch(ADD_PRICE_CATEGORY, splitId[1], selectedPriceRanges)
        }
    }

    log.info(`[FilterChips] Rendering FilterChips Component`)
    return (
        <>
            {renderChipBoxes()}
        </>
    )
};
export default FilterChips;