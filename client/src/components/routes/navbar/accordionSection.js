import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Accordion, Divider, Grid} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {TAB_CONFIG} from "../../../constants/constants";
import log from "loglevel";
import {PRODUCTS_ROUTE} from "../../../constants/react_routes";

const height = 48

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightMedium,
    },
    subHeading: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightRegular,
    },
    content: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightLight,
        color: "black"
    },
    accordionSummaryRoot: {
        minHeight: height,
        height: height
    },
    accordionSummaryExpanded: {
        minHeight: `${height}px !important`,
        height: `${height}px !important`,
        margin: "0px !important",
        alignItems: "center"
    },
    accordionSummaryContent: {
        margin: "5px 0",
        padding: "0 15px"
    },
    accordionDetailRoot: {
        paddingTop: 0
    },
    subHeaderAccordionRoot: {
        minHeight: height,
        height: height,
        [theme.breakpoints.up('xs')]: {
            width: '244px',
        },
        [theme.breakpoints.up('sm')]: {
            width: '364px',
        },

    },
}));

export default function AccordionSection() {
    const classes = useStyles();
    const tabsAPIData = useSelector(state => state.tabsDataReducer)

    const renderContent = (contentList, mapKey, queryParam) => {
        return contentList.map(({id, value}) => {
            return (
                <Grid item key={`${mapKey}${id}`}>
                    <Link to={`${PRODUCTS_ROUTE}?q=${queryParam}=${id}`}>
                        <Typography className={classes.content}>
                            {value}
                        </Typography>
                        <Divider/>
                    </Link>
                </Grid>
            )
        })
    }

    const renderNestedAccordion = (title, content, key, queryParam) => {
        const id = `${key}-panel-subheader`
        return (
            <Accordion square elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={id}
                    id={id}
                    classes={{
                        root: classes.subHeaderAccordionRoot,
                        expanded: classes.accordionSummaryExpanded,
                        content: classes.accordionSummaryContent
                    }}
                >
                    <Typography className={classes.subHeading}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails classes={{root: classes.accordionDetailRoot}}>
                    <Grid container direction="column" spacing={3} style={{padding: "1rem 0 1rem 2rem"}}>
                        {renderContent(content, key, queryParam)}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        )
    }

    log.info(`[AccordionSection] Rendering AccordionSection...`)

    return TAB_CONFIG.map((conf) => {
        const id = `${conf.mapKey}-panel-header`
        return (
            <div className={classes.root} key={id}>
                <Accordion square elevation={0} key={conf.index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={id}
                        id={id}
                        classes={{root: classes.accordionSummaryRoot, expanded: classes.accordionSummaryExpanded,
                        content: classes.accordionSummaryContent}}
                    >
                        <Typography className={classes.heading}>{conf.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{root: classes.accordionDetailRoot}}>
                        <Grid container direction="column" style={{paddingLeft: "0.5rem"}}>
                            <Grid item>
                                {renderNestedAccordion("Top Brands",
                                    tabsAPIData.data[conf.mapKey].brands,
                                    `${conf.mapKey}-brands-`,"brands")}
                            </Grid>
                            <Grid item>
                                {renderNestedAccordion("Top Categories",
                                    tabsAPIData.data[conf.mapKey].apparels,
                                    `${conf.mapKey}-categories-`, "apparels")}
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    });
}
