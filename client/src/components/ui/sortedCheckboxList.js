import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import log from "loglevel";
import {Box} from "@material-ui/core";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItemIconRoot: {
        minWidth: '0 !important'
    },
    listItemRoot: {
        padding: 0,
        height: "2rem"
    }
}));

export default function SortedCheckboxList(props) {
    const classes = useStyles();
    const savedSortedAttrList = useSelector(state =>
        state.savedSortedListReducer.hasOwnProperty(props.propName) ? state.savedSortedListReducer[props.propName] : null)

    if (!props.attrList) {
        log.debug(`[SortedCheckboxList] props.attrList is null`)
        return null
    }

    if (!savedSortedAttrList) {
        log.info(`[SortedCheckboxList] savedSortedAttrList is empty for prop = ${props.propName}`)
        return null
    }

    const handleToggle = id => () => {
        log.debug(`[SortedCheckboxList] handleToggle for CheckboxList value = ${id}`)

        let value
        for (let i = 0; i < props.attrList.length; i++) {
            if (id === props.attrList[i].id) {
                value = props.attrList[i].value
                log.debug(`[SortedCheckboxList] handleToggle for CheckboxList value = ${value}`)
            }
        }

        props.onChangeHandler(id, value)
    };

    const renderCheckBoxList = () => {
        log.debug(`[SortedCheckboxList] renderCheckBoxList props.selectedAttributes = ${JSON.stringify(props.values)}`)

        let selectedIdList = []
        if (props.selectedAttrList.length > 0) {
            props.selectedAttrList.forEach(({id}) => {
                selectedIdList.push(id)
            })
        }

        let curAlpha;
        let prevAlpha;
        return savedSortedAttrList.map(({id, value, totalItems}) => {
            let newAlpha = null

            // Check we got new first letter if yes then render it.
            curAlpha = value.charAt(0).toUpperCase()
            if (prevAlpha !== curAlpha) {
                newAlpha = curAlpha
                prevAlpha = curAlpha
            }
            return (
                <div key={id}>
                    {newAlpha ?
                        <Box display="flex" alignItems="center" style={{
                            fontWeight: "bolder", width: "30px",
                            fontSize: "1rem", height: "2rem"
                        }}>{newAlpha}</Box> : null}

                    <Box display="flex" style={{paddingRight: "1rem"}}>
                        <ListItem classes={{root: classes.listItemRoot}} role={undefined}
                                  button onClick={handleToggle(id)}>
                            <ListItemIcon classes={{root: classes.listItemIconRoot}}>
                                <Checkbox
                                    size="small"
                                    edge="start"
                                    checked={selectedIdList.length > 0 ? selectedIdList.includes(id) : false}
                                    tabIndex={-1}
                                    inputProps={{'aria-labelledby': id}}
                                />
                            </ListItemIcon>
                            <Box display="flex" alignItems="center">
                                <ListItemText id={id} primary={value}
                                              style={{
                                                  fontSize: "0.9rem",
                                                  fontWeight: "light",
                                                  color: "#282c3f",
                                                  paddingRight: "0.5rem"
                                              }}
                                              disableTypography/>
                                <p style={{color: "#94969f", fontSize: "0.8rem"}}>
                                    {`(${totalItems})`}
                                </p>
                            </Box>
                        </ListItem>
                    </Box>
                </div>
            );
        })
    }

    log.debug(`[SortedCheckboxList] Rendering CheckboxList Component`)
    return (
        <Box display="flex" style={{
            height: "70vh",
            width: "100%",
            flexFlow: "column",
            flexWrap: "wrap",
            padding: "2.5rem 2rem 1rem 2rem"
        }}>
            {renderCheckBoxList()}
        </Box>
    );
}
