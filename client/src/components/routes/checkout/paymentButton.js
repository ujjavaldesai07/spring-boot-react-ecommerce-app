import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Button, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {sendPaymentToken} from "../../../actions"
import log from 'loglevel';
import AlertModal from "../../ui/alertModal";

class PaymentButton extends Component {

    _GrandTotal = 0

    getGrandTotal = () => {
        this._GrandTotal = (this.props.cartTotal + this.props.deliveryCharges) * 100
        return this._GrandTotal
    }

    onToken = (token) => {
        log.info("[PaymentButton] onToken setting loadingHandler to true")
        this.props.loadingHandler(true)

        this.props.sendPaymentToken({
            ...token,
            amount: this._GrandTotal,
            currency: "USD",
            address: this.props.shippingAddressForm.values,
            addToCart: this.props.addToCart,
            shippingOption: this.props.shippingOption
        })
    }

    renderButton = () => {
        log.info(`[PaymentButton] renderButton.....`)
        return (
            <Grid container justify="center" style={{padding: "2rem 0 2rem 0"}}>
                <Grid item lg={9}>
                    <Button variant="contained" size="medium"
                            disabled={this.props.disabled}
                            style={{
                                width: '100%', height: 50, color: 'white',
                                fontWeight: "bold", backgroundColor: "#e01a2b",
                                fontSize: "1rem"
                            }}>
                        PLACE ORDER
                    </Button>
                </Grid>
            </Grid>
        )
    }

    render() {
        log.info(`[PaymentButton] Rendering PaymentButton Component...error = ${this.props.paymentResponse.error}`)

        return (
            <>
                <AlertModal title="Payment Error"
                            question="Something went wrong. Please try again later."
                            enable={this.props.paymentResponse.error}
                            timestamp={this.props.paymentResponse.timestamp}
                />

                {this.props.disabled ?
                    this.renderButton():
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
                        name="Shoppers Buy"
                        amount={this.getGrandTotal()} // cents
                        currency="USD">
                        {this.renderButton()}
                    </StripeCheckout>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        cartTotal: state.cartTotalReducer,
        shippingAddressForm: state.form.shippingAddressForm ?
            state.form.shippingAddressForm : null,
        shippingOption: state.shippingOptionReducer,
        addToCart: state.addToCartReducer,
        deliveryCharges: state.deliveryChargesReducer,
        paymentResponse: state.paymentResponseReducer
    })
}

export default connect(mapStateToProps, {sendPaymentToken})(PaymentButton)