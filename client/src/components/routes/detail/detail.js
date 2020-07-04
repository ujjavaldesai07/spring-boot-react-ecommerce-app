import React from 'react';
import {Button} from "@material-ui/core";
import log from 'loglevel';
import BreadcrumbsSection from "../../ui/breadcrumbs";
import {HOME_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import Box from "@material-ui/core/Box";
import {PageNotFound} from "../../ui/pageNotFound";
import {useDispatch, useSelector} from "react-redux";
import {connect} from 'react-redux';
import {loadSelectedProduct} from '../../../actions'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import {ADD_TO_CART, SELECT_PRODUCT_DETAIL, SHOPPERS_PRODUCT_ID} from "../../../actions/types";

function Detail(props) {
    let selectedProduct = useSelector(state => state.selectProductDetailReducer?
        state.selectProductDetailReducer.products: null)
    const dispatch = useDispatch()

    if (history.location.pathname.localeCompare('/products/details') !== 0 ||
        history.location.search.search('product_id=') === -1
        || !history.location.search.startsWith('?q=')) {
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
            link: `${getStringBeforeLastDelimiter(history.location.pathname, "/")
            + getStringBeforeLastDelimiter(history.location.search, "::")}`
        },
        {
            name: 'Details',
            link: `${history.location.pathname + history.location.search}`
        },
    ]

    log.info(`[Detail] selectedProduct = ${selectedProduct}`)

    if (!selectedProduct) {
        try {
            const extractedProductId = history.location.search.split("product_id=")
            log.info(`extractedProductId = ${JSON.stringify(extractedProductId)}, length = ${extractedProductId.length}`)
            if (extractedProductId.length === 2) {
                props.loadSelectedProduct(extractedProductId[1], SELECT_PRODUCT_DETAIL)
            }
        } catch (e) {
            log.error('[Detail] selectedProduct is null')
        }
    }

    if (selectedProduct && selectedProduct.length > 0) {
        selectedProduct = selectedProduct[0]
    } else  {
        return <PageNotFound/>
    }

    const dispatchAddToCart = (totalQuantity, productList) => {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                totalQuantity,
                productList
            }
        })
    }

    const handleAddToBagButton = product_id => () => {
        log.info(`[Detail] Product is added to cart`)
        let savedProductsFromCookie = Cookies.get(SHOPPERS_PRODUCT_ID)
        let totalQuantity = 0

        if(!savedProductsFromCookie) {
            dispatchAddToCart(1, [{id: product_id, quantity: 1}])
            Cookies.set(SHOPPERS_PRODUCT_ID, [{id: product_id, quantity: 1}], {expires: 7});
            return
        }

        savedProductsFromCookie = JSON.parse(savedProductsFromCookie)
        let arrLen = savedProductsFromCookie.length
        let alreadyExist = false

        for(let i = 0; i < arrLen; i++) {
            if(savedProductsFromCookie[i].id === product_id) {
                ++savedProductsFromCookie[i].quantity
                alreadyExist = true
            }
            totalQuantity += savedProductsFromCookie[i].quantity
        }

        if(!alreadyExist) {
            savedProductsFromCookie.push({id: product_id, quantity: 1})
            log.info(`savedProductsFromCookie = ${JSON.stringify(savedProductsFromCookie)}`)
            ++totalQuantity
        }

        dispatchAddToCart(totalQuantity, savedProductsFromCookie)
        Cookies.set(SHOPPERS_PRODUCT_ID, savedProductsFromCookie, {expires: 7});
    }

    log.info(`[Detail] Rendering Detail Component. selectedProduct = ${JSON.stringify(selectedProduct)}`)
    return (
        <>
            <Box display="flex" p={3}>
                <BreadcrumbsSection linkList={breadcrumbLinks}/>
            </Box>

            <Box display="flex" css={{height: 500}} flexWrap="wrap">
                <Box flex="0.6" pb={2} pl={10}>
                    <img src={selectedProduct.imageName} alt={selectedProduct.name}
                         style={{height: 500, width: 400}}
                         title={selectedProduct.name}/>
                </Box>
                <Box display="flex" flexDirection="column" flex="1">
                    <Box pb={3}>
                        <div style={{
                            fontSize: "2rem",
                            fontWeight: 500
                        }}>{selectedProduct.productBrandCategory.type}</div>
                    </Box>
                    <Box pb={5}>
                        <div style={{fontSize: "1.7rem", fontWeight: 300}}>{selectedProduct.name}</div>
                    </Box>
                    <Box pb={3}>
                        <Box style={{fontSize: "1.8rem", fontWeight: 600}}>{`$ ${selectedProduct.price}`}</Box>
                        <Box pt={2} color="green" style={{fontSize: "1rem", fontWeight: 700}}>inclusive of all
                            taxes</Box>
                    </Box>
                    <Box>
                        DESCRIPTION
                    </Box>
                    <Box display="flex" flexDirection="row">
                        <Box mt={3} mr={4} width="30%" height="60%" justifyContent="center">
                            <Button variant="contained" size="large" color="secondary"
                                    style={{width: "100%", height: "100%"}}
                                    startIcon={<AddShoppingCartIcon/>}
                                    onClick={handleAddToBagButton(selectedProduct.id)}
                            >
                                ADD TO BAG
                            </Button>
                        </Box>
                        <Box mt={3} width="30%" height="60%" justifyContent="center">
                            <Link to={`${history.location.pathname}/checkout${history.location.search}`}>
                            <Button variant="outlined" size="large" color="default"
                                    style={{width: "100%", height: "100%"}}
                                    startIcon={<PaymentIcon/>}>
                                CHECKOUT
                            </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default connect(null, {loadSelectedProduct})(Detail);