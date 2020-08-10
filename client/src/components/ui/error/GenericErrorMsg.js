import React from 'react'
import log from 'loglevel'
import {Grid} from "@material-ui/core";

export const GenericErrorMsg = () => {

    log.info('[GenericErrorMsg] Rendering GenericErrorMsg Component')
    return (
        <Grid container justify="center" style={{paddingTop: "2rem", fontSize: "3rem"}}>
            <p>Oops! Something went wrong....</p>
        </Grid>
    )
}