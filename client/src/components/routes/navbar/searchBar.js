import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Grid} from "@material-ui/core";
import log from 'loglevel';
import {connect, useSelector} from "react-redux";
import {getSearchSuggestions, getDataViaAPI} from "../../../actions";
import {makeStyles} from "@material-ui/core/styles";
import {LOAD_FILTER_PRODUCTS} from "../../../actions/types";
import {PRODUCT_BY_CATEGORY_DATA_API} from "../../../constants/api_routes";
import {Loader} from "semantic-ui-react";
import {StyledSearchBarDimmer} from "../../../styles/semanticUI/customStyles";

export const useSearchBarStyles = makeStyles((theme) => ({
    paper: {
        height: 250
    },
    listbox: {
        maxHeight: 240,
    },
    option: {
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 40
        },
    }
}));

function SearchBar(props) {
    const [value, setValue] = useState(null);
    const searchSuggestions = useSelector(state => state.searchKeywordReducer)
    const filterProductsReducer = useSelector(state => state.filterProductsReducer)
    const classes = useSearchBarStyles()
    const [isLoading, setIsLoading] = useState(false)
    let selectedValue = null

    useEffect(() => {
        log.info(`[SearchBar] Component did mount`)
        setIsLoading(false)
    }, [filterProductsReducer])

    const getSearchKeyword = () => {
        return document.querySelector('input[id="free-solo"]').value
    }

    const searchKeyword = (value) => {
        if (value && !value.isEmpty) {
            let queryLink = null
            for (let index = 0; index < searchSuggestions.data.length; ++index) {
                if (searchSuggestions.data[index].keyword.length === value.length
                    && searchSuggestions.data[index].keyword.localeCompare(value) === 0) {

                    // complete match
                    queryLink = searchSuggestions.data[index].link
                    break;
                } else {
                    queryLink = searchSuggestions.data[index].link
                }
            }

            log.info(`queryLink = ${queryLink}, value = ${value}`)
            if (queryLink) {
                setIsLoading(true)
                props.getDataViaAPI(LOAD_FILTER_PRODUCTS,
                    `${PRODUCT_BY_CATEGORY_DATA_API}?q=${queryLink}`)
            }
        }
    }

    const handleClose = () => {
        let finalSelectedValue = selectedValue
        if (!selectedValue) {
            finalSelectedValue = getSearchKeyword()
        }
        searchKeyword(finalSelectedValue)
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
                }}
            />
        )
    }

    const handleInputChange = (event, newValue) => {
        selectedValue = newValue
        props.getSearchSuggestions(newValue)
    }

    log.info(`[Search Bar] Rendering search bar....`)

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
                classes={{paper: classes.paper, listbox: classes.listbox, option: classes.option}}
                renderInput={(params) =>
                    props.device ? renderMobileTextField(params) : renderDesktopTextField(params)}
            />
            {isLoading ?
                <StyledSearchBarDimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </StyledSearchBarDimmer> : null}

        </Grid>
    );
}

export default connect(null, {getSearchSuggestions, getDataViaAPI})(SearchBar);
