import React, {useEffect, useState} from 'react';
import log from 'loglevel';
import BreadcrumbsSection from "../ui/breadcrumbs";
import {HOME_ROUTE, MAX_PRODUCTS_PER_PAGE} from "../../constants/constants";
import history from "../../history";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {
    ADD_TO_CART, CART_TOTAL,
    LOAD_SHOPPING_BAG_PRODUCTS,
    PRODUCT_BY_ID_DATA_API,
    SHOPPERS_PRODUCT_ID
} from "../../actions/types";
import DropdownSection from "../ui/dropDown";
import {Button, Divider, Grid} from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {connect} from "react-redux";
import {getDataViaAPI} from '../../actions';
import Spinner from "../ui/spinner";
import {EmptyShoppingBag} from "../ui/error/emptyShoppingBag";
import {PageNotFound} from "../ui/error/pageNotFound";
import {HTTPError} from "../ui/error/httpError";
import PriceDetails from "./priceDetails";
import Modal from "../../components/ui/modal";
import _ from 'lodash';
import Hidden from "@material-ui/core/Hidden";

const modalWidth = 430

function ShoppingBag(props) {
    const addToCart = useSelector(state => state.addToCartReducer)
    const shoppingBagProducts = useSelector(state => state.shoppingBagProductReducer)
    const dispatch = useDispatch()
    const [itemRemovalModalState, setItemRemovalModalState] = useState({active: false, productId: null})
    let cartTotal = 0

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
                props.getDataViaAPI(LOAD_SHOPPING_BAG_PRODUCTS, PRODUCT_BY_ID_DATA_API + idList.toString())
            } else {
                dispatch({
                    type: LOAD_SHOPPING_BAG_PRODUCTS,
                    payload: {isLoading: false, data: {}}
                })
            }

        }

        log.info(`[ShoppingBag] load ShoppingBag products idList = ${JSON.stringify(idList)}`)

        // eslint-disable-next-line
    }, [addToCart])

    if (history.location.pathname.localeCompare('/shopping-bag') !== 0 &&
        history.location.pathname.localeCompare('/products/details/shopping-bag') !== 0) {
        log.info(`[ShoppingBag] corrupted url.`)
        return <PageNotFound/>
    }

    const getStringBeforeLastDelimiter = (str, delimiter) => {
        return str.substring(0, str.lastIndexOf(delimiter))
    }

    const breadcrumbLinks = [
        {
            name: 'Home',
            link: HOME_ROUTE
        },
        {
            name: 'Products',
            link: `${getStringBeforeLastDelimiter(history.location.pathname, "/details")
            + getStringBeforeLastDelimiter(history.location.search, "::")}`
        },
        {
            name: 'Details',
            link: getStringBeforeLastDelimiter(history.location.pathname, "/")
                + history.location.search
        },
        {
            name: 'ShoppingBag',
            link: '/shopping-bag'
        },
    ]

    const getQuantityList = id => {
        let qtyList = []
        for (let i = 1; i <= 10; ++i) {
            qtyList.push({
                id: i,
                type: i
            })
        }
        return qtyList
    }

    const getCartTotal = () => {
        log.info(`[ShoppingBag] ShoppingBag = ${JSON.stringify(shoppingBagProducts)}`)
        if (shoppingBagProducts.data && addToCart.hasOwnProperty("productQty")) {
            for (const [id, qty] of Object.entries(addToCart.productQty)) {
                if (shoppingBagProducts.data.hasOwnProperty(id)) {
                    cartTotal += qty * shoppingBagProducts.data[id].price
                }
            }
        }

        Cookies.set(CART_TOTAL, cartTotal, {expires: 7});

        dispatch({
            type: CART_TOTAL,
            payload: cartTotal
        })

        return cartTotal
    }

    const onQtyDropdownChangeHandler = (value, text, id) => {
        log.info(`[ShoppingBag] onChangeHandler id = ${id}, value = ${value}`)
        let newAddToCart = addToCart
        newAddToCart.productQty[id] = value

        Cookies.set(SHOPPERS_PRODUCT_ID, newAddToCart, {expires: 7});
        dispatch({
            type: ADD_TO_CART,
            payload: newAddToCart
        })
    }

    const renderItemRemoveConfirmation = () => {
        log.info(`Rendering renderRemoveModalWarning`)
        return (
            <>
                <Box display="flex" flexDirection="row">
                    <Box mx={2.5} mt={2} mb={1}>
                        <img src={shoppingBagProducts.data[itemRemovalModalState.productId].imageName}
                             width={60} height={90} alt="image"/>
                    </Box>
                    <Box mt={2.5} display="flex" flexDirection="column">
                        <Box style={{color: "#3e4152", fontSize: 14, fontWeight: 200}}>
                            Remove Item
                        </Box>
                        <Box style={{color: "#696b79", fontSize: 14, fontWeight: 200}}>
                            Are you sure you want to remove this item?
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Divider style={{width: modalWidth, height: 1}}/>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                    <Box pl={10} onClick={removeConfirmBtnClickHandler} style={{
                        color: "red"
                        , width: "50%", fontWeight: "bold", cursor: "pointer"
                    }}>
                        REMOVE
                    </Box>
                    <Box>
                        <Divider orientation="vertical" style={{height: 45}}/>
                    </Box>
                    <Box pl={10} onClick={closeModalClickHandler}
                         style={{width: "50%", fontWeight: "bold", cursor: "pointer"}}>
                        CANCEL
                    </Box>
                </Box>
            </>
        )
    }

    const removeConfirmBtnClickHandler = () => {
        setItemRemovalModalState({active: false, productId: null})
        if (itemRemovalModalState.productId) {
            let newAddToCart = addToCart
            newAddToCart.totalQuantity -= newAddToCart.productQty[itemRemovalModalState.productId]
            newAddToCart.productQty = _.omit(newAddToCart.productQty, itemRemovalModalState.productId)
            Cookies.set(SHOPPERS_PRODUCT_ID, newAddToCart, {expires: 7});
            dispatch({
                type: ADD_TO_CART,
                payload: newAddToCart
            })
        }
    }

    const closeModalClickHandler = () => {
        setItemRemovalModalState({active: false, productId: null})
    }

    const removeBtnClickHandler = id => () => {
        log.info(`[ShoppingBag] removeBtnChangeHandler id = ${id}`)
        setItemRemovalModalState({active: true, productId: id})
    }

    const wannaShopBtnClick = () => {
        history.push(`/products?q=category=all::page=0,${MAX_PRODUCTS_PER_PAGE}`);
    }

    if (shoppingBagProducts.isLoading) {
        return <Spinner/>
    } else {
        if (shoppingBagProducts.hasOwnProperty("data")) {
            if (Object.keys(shoppingBagProducts.data).length === 0) {
                return (
                    <Box display="flex" flexDirection="column">
                        <Box>
                            <EmptyShoppingBag/>
                        </Box>
                        <Box display="flex" py={2} justifyContent="center">
                            <Button variant="contained" size="large" color="secondary"
                                    onClick={wannaShopBtnClick}
                                    style={{width: '20%'}}>
                                Wanna Shop? Click Here
                            </Button>
                        </Box>
                    </Box>
                )
            }
        } else {
            if (shoppingBagProducts.hasOwnProperty('statusCode')) {
                log.info(`[ShoppingBag]: ShoppingBag.statusCode = ${shoppingBagProducts.statusCode}`)
                return <HTTPError statusCode={shoppingBagProducts.statusCode}/>
            }
        }
    }

    const renderShoppingBagProducts = () => {
        log.info(`[ShoppingBag] ShoppingBag = ${JSON.stringify(shoppingBagProducts)}`)

        let shoppingBagProductsList = []

        for (const [id, product] of Object.entries(shoppingBagProducts.data)) {

            shoppingBagProductsList.push(
                <Box key={product.id} display="flex" flexDirection="column" flex="2" css={{border: '1px solid #eaeaec'}}
                     mt={1}>
                    <Box display="flex" m={2}>

                        <Box flex="0.5">
                            <img src={product.imageName} style={{height: 148, width: 111}}/>
                        </Box>

                        <Box flex="6" ml={2}>
                            <Box display="flex" flexDirection="row" css={{fontSize: "1rem", fontWeight: 600}}>
                                <Box flex="1">
                                    {product.productBrandCategory.type}
                                </Box>
                                <Box>
                                    {`Qty: ${addToCart.productQty[product.id]} x $${product.price} = `
                                    + `$${addToCart.productQty[product.id] * product.price}`}
                                </Box>
                            </Box>
                            <Box css={{fontSize: "1rem", fontWeight: 300}}>
                                {product.name}
                            </Box>
                            <Box css={{fontSize: "0.85rem", color: "#94969f"}}>
                                Sold by
                            </Box>
                            <Box width="30%" height="25%" pt={2}>
                                <DropdownSection
                                    attrList={getQuantityList(id)}
                                    selectedValue={addToCart.productQty.hasOwnProperty(id) ? {
                                        id: id,
                                        value: addToCart.productQty[id]
                                    } : 1}
                                    appendText="Qty:"
                                    title={id}
                                    size="sm"
                                    onChangeHandler={onQtyDropdownChangeHandler}/>
                            </Box>
                        </Box>
                    </Box>

                    <Box display="flex" mx={2} mb={1}>
                        <Divider style={{width: "100%", height: 1}}/>
                    </Box>
                    <Box display="flex" mx={2} mb={1} justifyContent="flex-end">
                        <Button variant="contained" size="medium" color="secondary"
                                onClick={removeBtnClickHandler(id)}
                                startIcon={<RemoveCircleOutlineIcon/>}>
                            Remove
                        </Button>
                    </Box>
                </Box>
            )
        }

        return shoppingBagProductsList
    }

    const continueBtnClickHandler = () => {
        history.push("/checkout")
    }

    log.info("[ShoppingBag] Rendering ShoppingBag Component.")

    return (
        <>
        <Hidden xsDown>
            <Box display="flex" p={3}>
                <BreadcrumbsSection linkList={breadcrumbLinks}/>
            </Box>
        </Hidden>

        <Grid container justify="center" spacing={5} style={{height: "100%"}}>
            <Grid item xs={11} sm={10} md={6}>
                <Box display="flex" flexDirection="column" pl={3}>
                    <Box display="flex">
                        <Divider style={{width: "100%", height: 1}}/>
                    </Box>

                    <Box display="flex" flexDirection="row" py={4} css={{fontSize: '1.5rem', fontWeight: 600}}>
                        <Box flex={1}>
                            {`My Shopping Bag (${addToCart.totalQuantity} Items)`}
                        </Box>
                        <Box>
                            {`Total: $${getCartTotal()}`}
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Box display="flex" flex="2.5" flexDirection="column">
                            {renderShoppingBagProducts()}
                        </Box>
                    </Box>
                </Box>
            </Grid>

            <Grid item>
                <Divider orientation="vertical" style={{height: "100%", width: 1}}/>
            </Grid>

            <Grid sm={2} md={3}>
                <Box pt={2}>
                    <PriceDetails buttonName="Proceed To Checkout" onBtnClickHandler={continueBtnClickHandler}/>
                </Box>
            </Grid>
        </Grid>

        {itemRemovalModalState.active ? <Modal renderWarningComponent={renderItemRemoveConfirmation()}
                                               modalWidth={modalWidth}
                                               closeHandler={closeModalClickHandler}/> : null}
        </>
    )
}

export default connect(null, {getDataViaAPI})(ShoppingBag);