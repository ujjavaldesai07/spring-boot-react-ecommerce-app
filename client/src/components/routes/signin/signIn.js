import React, {useEffect, useState} from "react";
import SignInForm from "./signInForm"
import {Grid, Typography} from "@material-ui/core";
import log from "loglevel";
import {StyledWebButton} from "../../../styles/semanticUI/customStyles";
import {Divider, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { Dimmer, Loader } from 'semantic-ui-react'
import {useSelector} from "react-redux";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {timestamp} = useSelector(state => state.signInReducer)

    const setIsLoadingState = () => {
        setIsLoading(true);
    }

    useEffect(() => {
        log.info(`[SignIn]: Component did mount...`)
        setIsLoading(false)

    }, [timestamp])

    log.info(`[SignIn]: Rendering SignIn Component`)

    return (
        <Grid container justify="center" style={{paddingTop: "2rem"}}>
            <Grid item container xs={10} sm={5} lg={3} direction="column">

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

                {isLoading ? <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer> : null}

            </Grid>
        </Grid>
    )
}

export default SignIn;