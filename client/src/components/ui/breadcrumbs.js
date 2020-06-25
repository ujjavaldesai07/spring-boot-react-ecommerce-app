import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from "react-router-dom";


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BreadcrumbsSection(props) {

    const renderLinks = () => {
        return props.linkList.map(({link, title}) => {
            return (
                <Link color="inherit" to={link} onClick={handleClick}>
                    {title}
                </Link>
            )
        })
    }

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {renderLinks()}
            <Typography color="textPrimary">{props.activeTitle}</Typography>
        </Breadcrumbs>
    );
}
