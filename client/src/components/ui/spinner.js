import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid} from "@material-ui/core";

export default function Spinner(props) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: props.minHeight }}
        >
            <Grid item xs={3}>
                <CircularProgress color="secondary" />
            </Grid>

        </Grid>
    );
}
