import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    }
}));

export default function SortedCheckboxList(props) {
    const classes = useStyles();
    const savedSortedAttrList = useSelector(state =>
        state.savedSortedListReducer.hasOwnProperty(props.propName)? state.savedSortedListReducer[props.propName]: null)

    if (!props.attrList) {
        log.debug(`[CheckboxList] props.attrList is null`)
        return null
    }

    if(!savedSortedAttrList) {
        log.info(`[SortedCheckboxList] savedSortedAttrList is empty for prop = ${props.propName}`)
        return null
    }

    const handleToggle = id => () => {
        log.debug(`[CheckboxList] handleToggle for CheckboxList value = ${id}`)

        let value
        for (let i = 0; i < props.attrList.length; i++) {
            if (id === props.attrList[i].id) {
                value = props.attrList[i].value
                log.debug(`[CheckboxList] handleToggle for CheckboxList value = ${value}`)
            }
        }

        props.onChangeHandler(id, value)
    };

    const renderCheckBoxList = () => {
        log.debug(`[CheckboxList] renderCheckBoxList props.selectedAttributes = ${JSON.stringify(props.values)}`)


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
            curAlpha = value.charAt(0).toUpperCase()
            if (prevAlpha !== curAlpha) {
                newAlpha = curAlpha
                prevAlpha = curAlpha
            }
            return (
                <div key={id}>
                    {newAlpha ?
                        <Box display="flex" style={{fontWeight: "bolder", fontSize: "1rem"}}>{newAlpha}</Box> : null}
                    <ListItem classes={{root: classes.listItemRoot}} role={undefined}
                              button onClick={handleToggle(id)} style={{width: "100%", paddingRight: "1rem"}}>
                        <ListItemIcon classes={{root: classes.listItemIconRoot}}>
                            <Checkbox
                                size="small"
                                edge="start"
                                checked={selectedIdList.length > 0 ? selectedIdList.includes(id) : false}
                                tabIndex={-1}
                                inputProps={{'aria-labelledby': id}}
                            />
                        </ListItemIcon>
                        <Box display="flex" flexDirection="row">
                            <Box>
                                <ListItemText id={id} primary={value}
                                              style={{fontSize: props.fontSize, fontWeight: "medium"}}
                                              disableTypography/>
                            </Box>
                            <Box alignSelf="center" pl={0.5} css={{color: "#94969f", fontSize: "0.8rem"}}>
                                {`(${totalItems})`}
                            </Box>
                        </Box>
                    </ListItem>
                </div>
            );
        })
    }

    log.trace(`[CheckboxList] props.attrList = ${JSON.stringify(props.attrList)}`)
    log.debug(`[CheckboxList] Rendering CheckboxList Component`)
    return (
        <Grid item container sm={11} spacing={0} direction="column" wrap="wrap"
              style={{height: "100%", padding: "2.5rem 1rem 1rem 2rem"}}>
            {renderCheckBoxList()}
        </Grid>
    );
}
