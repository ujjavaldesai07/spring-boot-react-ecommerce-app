import React, {useState} from 'react';
import InputBase from '@material-ui/core/InputBase';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        float: 'right'
    },
    searchIcon: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        float: "left !important",
        zIndex: 1000,
        right: '1px',
        backgroundColor: "lightgrey"
    },
    inputRoot: {
        color: 'inherit',
        float: 'right'
    },
    inputInput: {
        paddingLeft: '10px',
        borderRadius: '20px',
        backgroundColor: "lightgrey",
        color: "black",
        display: 'block',
        '&:focus': {
            color: "black",
            backgroundColor: "lightgrey",
            webkitTransition: 'width 0.4s ease-in-out',
            transition: 'width 0.4s ease-in-out',
            zIndex: '1000',
            paddingLeft: '10px',
            paddingRight: '10px',
        },
    },
}));

export default function CollapsableSearch(props) {
    const classes = useStyles();
    const [searchIcon, setSearchIcon] = useState(true);

    const handleClick = () => {
        props.handleOnClick()
        setSearchIcon(!searchIcon)
    }

    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <InputBase style={searchIcon? {width: '30px'}:{width: '27ch'} }
                    placeholder={searchIcon? '': "Search…"}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                />
                <IconButton disableRipple size="small" classes={{root: classes.searchIcon}} color="primary" onClick={handleClick}>
                    {searchIcon ?
                        <SearchIcon/> :
                        <CloseIcon/>}
                </IconButton>

            </div>
        </div>
    );
}
