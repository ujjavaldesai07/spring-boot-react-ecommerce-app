import React from 'react';
import {Box} from "@material-ui/core";
import emptyCheckoutCartImage from '../../../images/emptyCheckoutCart.png'

export const EmptyShoppingBag = () => {

    return (
        <Box display="flex"
             justifyContent="center"
             flexDirection="column"
             alignItems="center">
            <Box alignSelf="center">
                <img src={emptyCheckoutCartImage} alt="emptyCheckoutCartImage" height={400} width={1000}/>
            </Box>
        </Box>
    );
};