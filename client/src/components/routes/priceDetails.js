import React from 'react';
import log from 'loglevel';
import Box from "@material-ui/core/Box";
import {Button, Divider} from "@material-ui/core";
import {useSelector} from "react-redux";
import {PageNotFound} from "../ui/error/pageNotFound";
import Cookies from "js-cookie";
import {CART_TOTAL, SHOPPERS_PRODUCT_ID} from "../../actions/types";

const paymentStyles = {
    header: {
        fontColor: "#535766",
        fontWeight: 600
    },
    fontColor: "#282c3f",
    fontWeight: 400,
    fontSize: "0.9rem"
}

function PriceDetails(props) {
    let cartTotal = useSelector(state => state.cartTotalReducer);

    if(!cartTotal) {
        cartTotal = Cookies.get(CART_TOTAL)
        if(cartTotal) {
            cartTotal = JSON.parse(cartTotal)
        } else {
            return <PageNotFound/>
        }
    }

    log.info("[Checkout] Rendering PriceDetails Component.")

    return (
        <Box display="flex" flex="1" flexDirection="column" pt={1}>
            <Box css={paymentStyles.header}>
                PRICE DETAILS
            </Box>
            <Box display="flex" flexDirection="row" pt={2} css={paymentStyles}>
                <Box flex="1">
                    Bag Total
                </Box>
                <Box>
                    ${cartTotal}
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" pt={1} css={paymentStyles}>
                <Box flex="1">
                    Delivery Charges
                </Box>
                <Box css={{color: 'green'}}>
                    Free
                </Box>
            </Box>
            <Box display="flex" mb={1} py={1}>
                <Divider style={{width: "100%", height: 1}}/>
            </Box>
            <Box display="flex" flexDirection="row" css={paymentStyles.header}>
                <Box flex="1">
                    Total
                </Box>
                <Box>
                    ${cartTotal}
                </Box>
            </Box>
            <Box display="flex" py={2} justifyContent="flex-start">
                <Button variant="contained" size="medium" style={{width: '100%', color: 'white',
                    fontWeight: "bold", backgroundColor: "#AB0000"}}>
                    {props.buttonName}
                </Button>
            </Box>
        </Box>
    )
}

export default PriceDetails;