import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterNavBar";
import FilterProductsDisplay from "./filterProductsDisplay";
import {connect} from "react-redux";
import {loadFilterAttributes} from "../../../actions";
import log from 'loglevel';

function FilterScreen(props) {

    // load filter attributes from API
    useEffect(() => {
        log.info("[FilterScreen] Component did mount and filter attributes API is called.")
        props.loadFilterAttributes();
    }, [props]);

    log.info("[FilterScreen] Rendering FilterScreen Component.")
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