import React from 'react'
import log from 'loglevel'
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CHECKOUT_ROUTE} from "../../constants/react_routes";
import {DocumentTitle} from "../ui/documentTitle";

export const CancelPayment = () => {

    log.info('[CancelPayment] Rendering SuccessPayment Component')
    return (
        <Grid item xs={8} container style={{padding: "2rem", margin: "2rem", border: "1px solid black",
            fontSize: "1.2rem"}}>

            <DocumentTitle title="Payment Failed"/>

            <Grid item xs={12}
                  style={{border: "1px solid red", padding: "2rem", fontSize: "2rem", fontWeight: "bold"}}>
                Payment Cancelled. Sorry your payment is declined.
            </Grid>
            <Grid item xs={12} style={{marginTop: "2rem", fontWeight: "bold"}}>
                Try again later or use different payment method.
            </Grid>

            <Grid item xs={12} style={{marginTop: "2rem", fontWeight: "bold"}}>
                Go back to <Link to={CHECKOUT_ROUTE}>Checkout</Link>.
            </Grid>
        </Grid>
    )
}