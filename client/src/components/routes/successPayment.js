import React from 'react'
import log from 'loglevel'
import {Grid} from "@material-ui/core";

export const SuccessPayment = () => {

    log.info('[SuccessPayment] Rendering SuccessPayment Component')
    return (
        <Grid item xs={8} container style={{padding: "2rem", margin: "2rem", border: "1px solid black",
            fontSize: "1.2rem"}}>
            <Grid item xs={12}
                  style={{border: "1px solid green", padding: "2rem", fontSize: "2rem", fontWeight: "bold"}}>
                Payment Successful. Thank You For Shopping at Shoppers.
            </Grid>
            <Grid item xs={12} style={{marginTop: "2rem", fontWeight: "bold"}}>
                Your order is placed successfully. Your order id is 2425645235353.
            </Grid>

            <Grid item container xs={12} direction="row" style={{paddingTop: "1rem"}}>
                <Grid item style={{paddingRight: "1rem"}}>
                    Delivery Address:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        Ujjaval Desai
                    </Grid>
                    <Grid item>
                        2600, Bay Area Boulevard
                    </Grid>
                    <Grid item>
                        Apt 316
                    </Grid>
                    <Grid item>
                        Houston, TX - 77058
                    </Grid>
                    <Grid item>
                        Mobile - 234-234-4352
                    </Grid>
                    <Grid item>
                        Email - asdk@gmail.com
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container xs={12} direction="row" style={{paddingTop: "1rem"}}>
                <Grid item style={{paddingRight: "1rem"}}>
                    Payment Details:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        VISA ending in 4242
                    </Grid>
                    <Grid item>
                        Exp: 3/24
                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{paddingTop: "1rem"}}>
                <Grid item style={{paddingRight: "2.5rem"}}>
                    Paid Amount:
                </Grid>
                <Grid item style={{fontWeight: "bold"}}>
                    $654
                </Grid>
            </Grid>

            <Grid container direction="row" style={{paddingTop: "2rem"}}>
                <Grid item>
                    <img src="." alt="image" style={{height: 85, width: 60}}/>
                </Grid>

                <Grid item container xs={5} direction="column">
                    <Grid item>
                        Product Name
                    </Grid>
                    <Grid item>
                        Brand
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}