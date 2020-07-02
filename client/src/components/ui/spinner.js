import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Box} from "@material-ui/core";

export default function Spinner() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" css={{ minHeight: "60vh"}}>
            <CircularProgress color="secondary"/>
        </Box>
    );
}
