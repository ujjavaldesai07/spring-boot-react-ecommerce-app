import React, {useEffect, useState} from 'react';
import {Button, Grid, Box} from "@material-ui/core";
import log from 'loglevel';
import BreadcrumbsSection from "../../ui/breadcrumbs";
import history from "../../../history";
import {useDispatch, useSelector} from "react-redux";
import {connect} from 'react-redux';
import {getDataViaAPI} from '../../../actions'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Cookies from 'js-cookie';
import {ADD_TO_CART, SELECT_PRODUCT_DETAIL} from "../../../actions/types";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "../../ui/spinner";
import {InternalServerError} from "../../ui/error/internalServerError";
import {BadRequest} from "../../ui/error/badRequest";
import _ from "lodash";
import {PRODUCT_BY_ID_DATA_API} from "../../../constants/api_routes";
import {SHOPPERS_PRODUCT_INFO_COOKIE} from "../../../constants/cookies";
import {HOME_ROUTE} from "../../../constants/react_routes";
import {DocumentTitle} from "../../ui/documentTitle";

export const useButtonStyles = makeStyles(() => ({
    buttonStartIcon: {
        margin: 0,
    },
}));

function ProductDetails(props) {
    const classes = useButtonStyles()
    const selectProductDetail = useSelector(state => state.selectProductDetailReducer)

    const selectedProduct = selectProductDetail.hasOwnProperty("data") ?
        selectProductDetail.data[history.location.search.split("product_id=")[1]] : null

    const dispatch = useDispatch()
    const addToCart = useSelector(state => state.addToCartReducer)
    const [productQuantity, setProductQuantity] = useState(1)

    /**
     * Update the Component when product is already selected.
     * Cart products are stored in Cookie and we will set the product
     * for the first time the page is rendered.
     */
    useEffect(() => {
        log.info(`[Product Detail] Component did mount selectProductDetail = ${JSON.stringify(selectProductDetail)}`)
        log.info(`[Product Detail] Component did mount selectedProduct = ${JSON.stringify(selectedProduct)}`)

        // check if have anything in the cart
        if (selectedProduct && !_.isEmpty(addToCart.productQty)) {
            log.info(`[Product Detail] addToCart = ${JSON.stringify(addToCart)}`)
            log.info(`[Product Detail] setProductQuantity = ${addToCart.productQty[selectedProduct.id]}`)
            if(addToCart.productQty[selectedProduct.id]) {
                setProductQuantity(addToCart.productQty[selectedProduct.id])
            }

        }

        // eslint-disable-next-line
    }, [selectedProduct])

    // if the user change the URL format then just return bad request.
    if (history.location.pathname.localeCompare('/products/details') !== 0 ||
        history.location.search.search('product_id=') === -1
        || !history.location.search.startsWith('?q=')) {
        return <BadRequest/>
    }

    // find the breadcrumb from the url
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
            link: `${getStringBeforeLastDelimiter(history.location.pathname, "/")
            + getStringBeforeLastDelimiter(history.location.search, "::")}`
        },
        {
            name: 'Details',
            link: `${history.location.pathname + history.location.search}`
        },
    ]

    log.info(`[Product Detail] selectedProduct = ${selectedProduct}`)

    if (!selectedProduct) {
        try {

            // if status code is set then its because of error.
            log.info(`[Product Detail] selectProductDetail = ${JSON.stringify(selectProductDetail)}`)
            if (selectProductDetail.hasOwnProperty("statusCode")) {
                log.info(`[Product Detail] Internal Server Error`)
                return <InternalServerError/>
            }

            // get the product details from server
            const extractedProductId = history.location.search.split("product_id=")
            log.info(`[Product Detail] extractedProductId = ${JSON.stringify(extractedProductId)}, length = ${extractedProductId.length}`)
            if (extractedProductId.length === 2) {
                props.getDataViaAPI(SELECT_PRODUCT_DETAIL, PRODUCT_BY_ID_DATA_API + extractedProductId[1], null, false)
            }
        } catch (e) {
            log.error('[Product Detail] selectedProduct is null')
            return <BadRequest/>
        }
    }

    if (selectProductDetail.isLoading) {
        return <Spinner/>
    } else {
        if (!selectedProduct) {
            return <BadRequest/>
        }
    }

    // set the cart products in the cookie
    const dispatchAddToCart = newAddToCart => {
        Cookies.set(SHOPPERS_PRODUCT_INFO_COOKIE, newAddToCart, {expires: 7});
        log.info(`[Product Detail] dispatchAddToCart productQty = ${JSON.stringify(newAddToCart)}`)
        dispatch({
            type: ADD_TO_CART,
            payload: newAddToCart
        })
    }

    const handleAddToBagBtnClick = product_id => () => {
        log.info(`[Product Detail] Product is added to cart`)
        let newAddToCart = addToCart

        // add new product to cart
        if (newAddToCart.hasOwnProperty("productQty") === false) {
            newAddToCart = {
                totalQuantity: productQuantity,
                productQty: {
                    [product_id]: productQuantity
                }
            }
        } else {
            let totalQuantity = 0
            newAddToCart.productQty[product_id] = productQuantity
            newAddToCart.totalQuantity = 0

            for (const [, qty] of Object.entries(newAddToCart.productQty)) {
                totalQuantity += qty
            }
            newAddToCart.totalQuantity += totalQuantity
        }
        dispatchAddToCart(newAddToCart)
    }

    /**
     * Navigate to shopping bag page.
     */
    const handleProceedToBagBtnClick = () => {
        history.push(`${history.location.pathname}/shopping-bag${history.location.search}`)
    }

    if (props.window) {
        props.window.scrollTo(0, 0)
    }

    log.info(`[Product Detail] Rendering Detail Component. selectedProduct = ${JSON.stringify(selectedProduct)}`)
    return (
        <>
            <DocumentTitle title="Product Details"/>
            <Box display="flex" p={3}>
                <BreadcrumbsSection linkList={breadcrumbLinks}/>
            </Box>

            <Grid container>

                <Grid item container justify="center" sm={6} md={5} lg={4}>
                    <img src={selectedProduct.imageURL} alt={selectedProduct.name}
                         style={{height: "100%", width: "90%", paddingBottom: "2rem"}}
                         title={selectedProduct.name}/>
                </Grid>

                <Grid item xs={11} sm={5} md={6} container direction={"column"} spacing={2}
                      style={{marginLeft: "1rem"}}>
                    <Grid item style={{fontSize: "2rem", fontWeight: "bolder"}}>
                        {selectedProduct.productBrandCategory.type}
                    </Grid>

                    <Grid item style={{fontSize: "1.7rem", fontWeight: 600, paddingTop: "1rem"}}>
                        {selectedProduct.name}
                    </Grid>

                    <Grid item style={{fontSize: "1.8rem", fontWeight: 600, paddingTop: "1rem"}}>
                        {`$ ${selectedProduct.price}`}
                    </Grid>

                    <Grid item style={{fontSize: "1rem", fontWeight: 700, color: "green"}}>
                        inclusive of all taxes
                    </Grid>

                    <Grid item container alignItems="center">
                        <Grid item style={{fontSize: '1.2rem', fontWeight: "lighter", paddingRight: 10}}>
                            Qty:
                        </Grid>

                        <Grid item style={{fontSize: '1.2rem', fontWeight: "bold", paddingRight: 20}}>
                            {productQuantity}
                        </Grid>

                        <Grid item>
                            <Button variant="outlined" color="primary" size="large"
                                    style={{height: 40}}
                                    classes={{startIcon: classes.buttonStartIcon}}
                                    startIcon={<RemoveIcon fontSize="large"/>}
                                    disabled={productQuantity === 1}
                                    onClick={() => setProductQuantity(productQuantity - 1)}
                            >
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button variant="outlined" color="primary" size="large"
                                    style={{height: 40}}
                                    classes={{startIcon: classes.buttonStartIcon}}
                                    startIcon={<AddIcon fontSize="large"/>}
                                    onClick={() => setProductQuantity(productQuantity + 1)}
                            >
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={8} md={4}>
                            <Button
                                style={{
                                    height: 44, color: 'white',
                                    fontWeight: "bold", backgroundColor: "#AB0000"
                                }}
                                fullWidth
                                startIcon={<AddShoppingCartIcon/>}
                                onClick={handleAddToBagBtnClick(selectedProduct.id)}
                            >
                                ADD TO BAG
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={8} md={5}>
                            <Button variant="outlined" size="large" color="default"
                                    style={{height: 44, fontWeight: "bold"}}
                                    fullWidth
                                    startIcon={<LocalMallIcon/>}
                                    onClick={handleProceedToBagBtnClick}
                            >
                                PROCEED TO BAG
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </>
    );
}

export default connect(null, {getDataViaAPI})(ProductDetails);