import React from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import DropdownSection from "../../parts/dropDown";
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import FilterNavBar from "./filterNavBar";
import FilterProductsDisplay from "./filterProductsDisplay";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function FilterScreen(props) {
    const classes = useStyles();
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

export default FilterScreen;
