import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Chip from "@material-ui/core/Chip";
import Box from '@material-ui/core/Box';
import {SELECT_FILTER_ATTRIBUTES} from "../../../actions/types";
import log from "loglevel";

const FilterChips = () => {
    const filterAttributes = useSelector(state => state.filterAttributesReducer)
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)
    const dispatch = useDispatch()

    if (!selectedFilterAttributes) {
        log.debug(`[FilterChips] selectedFilterAttributes is null`)
        return null
    }

    const addBoxTagToList = (boxDataList, category, categoryList) => {
        let chipBoxList = []
        if (boxDataList && boxDataList.length > 0) {
            log.debug(`[FilterChips] addBoxTagToList boxDataList = ${JSON.stringify(boxDataList)}`)

            boxDataList.forEach(function (id) {
                log.trace(`[FilterChips] renderChipBoxes boxDataList id = ${id}`)

                chipBoxList.push(
                    <Box key={`${category}-${id}`} width="auto" display="inline-block" p={0.2}>
                        <Chip label={filterAttributes[categoryList][id - 1].type}
                              color="primary"
                              onDelete={handleDelete(`${category}-${id}`)}/>
                    </Box>
                )
            })
        }
        return chipBoxList
    }

    const renderChipBoxes = () => {
        log.info(`[FilterChips] renderChipBoxes is invoked`)
        if (selectedFilterAttributes) {
            log.debug(`[FilterChips] renderChipBoxes selectedFilterAttributes = ${selectedFilterAttributes}`)

            let chipBoxList = []
            if (selectedFilterAttributes["apparel"]) {
                chipBoxList = chipBoxList.concat(addBoxTagToList(selectedFilterAttributes["apparel"], "apparel",
                    "apparels"))
            }
            if (selectedFilterAttributes["brand"]) {
                chipBoxList = chipBoxList.concat(addBoxTagToList(selectedFilterAttributes["brand"], "brand",
                    "brands"))
            }
            if (selectedFilterAttributes["price"]) {
                chipBoxList = chipBoxList.concat(addBoxTagToList(selectedFilterAttributes["price"], "price",
                    "priceRanges"))
            }

            log.debug(`[FilterChips] renderChipBoxes chipBoxList = ${chipBoxList}`)
            return chipBoxList
        }

        log.debug(`[FilterChips] renderChipBoxes is returning null`)
        return null
    }

    const handleDelete = (id) => () => {
        log.info(`[FilterChips] handleDelete for chip for id = ${id}`)
        const splitId = id.split("-")
        if (selectedFilterAttributes[splitId[0]]
            && selectedFilterAttributes[splitId[0]].length > 0) {
            log.debug(`[FilterChips] handleDelete for selectedFilterAttributes = ${selectedFilterAttributes}`)
            for (let i = 0; i < selectedFilterAttributes[splitId[0]].length; i++) {

                if (selectedFilterAttributes[splitId[0]][i] === parseInt(splitId[1])) {
                    log.debug(`[FilterChips] handleDelete for SET_FILTER_ATTRIBUTES for chip`)
                    dispatch({
                        type: SELECT_FILTER_ATTRIBUTES,
                        payload: {
                            [splitId[0]]: selectedFilterAttributes[splitId[0]][i]
                        }
                    })
                    return
                }
            }
        }
    }

    log.trace(`[FilterChips] filterAttributes = ${JSON.stringify(filterAttributes)}`)
    log.debug(`[FilterChips] selectedFilterAttributes = ${JSON.stringify(selectedFilterAttributes)}`)

    log.info(`[FilterChips] Rendering FilterChips Component`)
    return (
        <>
            {renderChipBoxes()}
        </>
    )
};
export default FilterChips;