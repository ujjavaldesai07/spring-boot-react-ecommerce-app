import React from 'react';
import log from 'loglevel';
import {Paper, Grid, Hidden} from "@material-ui/core";
import PriceDetails from "../priceDetails";
import ShippingAddress from "./shippingAddress";
import ShippingOptions from "./shippingOptions";
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const checkoutBgColor = "#80808033"

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
        marginTop: "1rem"
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: 0,
    },
}))(MuiAccordionDetails);


function Checkout() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const renderTitle = title => {
        return (
            <Grid item
                  style={{fontSize: "1.8rem", fontWeight: "bolder",
                  paddingLeft: "1rem"}}>
                {title}
            </Grid>
        )
    }

    log.info("[Checkout] Rendering Checkout Component.")

    return (
        <Grid container justify={"center"} style={{
            backgroundColor: checkoutBgColor,
            paddingBottom: "5rem"
        }}>

            <Grid item xs={12} sm={11} md={7}>

                <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        {renderTitle("Shipping Address")}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ShippingAddress/>
                    </AccordionDetails>
                </Accordion>

                <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        {renderTitle("Shipping Options")}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ShippingOptions/>
                    </AccordionDetails>
                </Accordion>

            </Grid>

            <Hidden smDown>
                <Grid item style={{paddingRight: 20}}/>
            </Hidden>

            <Grid item sm={11} md={4} style={{height: 300, marginTop: "1rem"}}>
                <Paper square style={{width: "inherit"}}>
                    <PriceDetails buttonName="PLACE ORDER"/>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default Checkout;