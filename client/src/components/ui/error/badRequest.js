import React from 'react';
import {Grid} from "@material-ui/core";
import badRequestImage from '../../../images/badRequest400.png'

export const BadRequest = () => {

    return (
        <Grid container justify={"center"} style={{alignContent: "center", height: "-webkit-fill-available"}}>
                <img src={badRequestImage} alt="badRequestImage"/>
        </Grid>
    );
};