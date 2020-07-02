import React from 'react';
import {Button} from "@material-ui/core";
import log from 'loglevel';
import BreadcrumbsSection from "../../ui/breadcrumbs";
import {HOME_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import Box from "@material-ui/core/Box";
import {PageNotFound} from "../../ui/pageNotFound";
import {useSelector} from "react-redux";
import {connect} from 'react-redux';
import {getSelectedProduct} from '../../../actions'
import Spinner from "../../ui/spinner";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';

function Detail(props) {
    const selectedProduct = useSelector(state => state.selectProductReducer)

    if(history.location.pathname.localeCompare('/products/details') !== 0 ||
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

    if(!selectedProduct) {
        try {
            const extractedProductId = history.location.search.split("product_id=")
            log.info(`extractedProductId = ${JSON.stringify(extractedProductId)}, length = ${extractedProductId.length}`)
            if(extractedProductId.length === 2) {
                props.getSelectedProduct(extractedProductId[1])
            }
        } catch (e) {
            return <PageNotFound/>
        }
    }

    if(!selectedProduct) {
        return <Spinner/>
    }

    log.info("[Detail] Rendering Detail Component.")
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
                        <div style={{fontSize: "2rem", fontWeight: 500}}>{selectedProduct.productBrandCategory.type}</div>
                    </Box>
                    <Box pb={5}>
                        <div style={{fontSize: "1.7rem", fontWeight: 300}}>{selectedProduct.name}</div>
                    </Box>
                    <Box pb={3}>
                        <Box style={{fontSize: "1.8rem", fontWeight: 600}}>{`$ ${selectedProduct.price}`}</Box>
                        <Box pt={2} color="green" style={{fontSize: "1rem", fontWeight: 700}}>inclusive of all taxes</Box>
                    </Box>
                    <Box>
                        DESCRIPTION
                    </Box>
                    <Box display="flex" flexDirection="row">
                        <Box mt={3} mr={4} width="30%" height="60%" justifyContent="center">
                            <Button variant="contained" size="large" color="secondary"
                                    style={{width: "100%", height: "100%"}}>
                                <Box pr={2} pt={1}><AddShoppingCartIcon/></Box>
                                <Box style={{fontSize: '1rem', fontWeight: 600}}>ADD TO BAG</Box>
                            </Button>
                        </Box>
                        <Box mt={3} width="30%" height="60%" justifyContent="center">
                            <Button variant="outlined" size="large" color="default"
                                    style={{width: "100%", height: "100%"}}>
                                <Box pr={2} pt={1}><PaymentIcon/></Box>
                                <Box style={{fontSize: '1rem', fontWeight: 600}}>CHECKOUT</Box>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default connect(null, {getSelectedProduct})(Detail);