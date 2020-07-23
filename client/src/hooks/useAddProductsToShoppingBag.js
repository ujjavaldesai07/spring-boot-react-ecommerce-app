import { useEffect } from "react";
import log from "loglevel";
import {LOAD_SHOPPING_BAG_PRODUCTS, PRODUCT_BY_ID_DATA_API} from "../actions/types";
import {useDispatch, useSelector} from "react-redux";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useAddProductsToShoppingBag(getDataViaAPIFunc) {
    const addToCart = useSelector(state => state.addToCartReducer)
    const dispatch = useDispatch()

    const extractIdsFromObject = object => {
        log.info("[ShoppingBag] extractIdsFromObject object = " + JSON.stringify(object))
        let idList = []
        for (const [id] of Object.entries(object)) {
            idList.push(parseInt(id))
        }
        return idList
    }

    useEffect(() => {
        log.info("[ShoppingBag] Component will mount... addToCart = " + JSON.stringify(addToCart))

        let idList = []

        if (addToCart.hasOwnProperty("productQty")) {
            log.info(`[ShoppingBag] load ShoppingBag products` +
                ` from addToCartQuantity = ${JSON.stringify(addToCart)}`)

            idList = extractIdsFromObject(addToCart["productQty"])


            if (idList.length > 0) {
                getDataViaAPIFunc(LOAD_SHOPPING_BAG_PRODUCTS, PRODUCT_BY_ID_DATA_API + idList.toString())
                return
            }

        }

        dispatch({
            type: LOAD_SHOPPING_BAG_PRODUCTS,
            payload: {isLoading: false, data: {}}
        })

        log.info(`[ShoppingBag] load ShoppingBag products idList = ${JSON.stringify(idList)}`)

        // eslint-disable-next-line
    }, [addToCart])
}