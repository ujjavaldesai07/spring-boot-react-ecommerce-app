import React from 'react';
import Grid from "@material-ui/core/Grid";
import TitleHeader from "../../parts/titleHeader";
import CollapsableSearch from "../../parts/collapsableSearch";
import CheckboxList from "../../parts/checkboxList";


export default function FilterCheckBoxSection(props) {
    const handleSearchClick = () => {

    }

    const addCollapsableSearch = () => {
        if(!props.searchBar)
            return null
        return (
            <Grid item xs={4}>
                <CollapsableSearch handleOnClick={handleSearchClick}/>
            </Grid>
        )
    }

    console.log("Calling Filter Checkbox.... = " + props.title)

    return (
        <>
            <Grid container style={{paddingTop: '10px'}}>
                <Grid item xs={1}/>
                <Grid item xs={6} style={{paddingTop: '2px'}}>
                    <TitleHeader title={props.title} fontWeight="bold" fontSize="1.2rem"/>
                </Grid>
                {addCollapsableSearch()}
            </Grid>

            <CheckboxList attrList={props.attrList}
                          fontSize="1rem"
                          title={props.title}
                          checkBoxGroupId={props.checkBoxGroupId}
                          onChangeHandler={props.onChangeHandler}
                          selectedAttributes={props.selectedAttributeList}
            />
        </>
    );
}
