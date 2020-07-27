import React from 'react';
import log from 'loglevel';
import {Paper, Grid, Hidden} from "@material-ui/core";
import PriceDetails from "../priceDetails";
import ShippingAddress from "./shippingAddress";
import {ShippingOptions} from "./shippingOptions";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {connect, useSelector} from "react-redux";
import {loadStripe} from "@stripe/stripe-js/pure";
import PaymentButton from "./paymentButton";
import {useAddProductsToShoppingBag} from "../../../hooks/useAddProductsToShoppingBag";
import {getDataViaAPI} from "../../../actions";
import {useCartTotal} from "../../../hooks/useCartTotal";
// import {Elements, ElementsConsumer} from "@stripe/react-stripe-js";
// import Payment from "./payment"

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

const useGridStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: checkoutBgColor,
        paddingBottom: "5rem",
        [theme.breakpoints.down('md')]: {
            height: "-webkit-fill-available"
        }
    },
}));

const shippingAddressPanel = 'shipAddrPanel'
const shippingOptionPanel = 'shipOptPanel'
const paymentPanel = "paymentPanel"
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)

function Checkout(props) {
    const shippingAddress = useSelector(state => state.shippingAddressReducer)
    const shippingOption = useSelector(state => state.shippingOptionReducer)
    const classes = useGridStyles();

    useCartTotal()
    useAddProductsToShoppingBag(props.getDataViaAPI)

    const renderTitle = title => {
        return (
            <Grid item
                  style={{
                      fontSize: "1.8rem", fontWeight: "bolder",
                      paddingLeft: "1rem"
                  }}>
                {title}
            </Grid>
        )
    }

    log.info("[Checkout] Rendering Checkout Component.")

    return (
        <Grid container justify={"center"} classes={{root: classes.root}}>

            <Grid item xs={12} sm={11} md={5}>

                <Accordion square expanded>
                    <AccordionSummary aria-controls={`${shippingAddressPanel}-content`}
                                      id={`${shippingAddressPanel}-header`}>
                        {renderTitle("Shipping Address")}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ShippingAddress/>
                    </AccordionDetails>
                </Accordion>

                <Accordion square expanded={shippingAddress.submitted}>
                    <AccordionSummary aria-controls={`${shippingOptionPanel}-content`}
                                      id={`${shippingOptionPanel}-header`}>
                        {renderTitle("Shipping Options")}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ShippingOptions/>
                    </AccordionDetails>
                </Accordion>

                {/*<Accordion square expanded={true}>*/}
                {/*    <AccordionSummary aria-controls={`${paymentPanel}-content`}*/}
                {/*                      id={`${paymentPanel}-header`}>*/}
                {/*        {renderTitle("Payment")}*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Elements stripe={stripePromise}>*/}
                {/*            <ElementsConsumer>*/}
                {/*                {({elements, stripe}) => (*/}
                {/*                    <Payment elements={elements} stripe={stripe} />*/}
                {/*                )}*/}
                {/*            </ElementsConsumer>*/}
                {/*        </Elements>*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}

            </Grid>

            <Hidden smDown>
                <Grid item style={{paddingRight: 20}}/>
            </Hidden>

            <Hidden smUp>
                <Grid item sm={11} md={4} style={{height: 300, marginTop: "1rem"}}>
                    <Paper square style={{width: "inherit"}}>
                        <PriceDetails buttonName="PLACE ORDER"/>
                    </Paper>
                </Grid>
            </Hidden>

            <Hidden xsDown>
                <Grid item sm={11} md={3}
                      style={{height: "fit-content", marginTop: "1rem", position: "sticky", top: 80}}>
                    <Paper square style={{width: "inherit"}}>
                        <PriceDetails buttonName="PLACE ORDER"/>
                        <PaymentButton disabled={!shippingOption.submitted}/>
                    </Paper>
                </Grid>
            </Hidden>

        </Grid>
    )
}

export default connect(null, {getDataViaAPI})(Checkout);