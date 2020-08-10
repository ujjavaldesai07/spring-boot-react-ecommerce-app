import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Grid} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
    const [value, setValue] = React.useState(null);

    const handleClose = () => {
        if (props.handleClose) {
            props.handleClose();
        }
    }

    const renderDesktopTextField = (params) => {
        return  <TextField {...params} label="Search for products, brands and more" variant="outlined"/>
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

    return (
        <Grid container alignItems="center">
            <Autocomplete
                value={value}
                autoHighlight
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                            title: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            title: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                closeIcon={<CloseIcon/>}
                id="free-solo-with-text-demo"
                options={top100Films}
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
                    return option.title;
                }}
                renderOption={(option) => option.title}
                freeSolo
                fullWidth
                onClose={handleClose}
                size={props.size}
                renderInput={(params) =>
                    props.device ? renderMobileTextField(params): renderDesktopTextField(params)}
            />
        </Grid>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    {title: 'Not Working Right Now', year: 1994},

];

export default SearchBar;
