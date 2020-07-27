import React, {Component, useEffect, useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Button, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {sendPaymentToken} from "../../../actions"
import log from 'loglevel';

class PaymentButton extends Component {

    _GrandTotal = 0

    constructor(props) {
        super(props);
        this.state = {
            grandTotal: null,
            paymentBtnClicked: false
        }
    }

    getGrandTotal = () => {
        this._GrandTotal = (this.props.cartTotal + this.props.deliveryCharges) * 100
        return this._GrandTotal
    }

    onToken = (token) => {

        this.setState({paymentBtnClicked: true})

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
        log.info(`[PaymentButton] renderButton....`)
        return (
            <Grid container justify="center" style={{padding: "2rem 0 2rem 0"}}>
                <Grid item lg={9}>
                    <Button variant="contained" size="medium"
                            disabled={this.state.paymentBtnClicked || this.props.disabled}
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
        console.log(`[PaymentButton] Rendering PaymentButton Component...`)

        return (
            <>
                {this.state.paymentBtnClicked || this.props.disabled ?
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
        deliveryCharges: state.deliveryChargesReducer
    })
}

function paymentButtonPropsAreEqual(prevProps, nextProps) {
    return prevProps.disabled === nextProps.disabled;
}

const wrapperMemo = React.memo(PaymentButton, paymentButtonPropsAreEqual);

export default connect(mapStateToProps, {sendPaymentToken})(wrapperMemo)