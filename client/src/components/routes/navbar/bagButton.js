import React from 'react';
import {SHOPPERS_PRODUCT_ID} from "../../../actions/types";
import log from "loglevel";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import {Badge} from "@material-ui/core";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";

export default function BagButton() {
    const addToCartQuantity = useSelector(state => state.addToCartReducer)

    // if we get the quantity from the redux store
    // then we don't need to calculate in cookie
    const getItemQuantity = () => {
        let savedProductsFromCookie = Cookies.get(SHOPPERS_PRODUCT_ID)
        let itemQuantity = 0
        if(savedProductsFromCookie) {
            savedProductsFromCookie = JSON.parse(savedProductsFromCookie)
            savedProductsFromCookie.forEach((product) => {
                itemQuantity += parseInt(product.quantity)
            })
        }
        log.info(`[NavBar] itemQuantity = ${itemQuantity}`)
        return itemQuantity
    }

    log.info(`[BagButton]: Rendering BagButton Component`)
    return (
        <Badge badgeContent={addToCartQuantity? addToCartQuantity.totalQuantity: getItemQuantity()} color="secondary">
            <LocalMallIcon style={{color: "black"}}/>
        </Badge>
    );
};
