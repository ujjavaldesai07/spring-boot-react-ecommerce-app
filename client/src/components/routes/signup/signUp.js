import React from "react";
import SignUpForm from "./signUpForm"
import {connect} from 'react-redux';
import {signUp} from "../../../actions";
import {Grid} from "@material-ui/core";
import log from "loglevel";

const SignUp = () => {

    log.info(`[SignUp]: Rendering SignUp Component`)

    return (
        <Grid container justify="center" style={{paddingTop: "2rem"}}>
            <Grid item container xs={4} direction="column">
                <Grid item style={{alignSelf: "center"}}>
                    <h1 style={{fontSize: "2.5rem"}}>Sign Up</h1>
                </Grid>
                <SignUpForm/>
            </Grid>
        </Grid>
    )
}

export default connect(null, {signUp})(SignUp);