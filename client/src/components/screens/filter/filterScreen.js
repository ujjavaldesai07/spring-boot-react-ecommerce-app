import React from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import FilterAttributesBar from "./filterAttributesBar";
import DropdownSection from "../../parts/dropDown";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function FilterScreen(props) {
    const classes = useStyles();
    return (
        <div>
            <div style={{float: 'right'}}>
            <DropdownSection/>
            </div>
            <FilterAttributesBar/>
        </div>
    );
}

export default FilterScreen;
