import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from "react-router-dom";
import log from 'loglevel';

export default function BreadcrumbsSection(props) {
    const renderLinks = () => {
        log.info(`[BreadcrumbsSection] props.linkList = ${props.linkList}`)
        // we dont need link for the active page breadcrumb
        // eslint-disable-next-line array-callback-return
        return props.linkList.splice(0, props.linkList.length-1).map(({name, link}) => {
            if(link.length > 0) {
                return (
                    <Link color="inherit" to={link} key={name}>
                        {name}
                    </Link>
                )
            }
        })
    }

    log.info(`[BreadcrumbsSection] Rendering BreadcrumbsSection Component`)

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {renderLinks()}
            <Typography color="textPrimary">{props.linkList[props.linkList.length - 1].name}</Typography>
        </Breadcrumbs>
    );
}
