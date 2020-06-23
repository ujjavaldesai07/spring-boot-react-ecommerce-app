import React, {useEffect} from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterNavBar";
import FilterProductsDisplay from "./filterProductsDisplay";
import {connect} from "react-redux";
import {loadFilterAttributes} from "../../../actions";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function FilterScreen(props) {
    const classes = useStyles();

    useEffect(() => {
        console.log("Component did update filter attributes")
        props.loadFilterAttributes();
    }, [props]);

    console.log("Calling Filter Screen....")
    return (
        <Grid container>
            <Grid item md={2}>
                <FilterNavBar/>
            </Grid>
            <Grid item md={10}>
                <FilterProductsDisplay/>
            </Grid>
        </Grid>
    );
}

export default connect(null, {loadFilterAttributes})(FilterScreen);