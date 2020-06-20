import React from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import FilterAttributesBar from "./filterAttributesBar";
import DropdownSection from "../../parts/dropDown";
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function FilterScreen(props) {
    const classes = useStyles();
    return (
        <div>
            <FilterAttributesBar/>
        </div>
    );
}

export default FilterScreen;
