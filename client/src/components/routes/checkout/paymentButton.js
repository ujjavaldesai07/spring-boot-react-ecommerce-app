import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Button, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {sendPaymentToken} from "../../../actions"

class PaymentButton extends React.Component {
    onToken = (token) => {
        this.props.sendPaymentToken({...token, "amount": 100, currency:"USD"})
    }

    render() {
        console.log(`process.env.REACT_APP_STRIPE_PUBLISH_KEY = ${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`)
        return (
            <StripeCheckout
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
                name="Shoppers Buy"
                amount={100} // cents
                currency="USD"
                email="dfsdlkf@gmail.com"
            >
                <Grid container justify="center" style={{padding: "2rem 0 2rem 0"}}>
                    <Grid item lg={9}>
                        <Button variant="contained" size="medium"
                                style={{
                                    width: '100%', height: 50, color: 'white',
                                    fontWeight: "bold", backgroundColor: "#e01a2b",
                                    fontSize: "1rem"
                                }}>
                            PLACE ORDER
                        </Button>
                    </Grid>
                </Grid>
            </StripeCheckout>
        )
    }
}

export default connect(null, {sendPaymentToken})(PaymentButton)