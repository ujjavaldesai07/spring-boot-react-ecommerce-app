import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Box from '@material-ui/core/Box';
import {SET_FILTER_ATTRIBUTES} from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        paddingTop: "85px",
    },
}));

const FilterChips = props => {
    const classes = useStyles()
    const filterAttributes = useSelector(state => state.filterAttributesReducer)
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)
    const dispatch = useDispatch()

    if (!selectedFilterAttributes) {
        return null
    }

    console.log("selectedFilterAttributes = " + JSON.stringify(selectedFilterAttributes))

    const addBoxTagToList = (boxDataList, category, categoryList) => {
        let chipBoxList = []
        if (boxDataList && boxDataList.length > 0) {
            console.log("boxDataList = " + JSON.stringify(boxDataList) + ", len = " + boxDataList.length)
            boxDataList.forEach(function (id) {
                console.log("id ==== " + id)
                chipBoxList.push(
                    <Box key={`${category}-${id}`} width="auto" display="inline-block" p={0.2}>
                        <Chip label={filterAttributes[categoryList][id-1].type}
                              color="primary"
                              onDelete={handleDelete(`${category}-${id}`)}/>
                    </Box>
                )
            })
        }
        return chipBoxList
    }

    const renderChipBoxes = () => {
        if (selectedFilterAttributes) {
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
            return chipBoxList
        }
        return null
    }

    const handleDelete = (id) => () => {
        const splitId = id.split("-")
        if (selectedFilterAttributes[splitId[0]]
            && selectedFilterAttributes[splitId[0]].length > 0) {
            for (let i = 0; i < selectedFilterAttributes[splitId[0]].length; i++) {
                if (selectedFilterAttributes[splitId[0]][i] === parseInt(splitId[1])) {
                    dispatch({
                        type: SET_FILTER_ATTRIBUTES,
                        payload: {
                            [splitId[0]]: selectedFilterAttributes[splitId[0]][i]
                        }
                    })
                    return
                }
            }
        }
    }

    console.log("Calling Filter Chips....")
    return (
        <>
            {renderChipBoxes()}
        </>
    )
};
export default FilterChips;