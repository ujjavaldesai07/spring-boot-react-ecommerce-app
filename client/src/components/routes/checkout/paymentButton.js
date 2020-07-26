import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Button, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {sendPaymentToken} from "../../../actions"
import Cookies from "js-cookie";
import {CART_TOTAL} from "../../../actions/types";
import {PageNotFound} from "../../ui/error/pageNotFound";

class PaymentButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartTotal: this.props.cartTotal,
            paymentBtnClicked: false
        }
    }

    componentDidMount() {
        if (!this.state.cartTotal) {
            let cartTotal = Cookies.get(CART_TOTAL)
            if (cartTotal) {
                this.setState({cartTotal: parseInt(cartTotal) * 100})
            } else {
                return <PageNotFound/>
            }
        }
    }

    onToken = (token) => {
        this.props.sendPaymentToken({...token, "amount": this.state.cartTotal, currency: "USD"})
    }

    paymentBtnClickHandler = () => {
        this.setState({paymentBtnClicked: true})
    }

    renderButton = () => {
        return (
            <Grid container justify="center" style={{padding: "2rem 0 2rem 0"}}>
                <Grid item lg={9}>
                    <Button variant="contained" size="medium" onClick={this.paymentBtnClickHandler}
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
                    this.renderButton()
                    : <StripeCheckout
                        token={this.onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
                        name="Shoppers Buy"
                        amount={this.state.cartTotal} // cents
                        currency="USD">
                        {this.renderButton()}
                    </StripeCheckout>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        cartTotal: state.cartTotalReducer
    })
}

export default connect(mapStateToProps, {sendPaymentToken})(PaymentButton)