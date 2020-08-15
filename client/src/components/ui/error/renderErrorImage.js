import React from 'react';
import {Grid} from "@material-ui/core";

export const RenderErrorImage = (props) => {

    return (
        <Grid container justify={"center"} alignItems={"center"}
              style={{alignContent: "center", minHeight: "60vh"}}>
            <Grid item xs={12} sm={9} lg={5}>
                <img src={props.image} alt={props.name} style={{height: "50vh", width: "100%"}}/>
            </Grid>
        </Grid>
    );
};