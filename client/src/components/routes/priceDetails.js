import React from 'react';
import log from 'loglevel';
import {Divider, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";

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
    const deliveryCharges = useSelector(state => state.deliveryChargesReducer)

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

    log.info("[PriceDetails] Rendering PriceDetails Component.")

    return (
        <Grid container justify="center">

            <Grid item xs={10} sm={11}
                  style={{fontSize: "1.5rem", fontWeight: "bolder", padding: "25px 0 15px 0"}}>
                Price Details
            </Grid>

            {renderGridData("Bag Total", `$${cartTotal}`, {...paymentStyles, paddingTop: 10})}
            {renderGridData("Shipping", `$${deliveryCharges}`, {...paymentStyles, paddingTop: 10})}

            <Grid item container sm={10} style={{paddingTop: 17}}>
                <Divider style={{width: "100%", height: 1}}/>
            </Grid>

            {renderGridData("Order Total", `$${cartTotal + deliveryCharges}`,
                {...paymentStyles.header})}

        </Grid>
    )
}

export default PriceDetails;