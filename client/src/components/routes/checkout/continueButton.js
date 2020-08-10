import React from 'react';
import log from 'loglevel';
import {Button, Grid, Hidden} from "@material-ui/core";

const continueButtonStyle = {
    backgroundColor: "#e01a2b",
    height: 50,
    fontSize: "1rem",
    fontWeight: "bolder",
    color: "White"
}

function ContinueButton(props) {

    const renderContinueDesktopBtn = () => {
        return (
            <Grid item container justify="flex-end" style={{padding: "30px 40px 30px 0"}}>
                <Button variant="contained" size="large" style={{
                    ...continueButtonStyle, width: "27%"
                }} type={props.type} disabled={props.action} onClick={props.buttonHandler}>
                    CONTINUE
                </Button>
            </Grid>
        )
    }

    const renderContinueMobileBtn = () => {
        return (
            <Grid item container justify="center" style={{padding: "30px 0", margin: 0}}>
                <Button variant="contained" size="large" style={{
                    ...continueButtonStyle, width: "85%"
                }} type={props.type} disabled={props.action} onClick={props.buttonHandler}>
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

function continueButtonPropsAreEqual(prevProps, nextProps) {
    return prevProps.action === nextProps.action && !prevProps.buttonHandler;
}

const continueButtonMemoWrapper = React.memo(ContinueButton, continueButtonPropsAreEqual);

export default continueButtonMemoWrapper;