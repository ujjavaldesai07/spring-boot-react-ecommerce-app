import React from 'react';
import {Grid, Button} from "@material-ui/core";
import pageNotFoundImage from '../../../images/pageNotFound404.png'
import history from "../../../history";
import {RenderErrorImage} from "./renderErrorImage";

export const PageNotFound = () => {
    const onHomeBtnClick = () => {
        history.push(`/`);
    }

    return (
        <>
            <RenderErrorImage image={pageNotFoundImage} name="page-not-found-image"/>
            <Grid container justify="center">
                <Grid item xs={5} sm={3}>
                    <Button variant="contained" size="large" color="secondary"
                            onClick={onHomeBtnClick}
                            style={{width: '100%'}}>
                        Go Home
                    </Button>
                </Grid>
            </Grid>
        </>
    )
        ;
};