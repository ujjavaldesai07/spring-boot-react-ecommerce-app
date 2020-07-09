import React, {useEffect} from 'react';
import log from 'loglevel';
import BreadcrumbsSection from "../ui/breadcrumbs";
import {HOME_ROUTE, MAX_PRODUCTS_PER_PAGE} from "../../constants/constants";
import history from "../../history";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {
    ADD_TO_CART,
    LOAD_CHECKOUT_PRODUCTS,
    PRODUCT_BY_ID_DATA_API,
    SHOPPERS_PRODUCT_ID
} from "../../actions/types";
import DropdownSection from "../ui/dropDown";
import {Button, Divider} from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {connect} from "react-redux";
import {getDataViaAPI} from '../../actions';
import _ from 'lodash';
import Spinner from "../ui/spinner";
import {EmptyCheckoutCart} from "../ui/error/emptyCheckoutCart";
import {PageNotFound} from "../ui/error/pageNotFound";
import {HTTPError} from "../ui/error/httpError";

const paymentStyles = {
    header: {
        fontColor: "#535766",
        fontWeight: 600
    },
    fontColor: "#282c3f",
    fontWeight: 400,
    fontSize: "0.9rem"
}

function Checkout(props) {
    const addToCart = useSelector(state => state.addToCartReducer)
    const checkoutProducts = useSelector(state => state.checkoutProductReducer)
    const dispatch = useDispatch()
    let cartTotal = 0

    const extractIdsFromObject = object => {
        log.info("[Checkout] extractIdsFromObject object = " + JSON.stringify(object))
        let idList = []
        for (const [id] of Object.entries(object)) {
            idList.push(parseInt(id))
        }
        return idList
    }

    useEffect(() => {
        log.info("[Checkout] Component will mount... addToCart = " + JSON.stringify(addToCart))

        let idList = []

        if (addToCart.hasOwnProperty("productQty")) {
            log.info(`[Checkout] load checkout products` +
                ` from addToCartQuantity = ${JSON.stringify(addToCart)}`)

            idList = extractIdsFromObject(addToCart["productQty"])


            if (idList.length > 0) {
                props.getDataViaAPI(LOAD_CHECKOUT_PRODUCTS, PRODUCT_BY_ID_DATA_API + idList.toString())
            } else {
                dispatch({
                    type: LOAD_CHECKOUT_PRODUCTS,
                    payload: {isLoading: false, data: {}}
                })
            }

        }

        log.info(`[Checkout] load checkout products idList = ${JSON.stringify(idList)}`)

        // eslint-disable-next-line
    }, [addToCart])

    if (history.location.pathname.localeCompare('/checkout') !== 0 &&
        history.location.pathname.localeCompare('/products/details/checkout') !== 0) {
        log.info(`[Checkout] corrupted url.`)
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
            name: 'Checkout',
            link: '/checkout'
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
        log.info(`[Checkout] checkoutProducts = ${JSON.stringify(checkoutProducts)}`)
        if (checkoutProducts.data && addToCart.hasOwnProperty("productQty")) {
            for (const [id, qty] of Object.entries(addToCart.productQty)) {
                if (checkoutProducts.data.hasOwnProperty(id)) {
                    cartTotal += qty * checkoutProducts.data[id].price
                }
            }
        }
        return cartTotal
    }

    const onQtyDropdownChangeHandler = (value, text, id) => {
        log.info(`[Checkout] onChangeHandler id = ${id}, value = ${value}`)
        let newAddToCart = addToCart
        newAddToCart.productQty[id] = value

        Cookies.set(SHOPPERS_PRODUCT_ID, newAddToCart, {expires: 7});
        dispatch({
            type: ADD_TO_CART,
            payload: newAddToCart
        })
    }

    const removeBtnClickHandler = id => () => {
        log.info(`[Checkout] removeBtnChangeHandler id = ${id}`)
        let newAddToCart = addToCart
        newAddToCart.totalQuantity -= newAddToCart.productQty[id]
        newAddToCart.productQty = _.omit(newAddToCart.productQty, id)
        Cookies.set(SHOPPERS_PRODUCT_ID, newAddToCart, {expires: 7});
        dispatch({
            type: ADD_TO_CART,
            payload: newAddToCart
        })
    }

    const wannaShopBtnClick = () => {
        history.push(`/products?q=category=all::page=0,${MAX_PRODUCTS_PER_PAGE}`);
    }

    if (checkoutProducts.isLoading) {
        return <Spinner/>
    } else {
        if (checkoutProducts.hasOwnProperty("data")) {
            if (Object.keys(checkoutProducts.data).length === 0) {
                return (
                    <Box display="flex" flexDirection="column">
                        <Box>
                            <EmptyCheckoutCart/>
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
            if (checkoutProducts.hasOwnProperty('statusCode')) {
                log.info(`[Checkout]: checkoutProducts.statusCode = ${checkoutProducts.statusCode}`)
                return <HTTPError statusCode={checkoutProducts.statusCode}/>
            }
        }
    }

    const renderCheckoutProducts = () => {
        log.info(`[Checkout] checkoutProducts = ${JSON.stringify(checkoutProducts)}`)

        let checkoutProductsList = []

        for (const [id, product] of Object.entries(checkoutProducts.data)) {

            checkoutProductsList.push(
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
                    <Box display="flex" mx={2} mb={1} justifyContent="flex-start">
                        <Button variant="contained" size="medium" color="secondary"
                                onClick={removeBtnClickHandler(id)}
                                startIcon={<RemoveCircleOutlineIcon/>}>
                            Remove
                        </Button>
                    </Box>
                </Box>
            )
        }

        return checkoutProductsList
    }

    log.info("[Checkout] Rendering Checkout Component.")

    return (
        <>
            <Box display="flex" p={3}>
                <BreadcrumbsSection linkList={breadcrumbLinks}/>
            </Box>

            <Box display="flex" flexDirection="column" mx={25}>
                <Box display="flex">
                    <Divider style={{width: "100%", height: 1}}/>
                </Box>

                <Box display="flex" flexDirection="row" py={4} css={{fontSize: '1.5rem', fontWeight: 600}}>
                    <Box flex="0.65">
                        {`My Shopping Bag (${addToCart.totalQuantity} Items)`}
                    </Box>
                    <Box>
                        {`Total: $${getCartTotal()}`}
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Box display="flex" flex="2.5" flexDirection="column">
                        {renderCheckoutProducts()}
                    </Box>

                    <Box display="flex" mx={2} pt={1}>
                        <Divider orientation="vertical" style={{height: "100%", width: 1}}/>
                    </Box>

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
                            <Button variant="contained" size="medium" color="secondary" style={{width: '100%'}}>
                                CONTINUE
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
        ;
}

export default connect(null, {getDataViaAPI})(Checkout);