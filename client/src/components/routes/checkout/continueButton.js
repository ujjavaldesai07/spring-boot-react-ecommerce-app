import React from 'react';
import log from 'loglevel';
import {Button, Grid, Hidden} from "@material-ui/core";

function ContinueButton() {

    const renderContinueDesktopBtn = () => {
        return (
            <Grid item container justify="flex-end" style={{padding: "30px 40px 0 0"}}>
                <Button variant="contained" size="large" style={{
                    backgroundColor: "#e01a2b",
                    width: "27%", height: 50, fontSize: "1rem", fontWeight: "bolder", color: "White"
                }}>
                    CONTINUE
                </Button>
            </Grid>
        )
    }

    const renderContinueMobileBtn = () => {
        return (
            <Grid container justify="center" style={{paddingTop: 30}}>
                <Button variant="contained" size="large" style={{
                    backgroundColor: "#e01a2b",
                    width: "87%", height: 50, fontSize: "1rem", fontWeight: "bolder", color: "White"
                }}>
                    CONTINUE
                </Button>
            </Grid>
        )
    }

    log.info("[Continue Button] Rendering Continue Button Component.")

    return (
        <>
            <Hidden xsDown>
                {renderContinueDesktopBtn()}
            </Hidden>

            <Hidden smUp>
                {renderContinueMobileBtn()}
            </Hidden>
        </>
    )
}

export default ContinueButton;