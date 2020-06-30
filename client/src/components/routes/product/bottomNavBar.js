import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import log from 'loglevel';

const container = {
    fontSize: '2rem',
    bottom: 0,
    padding: 0,
    position: "fixed",
    display: "flex",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1030',
    item: {
        height: '100%',
        width: '100%',
        color: 'black',
        backgroundColor: 'white'
    },
    sortListItem: {
        color: 'black',
        backgroundColor: 'white',
        height: 50,
        fontSize: '1rem',
        fontWeight: 'bold',
    }
}

export default function BottomNavBar() {

    const [sortButtonState, setSortButtonState] = useState(false)
    const [filterButtonState, setFilterButtonState] = useState(false)

    const handleSortClick = () => {
        log.info(`[BottomNavBar] handleSortClick`)
        setSortButtonState(true)
    }

    const handleFilterClick = () => {
        log.info(`[BottomNavBar] handleFilterClick`)
        setFilterButtonState(true)
    }

    const renderBottomNavBarButtons = () => {
        if (sortButtonState || filterButtonState) {
            log.info(`[BottomNavBar] renderSortList returning null`)
            return null
        }
        return (
            <>
                <div style={{flex: "1"}}>
                    <Button variant="contained" style={container.item} onClick={handleSortClick}>
                        <SortIcon fontSize="large" style={{color: 'black'}}/>
                        <span style={{paddingLeft: 10}}>Sort </span></Button>
                </div>
                <div style={{flex: "1"}}>
                    <Button variant="contained" style={container.item} onClick={handleFilterClick}>
                        <FilterListIcon fontSize="large" style={{color: 'black'}}/>
                        <span style={{paddingLeft: 10}}>Filter</span></Button>
                </div>
            </>
        )
    }

    const renderSortList = () => {
        if (!sortButtonState) {
            log.info(`[BottomNavBar] renderSortList returning null`)
            return null
        }
        log.info(`[BottomNavBar] Rendering renderSortList`)
        return (
            <div style={{width: '100%', display: "flex", flexDirection: "column"}}>
                <div style={container.sortListItem}>SORT BY</div>
                <List style={{padding: 0}}>
                    <ListItem style={container.sortListItem}>
                        <ListItemText primary="Ujjaval"/>
                    </ListItem>
                    <ListItem style={container.sortListItem}>
                        <ListItemText primary="Ujjaval"/>
                    </ListItem>
                    <ListItem style={container.sortListItem}>
                        <ListItemText primary="Ujjaval"/>
                    </ListItem>
                    <ListItem style={container.sortListItem}>
                        <ListItemText primary="Ujjaval"/>
                    </ListItem>
                </List>
            </div>
        )
    }

    log.info(`[BottomNavBar] Rendering BottomNavBar component`)

    return (
        <div style={container}>
            {renderBottomNavBarButtons()}
            {renderSortList()}
        </div>
    );
}
