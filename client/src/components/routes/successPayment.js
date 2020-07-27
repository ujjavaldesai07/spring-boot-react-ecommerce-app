import React from 'react'
import log from 'loglevel'
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {BadRequest} from "../ui/error/badRequest";

export const SuccessPayment = () => {
    const shoppingBagProducts = useSelector(state => state.shoppingBagProductReducer)
    let cartTotal = useSelector(state => state.cartTotalReducer)
    const shippingAddressForm = useSelector(state => state.form.shippingAddressForm ?
        state.form.shippingAddressForm.values : null)
    const shippingOption = useSelector(state => state.shippingOptionReducer)
    const addToCart = useSelector(state => state.addToCartReducer)
    const deliveryCharges = useSelector(state => state.deliveryChargesReducer)

    if (!shippingAddressForm) {
        return <BadRequest/>
    }

    const renderShippingAddress = () => {
        const shippingAddressAttributes = [
            `${shippingAddressForm.firstName} ${shippingAddressForm.lastName}`,
            shippingAddressForm.addressLine1, shippingAddressForm.addressLine2,
            `${shippingAddressForm.city},
            ${shippingAddressForm.stateCode} - ${shippingAddressForm.zipCode}`,
            `Mobile - ${shippingAddressForm.phoneNumber}`,
            `Email - ${shippingAddressForm.email}`
        ]
        return shippingAddressAttributes.map((value) => {
            return (
                <Grid key={value} item>
                    {value}
                </Grid>
            )
        })
    }

    const renderShoppingProducts = () => {
        let products = []

        if (!shoppingBagProducts.data) {
            log.info(`[SuccessPayment] shoppingBagProducts.data is null`)
            return null
        }

        for (const [id, qty] of Object.entries(addToCart.productQty)) {
            let product = shoppingBagProducts.data[id]

            products.push(<Grid key={id} container spacing={2} style={{paddingTop: "2rem"}}>
                <Grid item>
                    <img src={product.imageName}
                         alt={product.name} style={{height: 100, width: 80}}/>
                </Grid>

                <Grid item container xs={5} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        {product.name}
                    </Grid>
                    <Grid item>
                        {product.productBrandCategory.type}
                    </Grid>
                    <Grid item>
                        {`Qty: ${qty} X ${product.price} = ${product.price * qty}`}
                    </Grid>
                </Grid>
            </Grid>)
        }

        return products
    }

    log.info('[SuccessPayment] Rendering SuccessPayment Component')
    return (
        <Grid item xs={8} container spacing={2} style={{
            padding: "2rem", margin: "2rem", border: "1px solid black",
            fontSize: "1.2rem"
        }}>
            <Grid item xs={12}
                  style={{border: "1px solid green", padding: "2rem", fontSize: "2rem", fontWeight: "bold"}}>
                Payment Successful. Thank You For Shopping at Shoppers.
            </Grid>
            <Grid item xs={12} style={{marginTop: "2rem", fontWeight: "bold"}}>
                Your order is placed successfully. Your order id is 2425645235353.
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Delivery Address:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    {renderShippingAddress()}
                </Grid>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
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

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Paid Amount:
                </Grid>
                <Grid item style={{fontWeight: "bold"}}>
                    ${cartTotal + deliveryCharges}
                </Grid>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item container justify="flex-end" xs={2}>
                    Delivery Details:
                </Grid>
                <Grid item container xs={8} direction="column" style={{fontWeight: "bold"}}>
                    <Grid item>
                        {shippingOption.deliveryType}
                    </Grid>
                    <Grid item>
                        {`Delivered between ${shippingOption.estimatedDate}`}
                    </Grid>
                </Grid>
            </Grid>

            {renderShoppingProducts()}
        </Grid>
    )
}