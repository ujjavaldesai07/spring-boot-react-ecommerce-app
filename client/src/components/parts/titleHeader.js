import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme, props) => ({
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

export default function TitleHeader(props) {
    const classes = useStyles();
    const fontWeight = props.fontWeight? props.fontWeight: 'none'
    const fontSize = props.fontSize? props.fontSize: 'none'
    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant={props.variant} style={{fontWeight, fontSize}} noWrap>
                {props.title}
            </Typography>
        </div>
    );
}
