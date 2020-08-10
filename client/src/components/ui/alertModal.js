import React, {useEffect, useState} from 'react';
import log from 'loglevel';
import {Button, Divider, Grid} from "@material-ui/core";
import Modal from "../ui/modal"

function AlertModal(props) {

    const [alertConfirmation, setAlertConfirmation] = useState(false)

    useEffect(() => {
        log.info(`[AlertModal] Component Did mount`)
        if(props.enable) {
            log.info(`[AlertModal] enabling the alert confirmation`)
            setAlertConfirmation(true)
        }

        // eslint-disable-next-line
    }, [props.timestamp])

    const renderAlertConfirmation = () => {
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
                <Grid item container alignItems="center" justify="center">
                    <Grid item xs={4} style={{padding: "0.8rem 0"}}>
                        <Button variant="contained" color="secondary" style={{
                            width: "100%", height: "2rem"
                        }} onClick={closeModalHandler}>
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const closeModalHandler = () => {
        setAlertConfirmation(false)
    }

    const renderModal = () => {
        return <Modal renderWarningComponent={renderAlertConfirmation()}
                      modalWidth="300px"
                      closeHandler={closeModalHandler}/>
    }

    log.info(`[AlertModal] Rendering AlertModal Component. alertConfirmation = ${alertConfirmation}`)

    return (
        <>
            {alertConfirmation ? renderModal(): null}
        </>
    )
}

export default AlertModal;