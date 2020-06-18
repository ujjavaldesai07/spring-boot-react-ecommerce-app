import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

export default function TitleComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant={props.variant}
                        style={props.fontWeight? {fontWeight: props.fontWeight}: null} noWrap>
                {props.title}
            </Typography>
        </div>
    );
}
