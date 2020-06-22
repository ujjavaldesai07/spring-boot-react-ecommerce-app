import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
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
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    }
}));

export default function CheckboxList(props) {
    const classes = useStyles();

    const handleToggle = (value) => () => {
        props.onChangeHandler(value, props.checkBoxGroupId)
    };

    if(!props.attrList) {
        return null
    }

    const renderCheckBoxList = () => {
        let count = 0;
        let selectedIds = []

        if(props.selectedAttributes && props.selectedAttributes.length > 0) {
            props.selectedAttributes.forEach(function ({id}) {
                selectedIds.push(id)
            })
        }

        // console.log(`${props.title} ===== NEW ======`)
        return props.attrList.map(({id, type}) => {
            if(count === 6) {
                return null
            }
            count = count+1

            // if(selectedIds.length > 0) {
            //     console.log("id = " + id + ", selectedIds.includes(id) = " + selectedIds.includes(id))
            // }

            return (
                <ListItem classes={{root: classes.listItemRoot}} key={id} role={undefined}
                          dense button onClick={handleToggle(id)}>
                    <ListItemIcon classes={{root: classes.listItemIconRoot}}>
                        <Checkbox
                            size="small"
                            edge="start"
                            checked={selectedIds.length > 0? selectedIds.includes(id): false}
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

    return (
        <List
            // subheader={
            // <ListSubheader component="div" id="nested-list-subheader">
            //     Nested List Items
            // </ListSubheader>
        // }
            className={classes.root}>
            {renderCheckBoxList()}
        </List>
    );
}
