import React, {useState, useRef} from 'react';
import InputBase from '@material-ui/core/InputBase';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
    button: {
        overflow: 'visible',
        position: 'absolute',
        right: '1pc',
        alignSelf: 'center',
        backgroundColor: '#f5f5f6',
        zIndex: '1001'
    },
    inputRoot: {
        overflow: 'visible',
        position: 'absolute',
        color: 'inherit',
        float: 'right'
    },
    inputInput: {
        paddingLeft: '10px',
        borderRadius: '15px',
        backgroundColor: "#f5f5f6",
        color: "black",
        fontSize: "1rem !important",
        '&:focus': {
            color: "black",
            backgroundColor: "#f5f5f6",
            webkitTransition: 'width 0.4s ease-in-out',
            transition: 'width 0.4s ease-in-out',
            zIndex: '1000',
            paddingLeft: '10px',
            paddingRight: '15px',
        },
    },
}));

export default function CollapsableSearch(props) {
    const textInputRef = useRef();
    const classes = useStyles();
    const [searchIcon, setSearchIcon] = useState(true);

    const handleSearchBarChange = event => {
        props.handleOnSearchChange(event.target.value)
    }

    const handleSearchButton = () => {
        props.handleCancelButton()
        setSearchIcon(!searchIcon)
    }

    const renderInputField = () => {
        if (searchIcon) {
            return null
        }
        return (
                <InputBase style={{width: '26ch'}}
                           placeholder={props.placeholder}
                           type="text"
                           autoFocus
                           classes={{
                               root: classes.inputRoot,
                               input: classes.inputInput,
                           }}
                           inputRef={textInputRef}
                           onChange={handleSearchBarChange}
                           inputProps={{'aria-label': 'search'}}/>
        )
    }

    return (
        <>
                {renderInputField()}
                <IconButton size="small"
                            color="primary"
                            classes={{root: classes.button}}
                            onClick={handleSearchButton}
                >
                    {searchIcon ? <SearchIcon/> : <CloseIcon/>}
                </IconButton>
        </>
    );
}
