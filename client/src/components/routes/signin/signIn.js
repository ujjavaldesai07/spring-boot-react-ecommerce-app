import React, {useEffect, useState} from "react";
import SignInForm from "./signInForm"
import {Grid, Typography} from "@material-ui/core";
import log from "loglevel";
import {Divider} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Dimmer, Loader} from 'semantic-ui-react'
import {useDispatch, useSelector} from "react-redux";
import GoogleAuthButton from "./GoogleAuthButton";
import {DocumentTitle} from "../../ui/documentTitle";
import {RESET_SIGN_IN_ERROR} from "../../../actions/types";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {isSignedIn, timestamp} = useSelector(state => state.signInReducer)
    const {isSignedInUsingOAuth} = useSelector(state => state.googleAuthReducer)
    const dispatch = useDispatch()

    const setIsLoadingState = () => {
        setIsLoading(true);
    }

    useEffect(() => {
        log.info(`[SignIn]: Component did mount...`)
        setIsLoading(false)

        // eslint-disable-next-line
    }, [timestamp])

    useEffect(() => {

        return () => {
            log.info(`[SignIn] Component will unmount...`)
            dispatch({
                type: RESET_SIGN_IN_ERROR
            })
        }

        // eslint-disable-next-line
    }, [])

    if ((isSignedIn !== null && isSignedIn)
        || (isSignedInUsingOAuth !== null && isSignedInUsingOAuth)) {
        log.info(`[SignIn] Already signed In...`)
        return null
    }

    log.info(`[SignIn]: Rendering SignIn Component`)

    return (
        <Grid container justify="center" style={{paddingTop: "2rem"}}>
            <Grid item container xs={10} sm={5} lg={3} direction="column">
                <DocumentTitle title="Sign In"/>
                <Grid item style={{alignSelf: "center", paddingBottom: "1rem"}}>
                    <h1 style={{fontSize: "2.5rem"}}>Sign In</h1>
                </Grid>

                <SignInForm loadingHandler={setIsLoadingState}/>

                <Grid container justify="center">
                    <Grid item style={{width: "100%", padding: "1rem 0"}}>
                        <Divider horizontal>Or</Divider>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item xs={7} sm={5}>
                        <GoogleAuthButton/>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Typography style={{padding: '2rem 0', fontWeight: 'bold'}} variant="subtitle2">
                        Not on Shoppers yet?
                        <Link to="/signup"> Sign up</Link>
                    </Typography>
                </Grid>

                {isLoading ? <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer> : null}

            </Grid>
        </Grid>
    )
}

export default SignIn;