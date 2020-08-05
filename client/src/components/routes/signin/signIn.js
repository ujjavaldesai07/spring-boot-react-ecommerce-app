import React from "react";
import SignInForm from "./signInForm"
import {Grid, Typography} from "@material-ui/core";
import log from "loglevel";
import {StyledWebButton} from "../../../styles/semanticUI/customStyles";
import {Divider, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

const SignIn = () => {

    log.info(`[SignIn]: Rendering SignIn Component`)

    return (
        <Grid container justify="center" style={{paddingTop: "2rem"}}>
            <Grid item container xs={3} direction="column">

                <Grid item style={{alignSelf: "center", paddingBottom: "1rem"}}>
                    <h1 style={{fontSize: "2.5rem"}}>Sign In</h1>
                </Grid>

                <SignInForm/>

                <Grid container justify="center">
                    <Grid item style={{width: "100%", padding: "1rem 0"}}>
                        <Divider horizontal>Or</Divider>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item xs={5}>
                        <StyledWebButton color='google plus'>
                            <Icon name='google plus'/> Google
                        </StyledWebButton>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Typography style={{padding: '2rem 0', fontWeight: 'bold'}} variant="subtitle2">
                        Not on Shoppers yet?
                        <Link to="/signup"> Sign up</Link>
                    </Typography>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default SignIn;