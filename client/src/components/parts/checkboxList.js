import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    }
}));

const DISPLAY_MAX_ITEMS = 6

export default function CheckboxList(props) {
    const classes = useStyles();

    if(!props.attrList) {
        log.debug(`[CheckboxList] props.attrList is null`)
        return null
    }

    const handleToggle = (value) => () => {
        log.debug(`[CheckboxList] handleToggle for CheckboxList value = ${value},
         props.checkBoxGroupId = ${props.checkBoxGroupId} `)
        props.onChangeHandler(value, props.checkBoxGroupId)
    };

    const renderCheckBoxList = () => {
        let count = 0;

        log.debug(`[CheckboxList] renderCheckBoxList props.selectedAttributes = ${JSON.stringify(props.selectedIdList)}`)

        return props.attrList.map(({id, type}) => {
            if(count === DISPLAY_MAX_ITEMS) {
                return null
            }
            count = count+1

            log.trace(`[CheckboxList] renderCheckBoxList id = ${id}, type = ${type}`)
            return (
                <ListItem classes={{root: classes.listItemRoot}} key={id} role={undefined}
                          dense button onClick={handleToggle(id)}>
                    <ListItemIcon classes={{root: classes.listItemIconRoot}}>
                        <Checkbox
                            size="small"
                            edge="start"
                            checked={props.selectedIdList.length > 0? props.selectedIdList.includes(id): false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': id }}
                        />
                    </ListItemIcon>
                    <ListItemText id={id} primary={type} style={{fontSize: props.fontSize}}
                    disableTypography/>
                </ListItem>
            );
        })
    }

    log.debug(`[CheckboxList] props.attrList = ${JSON.stringify(props.attrList)}`)
    log.info(`[CheckboxList] Rendering CheckboxList Component`)
    return (
        <List
            className={classes.root}>
            {renderCheckBoxList()}
        </List>
    );
}
