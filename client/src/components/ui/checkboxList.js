import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import log from "loglevel";

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

const DISPLAY_MAX_ITEMS = 6

export default function CheckboxList(props) {
    const classes = useStyles();

    if (!props.attrList) {
        log.debug(`[CheckboxList] props.attrList is null`)
        return null
    }

    const handleToggle = id => () => {
        log.debug(`[CheckboxList] handleToggle for CheckboxList value = ${id}`)

        let value
        for (let i = 0; i < props.attrList.length; i++) {
            if (id === props.attrList[i].id) {
                value = props.attrList[i].type
                log.debug(`[CheckboxList] handleToggle for CheckboxList value = ${value}`)
            }
        }

        props.onChangeHandler(id, value)
    };

    const renderCheckBoxList = () => {
        let count = 0;

        log.debug(`[CheckboxList] renderCheckBoxList props.selectedAttributes = ${JSON.stringify(props.values)}`)

        let selectedIdList = []
        if (props.selectedAttrList.length > 0) {
            props.selectedAttrList.forEach(({id}) => {
                selectedIdList.push(id)
            })
        }

        return props.attrList.map(({id, type}) => {
            if (count === DISPLAY_MAX_ITEMS) {
                return null
            }
            count = count + 1

            log.debug(`[CheckboxList] renderCheckBoxList id = ${id}, type = ${type}` +
                `, props.values.includes(id) = ${selectedIdList.includes(id)}`)
            return (
                <ListItem classes={{root: classes.listItemRoot}} key={id} role={undefined}
                          dense button onClick={handleToggle(id)} disableGutters>
                    <ListItemIcon classes={{root: classes.listItemIconRoot}}>
                        <Checkbox
                            size="small"
                            edge="start"
                            checked={selectedIdList.length > 0 ? selectedIdList.includes(id) : false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{'aria-labelledby': id}}
                        />
                    </ListItemIcon>
                    <ListItemText id={id} primary={type} style={{fontSize: props.fontSize}}
                                  disableTypography/>
                </ListItem>
            );
        })
    }

    log.trace(`[CheckboxList] props.attrList = ${JSON.stringify(props.attrList)}`)
    log.debug(`[CheckboxList] Rendering CheckboxList Component`)
    return (
        <List
            className={classes.root}>
            {renderCheckBoxList()}
        </List>
    );
}
