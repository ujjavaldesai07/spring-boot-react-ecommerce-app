// import React, {useState} from 'react';
// import log from "loglevel";
// import {Box, IconButton, InputBase} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import useNavBarStyles from "../../../styles/materialUI/navBarStyles";
// import Paper from "@material-ui/core/Paper";
//
// export default function SearchBar() {
//     const classes = useNavBarStyles();
//     const [barActive, setBarActive] = useState(false)
//
//     const searchBarChange = () => {
//         setBarActive(true)
//     }
//
//     const renderSuggestions = () => {
//         return (
//             <Paper elevation={0} square>
//                 <Box p={1}>
//                     Ujjaval
//                 </Box>
//             </Paper>
//         )
//     }
//
//     log.info(`[BagButton]: Rendering BagButton Component`)
//     return (
//         <>
//             <Box className={classes.searchContainer}>
//                 <div className={classes.search}>
//                     <div className={classes.searchIcon}>
//                         <SearchIcon fontSize="large"/>
//                     </div>
//                     <InputBase
//                         onChange={searchBarChange}
//                         placeholder="Search for products, brands and more"
//                         classes={{
//                             root: classes.inputRoot,
//                             input: classes.inputInput
//                         }}
//                         inputProps={{"aria-label": "search"}}/>
//                 </div>
//                 <div className={classes.arrowIcon}>
//                     <IconButton size="medium">
//                         <ArrowForwardIcon fontSize="large"/>
//                     </IconButton>
//                 </div>
//             </Box>
//             {/*{barActive? renderSuggestions():null}*/}
//             {renderSuggestions()}
//         </>
//     );
// };

/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useNavBarStyles from "../../../styles/materialUI/navBarStyles";

export default function SearchBar() {
    const [value, setValue] = React.useState(null);
    const classes = useNavBarStyles();
    return (
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
                size="small"
                classes={{root: classes.autoCompleteRoot}}
                renderInput={(params) => (
                    <TextField {...params} label="Search for products, brands and more" variant="outlined"/>
                )}
            />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},
    {title: 'The Godfather: Part II', year: 1974},
    {title: 'The Dark Knight', year: 2008},
    {title: '12 Angry Men', year: 1957},
    {title: "Schindler's List", year: 1993},
    {title: 'Léon: The Professional', year: 1994},
    {title: 'Like Stars on Earth', year: 2007},
    {title: 'Taxi Driver', year: 1976},
    {title: 'Lawrence of Arabia', year: 1962},
    {title: 'Double Indemnity', year: 1944},
    {title: 'Eternal Sunshine of the Spotless Mind', year: 2004},
    {title: 'Amadeus', year: 1984},
    {title: 'To Kill a Mockingbird', year: 1962},
    {title: 'Toy Story 3', year: 2010},
    {title: 'Logan', year: 2017},
    {title: 'Full Metal Jacket', year: 1987},
    {title: 'Dangal', year: 2016},
    {title: 'The Sting', year: 1973},
    {title: '2001: A Space Odyssey', year: 1968},
    {title: "Singin' in the Rain", year: 1952},
    {title: 'Toy Story', year: 1995},
    {title: 'Bicycle Thieves', year: 1948},
    {title: 'The Kid', year: 1921},
    {title: 'Inglourious Basterds', year: 2009},
    {title: 'Snatch', year: 2000},
    {title: '3 Idiots', year: 2009},
    {title: 'Monty Python and the Holy Grail', year: 1975},
];
