import React, {useState} from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_SELECTED_CATEGORY} from "../../../../actions/types";
import {NavBarHeader} from "../../../ui/headers";
import {Box, Grid} from "@material-ui/core";
import CollapsableSearch from "../../../ui/collapsableSearch";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SortedCheckboxList from "../../../ui/sortedCheckboxList";

export default function ApparelCheckBox() {
    const TITLE = "Apparel"
    const dispatch = useDispatch()
    const apparelList = useSelector(state => state.filterAttributesReducer ?
        state.filterAttributesReducer.apparels : null)
    const selectedApparels = useSelector(state => state.selectedFilterAttributesReducer.apparels)
    const [searchApparelList, setSearchApparelList] = useState(null)
    const [moreButtonState, setMoreButtonState] = useState({active: false, topPosition: 0})

    if (!apparelList) {
        log.debug(`[ApparelCheckBox] apparelList is null`)
        return null
    }

    const getActiveApparelList = () => {
        return searchApparelList ? searchApparelList : apparelList
    }

    const handleSearchBarChange = value => {
        log.info(`[ApparelCheckBox] handleSearchClick value = ${value}`)
        let filterApparelList = apparelList.filter(info => info.value.toUpperCase().search(value.toUpperCase()) !== -1)
        setSearchApparelList(filterApparelList)
    }

    const handleSearchBarCancel = () => {
        setSearchApparelList(null)
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[ApparelCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        dispatch({
            type: ADD_SELECTED_CATEGORY,
            payload: {
                apparels: {
                    id, value
                }
            }
        })
    }

    const handleMoreButton = (event) => {
        log.info(`[Apparel Checkbox] clientX = ${event.clientX}, clientY = ${event.clientY}, moreButtonState = ${JSON.stringify(moreButtonState)}`)
        setMoreButtonState({active: true, topPosition: parseInt(event.clientY)})
        log.info(`[Apparel Checkbox] moreButtonState = ${JSON.stringify(moreButtonState)}`)
    }

    const handleMoreListCloseButton = () => {
        setMoreButtonState({active: false, topPosition: 0})
    }

    const renderMoreButtonList = () => {
        return (
            <Paper elevation={3} variant="outlined" square
                   style={{backgroundColor: "inherit", width: "100%", height: "70vh"}}>
                <Grid item container direction="row" sm={8} style={{
                    height: '70vh', zIndex: 1300, overflow: "auto",
                    position: "fixed", top: 180, backgroundColor: "rgb(230, 230, 230)",
                }}>
                    <SortedCheckboxList attrList={getActiveApparelList()}
                                        fontSize="0.9rem"
                                        title={TITLE}
                                        selectedAttrList={selectedApparels}
                                        onChangeHandler={handleCheckBoxChange}/>
                    <Grid item sm={1} container justify="flex-end" style={{height: "5%", paddingRight: "0.5rem"}}>
                        <IconButton size="medium"
                                    color="primary"
                                    onClick={handleMoreListCloseButton}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    const renderCheckboxList = () => {
        return (
            <>
                <Box display="flex" alignItems="center" pt={2}>
                    <Box width="50%">
                        <NavBarHeader title={TITLE}/>
                    </Box>
                    <Box width="50%">
                        <CollapsableSearch
                            handleOnSearchChange={handleSearchBarChange}
                            handleCancelButton={handleSearchBarCancel}
                            placeholder="Search for Apparels"
                        />
                    </Box>
                </Box>
                <CheckboxList attrList={getActiveApparelList()}
                              fontSize="0.9rem"
                              title={TITLE}
                              maxItems={6}
                              selectedAttrList={selectedApparels}
                              onChangeHandler={handleCheckBoxChange}/>
                {renderMoreButton()}
                {moreButtonState.active ? renderMoreButtonList() : null}
            </>
        )
    }

    const renderMoreButton = () => {
        if (getActiveApparelList().length > 6) {
            return (
                <Box pl={1.5} pb={1}>
                    <Button color="secondary" onClick={handleMoreButton}>
                        {`+ ${getActiveApparelList().length - 6} more`}
                    </Button>
                </Box>
            )
        }
        return null
    }


    log.debug(`[ApparelCheckBox] selectedApparels = ${JSON.stringify(selectedApparels)}`)

    log.info(`[ApparelCheckBox] Rendering ApparelCheckBox Component`)

    return (
        <>
            {/*{moreButtonState ? <ModalSection*/}
            {/*    handleCloseButton={handleMoreListCloseButton}*/}
            {/*    content={renderMoreButtonList}/> : renderCheckboxList()}*/}
            {renderCheckboxList()}
        </>
    );
}
