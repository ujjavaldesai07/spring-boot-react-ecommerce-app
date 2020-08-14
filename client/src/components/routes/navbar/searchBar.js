import React, {useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Grid} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import log from 'loglevel';
import {connect, useSelector} from "react-redux";
import {getSearchSuggestions} from "../../../actions";
import {makeStyles} from "@material-ui/core/styles";

export const useSearchBarStyles = makeStyles(() => ({
    paper: {
        height: 300
    },
    listbox: {
        maxHeight: 340
    }
}));

function SearchBar(props) {
    const [value, setValue] = useState(null);
    const searchSuggestions = useSelector(state => state.searchKeywordReducer)
    const classes = useSearchBarStyles()
    const textFieldRef = useRef(null)

    const handleClose = (event, reason) => {
        if (props.handleClose) {
            props.handleClose();
        }

        // search is selected
        if(reason === "select-option") {
            log.info("Search is selected.... value = "
                + event.target.getAttributeNames())
        }
    }

    const renderDesktopTextField = (params) => {
        return <TextField {...params} label="Search for products, brands and more" variant="outlined"/>
    }

    const renderMobileTextField = (params) => {
        return (
            <TextField
                style={{position: "absolute", left: 0, top: 15}}
                label="Search for products, brands and more"
                variant="outlined"
                {...params}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: <ArrowBackIcon onClick={props.handleClose} fontSize="large"/>,
                    endAdornment: <SearchIcon fontSize="large"/>
                }}
            />
        )
    }

    const handleInputChange = (event, newValue) => {
        props.getSearchSuggestions(newValue)
    }

    log.info("[Search Bar] Rendering search bar....")

    return (
        <Grid container alignItems="center">
            <Autocomplete
                value={value}
                autoComplete={true}
                autoHighlight={true}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                            keyword: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            keyword: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                onInputChange={handleInputChange}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                ref={textFieldRef}
                open
                closeIcon={<CloseIcon/>}
                id="free-solo"
                options={searchSuggestions.data}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.keyword;
                }}
                renderOption={(option) => option.keyword}
                freeSolo
                fullWidth
                onClose={handleClose}
                size={props.size}
                classes={{paper: classes.paper, listbox: classes.listbox}}
                renderInput={(params) =>
                    props.device ? renderMobileTextField(params) : renderDesktopTextField(params)}
            />
        </Grid>
    );
}

export default connect(null, {getSearchSuggestions})(SearchBar);
