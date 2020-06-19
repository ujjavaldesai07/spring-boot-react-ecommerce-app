import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    if(!props.attrList) {
        return null
    }

    const renderCheckBoxList = () => {
        let count = 0;
        console.log("fontSize = " + props.fontSize)
        return props.attrList.map(({id, type}) => {
            if(count === 6) {
                return null
            }
            count = count+1
            return (
                <ListItem classes={{root: classes.listItemRoot}} key={id} role={undefined} dense button onClick={handleToggle(id)}>
                    <ListItemIcon classes={{root: classes.listItemIconRoot}}>
                        <Checkbox
                            size="small"
                            edge="start"
                            checked={checked.indexOf(id) !== -1}
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
