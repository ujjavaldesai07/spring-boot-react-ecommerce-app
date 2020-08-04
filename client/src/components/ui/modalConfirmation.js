import React from 'react';
import log from 'loglevel';
import {Grid, Divider} from "@material-ui/core";
import Modal from "./modal";

export const ModalConfirmation = (props) => {

    log.info("[ModalConfirmation] Rendering ModalConfirmation Component...")
    const renderAddressRemovalConfirmation = () => {
        return (
            <Grid container direction="column">
                <Grid item container direction="column" style={{margin: "1rem"}}>
                    <Grid item
                          style={{color: "#3e4152", fontSize: 14, fontWeight: "bolder", paddingBottom: "1rem"}}>
                        {props.title}
                    </Grid>
                    <Grid item style={{color: "#696b79", fontSize: 14, fontWeight: 200}}>
                        {props.question}
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider style={{width: 300, height: 1}}/>
                </Grid>
                <Grid item container alignItems="center" style={{textAlignLast: "center"}}>
                    <Grid item xs={6} onClick={props.removeConfirmedHandler} style={{
                        color: "red", fontWeight: "bold", cursor: "pointer"
                    }}>
                        REMOVE
                    </Grid>
                    <Divider orientation="vertical" style={{width: 0, height: 45}}/>
                    <Grid item xs={5} onClick={props.closeModalHandler}
                          style={{fontWeight: "bold", cursor: "pointer", paddingLeft: "1.3rem"}}>
                        CANCEL
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Modal renderWarningComponent={renderAddressRemovalConfirmation()}
               modalWidth="300px"
               closeHandler={props.closeModalHandler}/>
    )
}
