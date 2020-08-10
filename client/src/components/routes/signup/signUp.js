import React, {useEffect, useState} from "react";
import SignUpForm from "./signUpForm"
import {Grid} from "@material-ui/core";
import log from "loglevel";
import {useDispatch, useSelector} from "react-redux";
import {Dimmer, Loader} from "semantic-ui-react";
import {DocumentTitle} from "../../ui/documentTitle";
import {RESET_SIGN_UP} from "../../../actions/types";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {timestamp} = useSelector(state => state.signUpReducer)
    const dispatch = useDispatch()

    const setIsLoadingState = () => {
        setIsLoading(true);
    }

    useEffect(() => {
        log.info(`[SignUp]: Component did mount...`)
        setIsLoading(false)

        // eslint-disable-next-line
    }, [timestamp])

    useEffect(() => {

        return () => {
            log.info(`[SignIn] Component will unmount...`)
            dispatch({
                type: RESET_SIGN_UP
            })
        }
        
        // eslint-disable-next-line
    }, [])

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