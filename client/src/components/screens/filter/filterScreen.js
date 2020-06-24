import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterNavBar";
import FilterProductsDisplay from "./filterProductsDisplay";
import {connect} from "react-redux";
import {loadFilterAttributes} from "../../../actions";

function FilterScreen(props) {

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