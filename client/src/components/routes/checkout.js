import React, {useEffect} from 'react';
import log from 'loglevel';
import BreadcrumbsSection from "../ui/breadcrumbs";
import {HOME_ROUTE} from "../../constants/constants";
import history from "../../history";
import Box from "@material-ui/core/Box";
import {PageNotFound} from "../ui/pageNotFound";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";
import {LOAD_CHECKOUT_PRODUCTS, SHOPPERS_PRODUCT_ID} from "../../actions/types";
import DropdownSection from "../ui/dropDown";
import {Button, Divider} from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {connect} from "react-redux";
import {loadSelectedProduct} from '../../actions'
import {addToCartReducer} from "../../reducers/screens/commonScreenReducer";

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
    const addToCartQuantity = useSelector(state => state.addToCartReducer)
    const checkoutProducts = useSelector(state => state.checkoutProductReducer)

    const extractIdsFromObject = objectList => {
        let idList = []
        objectList.forEach(({id}) => {
            idList.push(id)
        })
        return idList
    }

    useEffect(() => {
        log.info("[Checkout] Component will mount...")

        let idList = []

        if (addToCartQuantity) {
            log.debug(`[Checkout] load checkout products` +
                ` from addToCartQuantity = ${JSON.stringify(addToCartQuantity)}`)
            idList = extractIdsFromObject(addToCartQuantity.productList)

        } else {
            try {
                let savedProductsFromCookie = Cookies.get(SHOPPERS_PRODUCT_ID)
                if (savedProductsFromCookie) {
                    savedProductsFromCookie = JSON.parse(savedProductsFromCookie)

                    log.debug(`[Checkout] load checkout products from` +
                        `savedProductsFromCookie = ${JSON.stringify(savedProductsFromCookie)}`)

                    idList = extractIdsFromObject(savedProductsFromCookie)
                }
            } catch (e) {
                log.error(`[Checkout] Unable to JSON parse savedProductsFromCookie`)
            }
        }

        log.info(`[Checkout] load checkout products idList = ${JSON.stringify(idList)}`)

        if (idList.length > 0) {
            props.loadSelectedProduct(idList.toString(), LOAD_CHECKOUT_PRODUCTS)
        }

        // eslint-disable-next-line
    }, [addToCartReducer])

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

    if (!checkoutProducts) {
        return null
    }

    const renderCheckoutProducts = () => {
        log.debug(`[Checkout] checkoutProducts = ${JSON.stringify(checkoutProducts)}`)

        return checkoutProducts.map((product) => {
            return (
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
                                    Qty: 1 x $ 249  =  $ 249
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
                                    attrList={[{id: 1, type: 1}, {id: 2, type: 2}]}
                                    selectedValue={1}
                                    appendText="Qty:"
                                    title="quantity"
                                    size="sm"
                                    onChangeHandler={onChangeHandler}/>
                            </Box>
                        </Box>
                    </Box>

                    <Box display="flex" mx={2} mb={1}>
                        <Divider style={{width: "100%", height: 1}}/>
                    </Box>
                    <Box display="flex" mx={2} mb={1} justifyContent="flex-start">
                        <Button variant="contained" size="medium" color="secondary"
                                startIcon={<RemoveCircleOutlineIcon/>}>
                            Remove
                        </Button>
                    </Box>
                </Box>
            )
        })
    }

    const onChangeHandler = (id, value) => {
        log.info("[Checkout] onChangeHandler.")
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
                    <Box flex="0.67">
                        My Shopping Bag (3 Items)
                    </Box>
                    <Box>
                        Total: $249
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Box display="flex" flex="2.5" flexDirection="column">
                        {renderCheckoutProducts()}
                    </Box>

                    <Box display="flex" mx={2} pt={1}>
                        <Divider orientation="vertical" style={{height: "100%", width: 1}}/>
                    </Box>

                    <Box display="flex" flex="1" flexDirection="column">
                        <Box css={paymentStyles.header}>
                            PRICE DETAILS
                        </Box>
                        <Box display="flex" flexDirection="row" pt={2} css={paymentStyles}>
                            <Box flex="1">
                                Bag Total
                            </Box>
                            <Box>
                                $ 249
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
                                $ 249
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

export default connect(null, {loadSelectedProduct})(Checkout);