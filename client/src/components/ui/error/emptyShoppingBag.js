import React from 'react';
import emptyCheckoutCartImage from '../../../images/emptyCheckoutCart.png'
import {RenderErrorImage} from "./renderErrorImage";
import {Button, Grid} from "@material-ui/core";

export const EmptyShoppingBag = (props) => {

    return (
        <>
            <RenderErrorImage image={emptyCheckoutCartImage} name="empty-shopping-bag-image"/>
            <Grid container justify="center">
                <Grid item xs={8} md={2}>
                    <Button variant="contained" size="large" color="secondary"
                            onClick={props.btnHandler}
                            style={{width: '100%'}}>
                        Wanna Shop? Click Here
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};