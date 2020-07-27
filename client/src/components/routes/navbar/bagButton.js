import React from 'react';
import log from "loglevel";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import {Badge} from "@material-ui/core";
import {useSelector} from "react-redux";

export default function BagButton() {
    const addToCart = useSelector(state => state.addToCartReducer)

    log.info(`[BagButton]: Rendering BagButton Component`)
    return (
        <Badge badgeContent={addToCart.totalQuantity}
               color="secondary">
            <LocalMallIcon style={{color: "black"}}/>
        </Badge>
    );
};
