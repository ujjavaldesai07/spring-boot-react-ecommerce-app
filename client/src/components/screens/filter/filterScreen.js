import React from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import FilterScreenAttributesBar from "./filterAttributesBar";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function FilterScreen(props) {
    const classes = useStyles();
    return (
        <div>
            <FilterScreenAttributesBar/>
        </div>
    );
}

export default FilterScreen;
