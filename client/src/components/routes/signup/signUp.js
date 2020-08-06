import React, {useEffect, useState} from "react";
import SignUpForm from "./signUpForm"
import {Grid} from "@material-ui/core";
import log from "loglevel";
import {useSelector} from "react-redux";
import {Dimmer, Loader} from "semantic-ui-react";
import {DocumentTitle} from "../../ui/documentTitle";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {timestamp} = useSelector(state => state.signUpReducer)

    const setIsLoadingState = () => {
        setIsLoading(true);
    }

    useEffect(() => {
        log.info(`[SignIn]: Component did mount...`)
        setIsLoading(false)

    }, [timestamp])

    log.info(`[SignUp]: Rendering SignUp Component`)

    return (
        <Grid container justify="center" style={{paddingTop: "2rem"}}>
            <Grid item container xs={10} sm={6} lg={4} direction="column">
                <DocumentTitle title="Sign Up"/>
                <Grid item style={{alignSelf: "center"}}>
                    <h1 style={{fontSize: "2.5rem"}}>Sign Up</h1>
                </Grid>
                <SignUpForm loadingHandler={setIsLoadingState}/>
            </Grid>

            {isLoading ? <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer> : null}
        </Grid>
    )
}

export default SignUp;