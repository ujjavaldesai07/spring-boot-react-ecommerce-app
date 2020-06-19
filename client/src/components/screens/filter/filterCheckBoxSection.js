import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TitleHeader from "../../parts/titleHeader";
import CollapsableSearch from "../../parts/collapsableSearch";
import CheckboxList from "../../parts/checkboxList";


export default function FilterCheckBoxSection(props) {
    const handleSearchClick = () => {

    }

    return (
        <>
            <Grid container style={{paddingTop: '10px'}}>
                <Grid item xs={1}/>
                <Grid item xs={6}>
                    <TitleHeader title={props.title} fontWeight="bold" fontSize="1.2rem"/>
                </Grid>
                <Grid item xs={4}>
                    <CollapsableSearch handleOnClick={handleSearchClick}/>
                </Grid>
            </Grid>

            <CheckboxList attrList={props.attrList} fontSize="1rem"/>
        </>
    );
}
