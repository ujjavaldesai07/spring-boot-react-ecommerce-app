import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {getDataViaAPI} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import log from "loglevel";
import {DETAILS_ROUTE, PRODUCTS_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import {
    LOAD_FILTER_PRODUCTS,
    PRODUCT_BY_CATEGORY_DATA_API,
    SELECT_PRODUCT_DETAIL
} from "../../../actions/types";
import {Box} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Spinner from "../../ui/spinner";
import {BadRequest} from "../../ui/error/badRequest";
import {HTTPError} from "../../ui/error/httpError";

const FilterProductDisplay = props => {
        const filterProductsReducer = useSelector(state => state.filterProductsReducer)
        let filterProducts = null
        const filterQuery = useSelector(state => state.filterQueryReducer)
        const dispatch = useDispatch()

        useEffect(() => {
            log.info(`[FilterProductDisplay] Component did mount`)

            try {
                if(filterQuery) {
                    props.getDataViaAPI(LOAD_FILTER_PRODUCTS, PRODUCT_BY_CATEGORY_DATA_API + filterQuery)
                }
            } catch (e) {
                log.error(`[FilterProductDisplay] Bad URL found in history.location.search`)
            }

            window.scrollTo(0, 0)

            // eslint-disable-next-line
        }, [filterQuery]);


        if (filterProductsReducer.isLoading) {
            log.info(`[FilterProductDisplay] filterProducts is null`)
            return (
                <Box display="flex" pb={15} justifyContent="center" css={{width: '100%'}}>
                    <Spinner/>
                </Box>
            )
        } else {
            if (filterProductsReducer.hasOwnProperty("data")) {
                if (Object.entries(filterProductsReducer.data).length === 0) {

                    log.info(`[Home]: homeAPIData.data length =` +
                        `${Object.entries(filterProductsReducer.data).length}`)

                    return (
                        <Box display="flex" justifyContent="center" css={{width: '100%', height: '100%'}}>
                            <BadRequest/>
                        </Box>
                    )
                }
                filterProducts = filterProductsReducer.data.products

            } else {
                if (filterProductsReducer.hasOwnProperty('statusCode')) {
                    log.info(`[Home]: homeAPIData.statusCode = ${filterProductsReducer.statusCode}`)
                    return <HTTPError statusCode={filterProductsReducer.statusCode}/>
                }
            }
        }

        const handleImageClick = selectedProduct => () => {
            log.debug(`[FilterProductDisplay] dispatching the selected product = ${JSON.stringify(selectedProduct)}`)
            dispatch({
                type: SELECT_PRODUCT_DETAIL,
                payload: {
                    isLoading: false,
                    data: {
                        [selectedProduct.id]: selectedProduct
                    }
                }
            })
        }

        const renderImageList = (imageList, boxSize, imageSize, margin) => {
            log.trace(`[FilterProductDisplay] Rendering renderImageList imageList = ${JSON.stringify(imageList)}`)

            return imageList.map((info) => {
                log.trace(`[FilterProductDisplay] Rendering imageList info = ${info}`)
                return (
                    <Box display="flex" flexDirection="column" key={info.id}
                         css={{height: boxSize.height, width: boxSize.width, margin: margin}}>
                        <Box>
                            <Link to={`${DETAILS_ROUTE}${history.location.search}::product_id=${info.id}`}
                                  onClick={handleImageClick(info)}>
                                <img src={info.imageName} alt={info.name}
                                     style={{height: imageSize.height, width: imageSize.width}}
                                     title={info.name}/>
                            </Link>
                        </Box>
                        <Box pt={1} style={{fontSize: "16px", fontWeight: "bold"}}>
                            <Link to={`${PRODUCTS_ROUTE}?q=brand=${info.productBrandCategory.id}`}>
                                <div style={{color: 'black'}}>
                                    {info.productBrandCategory.type}
                                </div>
                            </Link>
                        </Box>
                        <Box pt={1} style={{fontSize: "14px", color: "grey"}}>
                            {info.name}
                        </Box>
                        <Box pt={1} style={{fontSize: "16px", fontWeight: "bold"}}>
                            {`$${info.price}`}
                        </Box>
                        <Box pt={1} style={{fontSize: "14px"}}>
                            Free ship at $25
                        </Box>
                        <Box pt={1}>
                            <Rating
                                style={{zIndex: "1"}}
                                name="customized-empty"
                                defaultValue={info.ratings}
                                precision={0.5}
                                readOnly
                                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                            />
                        </Box>
                    </Box>
                )
            });
        };

        log.info(`[FilterProductDisplay] Rendering FilterProductDisplay Component`)
        return (
            <>
                {/*Desktop*/}
                <Hidden only={['xs', 'sm', 'md']}>
                    <Box display="flex" flexWrap="wrap" m={3}>
                        {renderImageList(filterProducts, {height: 450, width: 210},
                            {height: 280, width: 210}, 10)}
                    </Box>
                </Hidden>


                {/*Ipad*/}
                <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                    <Box display="flex" flexWrap="wrap" justifyContent="center" pb={15}>
                        {renderImageList(filterProducts, {height: 700, width: 450},
                            {height: 500, width: 450}, 20)}
                    </Box>
                </Hidden>

                {/*Mobile*/}
                <Hidden only={['md', 'lg', 'xl']}>
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        {renderImageList(filterProducts, {height: 600, width: 300},
                            {height: 400, width: 300}, 1)}
                    </Box>
                </Hidden>

            </>
        )
    }
;
export default connect(null, {getDataViaAPI})(FilterProductDisplay);