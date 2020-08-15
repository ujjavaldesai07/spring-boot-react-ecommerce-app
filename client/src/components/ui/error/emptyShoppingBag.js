import React from 'react';
import emptyCheckoutCartImage from '../../../images/emptyCheckoutCart.png'
import {RenderErrorImage} from "./renderErrorImage";

export const EmptyShoppingBag = () => {

    return (
        <RenderErrorImage image={emptyCheckoutCartImage} name="empty-shopping-bag-image"/>
    );
};