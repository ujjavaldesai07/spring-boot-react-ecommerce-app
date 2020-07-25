import React from 'react';
import log from 'loglevel';
import {Button, Divider, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {PageNotFound} from "../ui/error/pageNotFound";
import Cookies from "js-cookie";
import {CART_TOTAL} from "../../actions/types";
import PaymentButton from "./checkout/paymentButton";

const paymentStyles = {
    header: {
        fontColor: "#535766",
        fontWeight: "bolder",
        fontSize: "1.2rem",
        padding: "20px 0",
    },
    fontColor: "#282c3f",
    fontWeight: 400,
    fontSize: "1.1rem",
}

function PriceDetails() {
    let cartTotal = useSelector(state => state.cartTotalReducer);

    if (!cartTotal) {
        cartTotal = Cookies.get(CART_TOTAL)
        if (cartTotal) {
            cartTotal = JSON.parse(cartTotal)
        } else {
            return <PageNotFound/>
        }
    }

    const renderGridData = (label, value, styles) => {
        return (
            <Grid item container xs={10} sm={11} style={styles}>

                <Grid item xs={6} sm={6}>
                    {label}
                </Grid>

                <Grid item container xs={6} justify="flex-end"
                      style={{fontWeight: "bolder", fontSize: "1.2rem"}}>
                    {value}
                </Grid>
            </Grid>
        )
    }

    log.info("[Checkout] Rendering PriceDetails Component.")

    return (
        <Grid container justify="center">

            <Grid item xs={10} sm={11}
                  style={{fontSize: "1.5rem", fontWeight: "bolder", padding: "25px 0 15px 0"}}>
                Price Details
            </Grid>

            {renderGridData("Bag Total", `$${cartTotal}`, {...paymentStyles, paddingTop: 10})}
            {renderGridData("Shipping", "FREE", {...paymentStyles, paddingTop: 10})}

            <Grid item container sm={10} style={{paddingTop: 17}}>
                <Divider style={{width: "100%", height: 1}}/>
            </Grid>

            {renderGridData("Order Total", `$${cartTotal}`,
                {...paymentStyles.header})}

        </Grid>
    )
}

export default PriceDetails;