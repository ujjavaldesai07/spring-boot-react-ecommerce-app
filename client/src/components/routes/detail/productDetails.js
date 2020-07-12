import React, {useEffect, useState} from 'react';
import {Button, Grid, Box} from "@material-ui/core";
import log from 'loglevel';
import BreadcrumbsSection from "../../ui/breadcrumbs";
import {HOME_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import {SearchMatchesNotFound} from "../../ui/error/searchMatchesNotFound";
import {useDispatch, useSelector} from "react-redux";
import {connect} from 'react-redux';
import {getDataViaAPI} from '../../../actions'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import {ADD_TO_CART, PRODUCT_BY_ID_DATA_API, SELECT_PRODUCT_DETAIL, SHOPPERS_PRODUCT_ID} from "../../../actions/types";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "../../ui/spinner";
import {InternalServerError} from "../../ui/error/internalServerError";
import {BadRequest} from "../../ui/error/badRequest";

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

    useEffect(() => {
        log.info(`[Product Detail] Component did mount selectProductDetail = ${JSON.stringify(selectProductDetail)}`)
        log.info(`[Product Detail] Component did mount selectedProduct = ${JSON.stringify(selectedProduct)}`)

        if (selectedProduct && addToCart.hasOwnProperty("productQty") &&
            addToCart["productQty"].hasOwnProperty(selectedProduct.id)) {
            log.info(`[Product Detail] addToCart = ${JSON.stringify(addToCart)}`)
            log.info(`[Product Detail] setProductQuantity = ${addToCart.productQty[selectedProduct.id]}`)
            setProductQuantity(addToCart.productQty[selectedProduct.id])
        }
    }, [selectedProduct])


    if (history.location.pathname.localeCompare('/products/details') !== 0 ||
        history.location.search.search('product_id=') === -1
        || !history.location.search.startsWith('?q=')) {
        return <SearchMatchesNotFound/>
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
            log.info(`[Product Detail] selectProductDetail = ${JSON.stringify(selectProductDetail)}`)
            if (selectProductDetail.hasOwnProperty("statusCode")) {
                log.info(`[Product Detail] Internal Server Error`)
                return <InternalServerError/>
            }
            const extractedProductId = history.location.search.split("product_id=")
            log.info(`[Product Detail] extractedProductId = ${JSON.stringify(extractedProductId)}, length = ${extractedProductId.length}`)
            if (extractedProductId.length === 2) {
                props.getDataViaAPI(SELECT_PRODUCT_DETAIL, PRODUCT_BY_ID_DATA_API + extractedProductId[1])
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

    const dispatchAddToCart = newAddToCart => {
        Cookies.set(SHOPPERS_PRODUCT_ID, newAddToCart, {expires: 7});
        log.info(`[Product Detail] dispatchAddToCart productQty = ${JSON.stringify(newAddToCart)}`)
        dispatch({
            type: ADD_TO_CART,
            payload: newAddToCart
        })
    }

    const handleAddToBagButton = product_id => () => {
        log.info(`[Product Detail] Product is added to cart`)
        let newAddToCart = addToCart

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

    if (props.window) {
        props.window.scrollTo(0, 0)
    }

    log.info(`[Product Detail] Rendering Detail Component. selectedProduct = ${JSON.stringify(selectedProduct)}`)
    return (
        <>
            <Box display="flex" p={3}>
                <BreadcrumbsSection linkList={breadcrumbLinks}/>
            </Box>

            <Grid container justify={"center"}>
                <Grid item md={4}>
                    <Box >
                        <img src={selectedProduct.imageName} alt={selectedProduct.name}
                             style={{height: 500, width: 400}}
                             title={selectedProduct.name}/>
                    </Box>
                </Grid>
                <Grid item md={7}>
                    <Box display="flex" flexDirection="column">
                        <Box pb={3}>
                            <div style={{fontSize: "2rem", fontWeight: 500}}>
                                {selectedProduct.productBrandCategory.type}
                            </div>
                        </Box>
                        <Box pb={5}>
                            <div style={{fontSize: "1.7rem", fontWeight: 300}}>
                                {selectedProduct.name}
                            </div>
                        </Box>
                        <Box pb={3}>
                            <Box style={{fontSize: "1.8rem", fontWeight: 600}}>{`$ ${selectedProduct.price}`}</Box>
                            <Box pt={2} color="green" style={{fontSize: "1rem", fontWeight: 700}}>inclusive of all
                                taxes</Box>
                        </Box>

                        <Box display="flex" style={{height: '8%'}} py={4} alignItems="center">
                            <Box width="5%" style={{fontSize: '1.2rem', fontWeight: "lighter"}}>
                                Qty:
                            </Box>

                            <Box width="4%" style={{fontSize: '1.2rem', fontWeight: "bold"}}>
                                {productQuantity}
                            </Box>

                            <Box>
                                <Button variant="outlined" color="primary" size="large"
                                        style={{height: 40}}
                                        classes={{startIcon: classes.buttonStartIcon}}
                                        startIcon={<RemoveIcon fontSize="large"/>}
                                        disabled={productQuantity === 1}
                                        onClick={() => setProductQuantity(productQuantity - 1)}
                                >
                                </Button>
                            </Box>

                            <Box>
                                <Button variant="outlined" color="primary" size="large"
                                        style={{height: 40}}
                                        classes={{startIcon: classes.buttonStartIcon}}
                                        startIcon={<AddIcon fontSize="large"/>}
                                        onClick={() => setProductQuantity(productQuantity + 1)}
                                >
                                </Button>
                            </Box>
                        </Box>

                        <Box display="flex" flexDirection="row">
                            <Box mt={3} mr={4} width="25%" height="70%" justifyContent="center">
                                <Button variant="contained" size="large"
                                        style={{
                                            width: "100%", height: "100%", color: 'white',
                                            fontWeight: "bold", backgroundColor: "#AB0000"
                                        }}
                                        startIcon={<AddShoppingCartIcon/>}
                                        onClick={handleAddToBagButton(selectedProduct.id)}
                                >
                                    ADD TO BAG
                                </Button>
                            </Box>
                            <Box mt={3} width="25%" height="70%" justifyContent="center">
                                <Link to={`${history.location.pathname}/shopping-bag${history.location.search}`}>
                                    <Button variant="outlined" size="large" color="default"
                                            style={{width: "100%", height: "100%", fontWeight: "bold"}}
                                            startIcon={<LocalMallIcon/>}>
                                        PROCEED TO BAG
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default connect(null, {getDataViaAPI})(ProductDetails);