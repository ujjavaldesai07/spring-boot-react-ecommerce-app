import React, {useState} from 'react';
import log from 'loglevel';
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SortedCheckboxList from "../../../ui/sortedCheckboxList";

export default function CheckboxMoreButton(props) {
    const [moreButtonState, setMoreButtonState] = useState({active: false, topPosition: 0})

    if (!props.checkboxList) {
        log.debug(`[CheckboxMoreButton] apparelList is null`)
        return null
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[CheckboxMoreButton] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        props.checkboxChangeHandler(id, value)
    }

    const handleMoreButton = (event) => {
        setMoreButtonState({active: true, topPosition: parseInt(event.clientY)})
    }

    const handleMoreListCloseButton = () => {
        setMoreButtonState({active: false, topPosition: 0})
    }

    const renderMoreButtonList = () => {
        return (
            <Paper elevation={3} variant="outlined" square
                   style={{backgroundColor: "inherit", width: "100%", height: "70vh"}}>
                <Grid item container direction="row" sm={11} style={{
                    height: '70vh', zIndex: 1300, overflow: "auto", left: 0,
                    position: "fixed", top: 180, backgroundColor: "rgb(230, 230, 230)",
                }}>
                    <SortedCheckboxList attrList={props.checkboxList}
                                        fontSize="0.9rem"
                                        title={props.title}
                                        propName={props.propName}
                                        selectedAttrList={props.selectedCheckboxList}
                                        onChangeHandler={handleCheckBoxChange}/>
                    <Grid item sm={1} container justify="flex-end" style={{height: "5%", paddingRight: "0.5rem"}}>
                        <IconButton size="medium"
                                    color="primary"
                                    onClick={handleMoreListCloseButton}
                                    style={{position: "fixed"}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    const renderMoreButton = () => {
        if (props.checkboxList.length > 6) {
            return (
                <Box pl={1.5} pb={1}>
                    <Button color="secondary" onClick={handleMoreButton}>
                        {`+ ${props.checkboxList.length - 6} more`}
                    </Button>
                </Box>
            )
        }
        return null
    }


    log.debug(`[CheckboxMoreButton] selectedApparels = ${JSON.stringify(props.selectedCheckboxList)}`)

    log.info(`[CheckboxMoreButton] Rendering CheckboxMoreButton Component`)

    return (
        <>
            {renderMoreButton()}
            {moreButtonState.active ? renderMoreButtonList() : null}
        </>
    );
}
