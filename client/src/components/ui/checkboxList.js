import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import log from "loglevel";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    listItemIconRoot: {
        minWidth: '0 !important'
    },
    listItemRoot: {
        padding: 0,
    }
}));

export default function CheckboxList(props) {
    const classes = useStyles();
    const maxItems = props.maxItems ? props.maxItems : 1000

    if (!props.attrList) {
        log.debug(`[CheckboxList] props.attrList is null`)
        return null
    }

    /**
     * toggle the state of the selected attributes
     * @param id
     * @returns {function(...[*]=)}
     */
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
        let count = 0;

        log.debug(`[CheckboxList] renderCheckBoxList props.selectedAttributes = ${JSON.stringify(props.values)}`)

        // push the selected attributes ID into list
        // so that if it is present in the list we
        // can mark as selected
        let selectedIdList = []
        if (props.selectedAttrList.length > 0) {
            props.selectedAttrList.forEach(({id}) => {
                selectedIdList.push(id)
            })
        }

        return props.attrList.map(({id, value, totalItems}) => {
            if (count === maxItems) {
                return null
            }
            count = count + 1

            log.debug(`[CheckboxList] renderCheckBoxList id = ${id}, type = ${value}` +
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
                    <Grid container alignItems="center">
                        <Grid item>
                            <ListItemText id={id} primary={value} style={{fontSize: "0.9rem"}}
                                          disableTypography/>
                        </Grid>
                        <Grid item style={{color: "#94969f", fontSize: "0.8rem", paddingLeft: "0.3rem"}}>
                            {`(${totalItems})`}
                        </Grid>
                    </Grid>
                </ListItem>
            );
        })
    }

    log.trace(`[CheckboxList] props.attrList = ${JSON.stringify(props.attrList)}`)
    log.debug(`[CheckboxList] Rendering CheckboxList Component`)
    return (
        <List style={{padding: "0 0 0 0.7rem"}}>
            {renderCheckBoxList()}
        </List>
    );
}
