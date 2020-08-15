import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Grid} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import log from 'loglevel';
import {connect, useSelector} from "react-redux";
import {getSearchSuggestions, getDataViaAPI} from "../../../actions";
import {makeStyles} from "@material-ui/core/styles";
import {LOAD_FILTER_PRODUCTS} from "../../../actions/types";
import {PRODUCT_BY_CATEGORY_DATA_API} from "../../../constants/api_routes";

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

    const getSelectedValue = () => {
        return document.querySelector('input[id="free-solo"]').value
    }

    const searchKeyword = () => {
        const selectedValue = getSelectedValue()
        if(selectedValue && !selectedValue.isEmpty) {
            let queryLink = null
            for (let index = 0; index < searchSuggestions.data.length; ++index) {
                if (searchSuggestions.data[index].keyword.length === selectedValue.length
                    && searchSuggestions.data[index].keyword.localeCompare(selectedValue) === 0) {

                    // complete match
                    queryLink = searchSuggestions.data[index].link
                    break;
                }
                if(searchSuggestions.data[index].keyword.length > selectedValue.length) {
                    // just stop finding if length exceeds.
                    if(!queryLink) {
                        // then match whatever we have.
                        queryLink = searchSuggestions.data[index].link
                    }
                    break;
                } else {
                    // closest match
                    log.info(``)
                    queryLink = searchSuggestions.data[index].link
                }
            }
            props.getDataViaAPI(LOAD_FILTER_PRODUCTS,
                PRODUCT_BY_CATEGORY_DATA_API + queryLink)
        }
    }

    const handleClose = (event, reason) => {
        setValue('')

        // search is selected
        if (reason === "select-option") {
            searchKeyword()
        }
    }

    const onSearchBtnClick = () => {
        searchKeyword()
        props.handleClose()
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
                    endAdornment: <SearchIcon onClick={onSearchBtnClick} fontSize="large"/>
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

export default connect(null, {getSearchSuggestions, getDataViaAPI})(SearchBar);
