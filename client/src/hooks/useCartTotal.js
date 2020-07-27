import {useEffect} from "react";
import log from "loglevel";
import {addToCartReducer} from "../reducers/screens/commonScreenReducer";
import Cookies from "js-cookie";
import {CART_TOTAL} from "../actions/types";
import {useDispatch} from "react-redux";

export function useCartTotal() {
    const dispatch = useDispatch()

    useEffect(() => {
        log.info("[useCartTotal] Component will mount...")

        let cartTotal = Cookies.get(CART_TOTAL)
        if (cartTotal) {
            cartTotal = JSON.parse(cartTotal)
            dispatch({
                type: CART_TOTAL,
                payload: parseInt(cartTotal)
            })
        }

        // eslint-disable-next-line
    }, [addToCartReducer])
}