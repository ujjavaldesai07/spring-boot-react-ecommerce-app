import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import log from "loglevel";
import {PageNotFound} from "../../ui/pageNotFound";
import {DETAILS_ROUTE, PRODUCTS_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import {SELECT_PRODUCT_DETAIL} from "../../../actions/types";
import {Box} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Spinner from "../../ui/spinner";

const FilterProductDisplay = props => {
        const filterProducts = useSelector(state => state.filterProductsReducer ?
            state.filterProductsReducer.products : null)
        const filterQuery = useSelector(state => state.filterQueryReducer)
        const dispatch = useDispatch()

        const renderPageNotFound = () => {
            return (
                <Box display="flex" pb={15} justifyContent="center" css={{width: '100%'}}>
                    <PageNotFound/>
                </Box>
            )
        }
        useEffect(() => {
            log.info(`[FilterProductDisplay] Component did mount`)

            try {
                if(filterQuery) {
                    props.loadProducts(filterQuery)
                }
            } catch (e) {
                log.error(`[FilterProductDisplay] Bad URL found in history.location.search`)
            }

            window.scrollTo(0, 0)

            // eslint-disable-next-line
        }, [filterQuery]);


        if (!filterProducts) {
            log.info(`[FilterProductDisplay] filterProducts is null`)
            return (
                <Box display="flex" pb={15} justifyContent="center" css={{width: '100%'}}>
                    <Spinner/>
                </Box>
            )
        }

        const handleImageClick = selectedProduct => () => {
            log.debug(`[FilterProductDisplay] dispatching the selected product = ${JSON.stringify(selectedProduct)}`)
            dispatch({
                type: SELECT_PRODUCT_DETAIL,
                payload: selectedProduct
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
export default connect(null, {loadProducts})(FilterProductDisplay);