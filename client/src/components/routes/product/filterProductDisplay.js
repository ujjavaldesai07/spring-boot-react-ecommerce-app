import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import log from "loglevel";
import {PageNotFound} from "../../ui/pageNotFound";
import {DETAILS_ROUTE, MAX_PRODUCTS_PER_PAGE, PRODUCTS_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import {
    ADD_APPAREL_CATEGORY,
    ADD_BRAND_CATEGORY,
    ADD_GENDER_CATEGORY, SELECT_PRODUCT_DETAIL,
    SELECT_SORT_CATEGORY
} from "../../../actions/types";
import {Box} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Spinner from "../../ui/spinner";

const FilterProductDisplay = props => {
        const filterProducts = useSelector(state => state.filterProductsReducer ?
            state.filterProductsReducer.products : null)
        const filterAttributes = useSelector(state => state.filterAttributesReducer)
        const selectedGenders = useSelector(state => state.selectGenderReducer)
        const selectedApparels = useSelector(state => state.selectApparelReducer)
        const selectedBrands = useSelector(state => state.selectBrandReducer)
        const selectedPriceRanges = useSelector(state => state.selectPriceReducer)
        const selectedSort = useSelector(state => state.selectSortReducer)
        const selectedPage = useSelector(state => state.selectPageReducer)
        const [loadAttributesFromURL, setLoadAttributesFromURL] = useState(false)
        const dispatch = useDispatch()

        const appendQueryIds = attrList => {
            let selectedList = []

            if (attrList.length > 0) {
                attrList.forEach(({id}) => {
                    selectedList.push(id)
                })
                return selectedList.join()
            }
            return null
        }

        const prepareQueryAndDispatch = () => {

            let query = []
            let executeDefaultQuery = true

            if (selectedGenders.length > 0) {
                executeDefaultQuery = false
                query.push(`gender=${selectedGenders[0].id}`)
            }

            let idList = appendQueryIds(selectedApparels)
            if (idList) {
                executeDefaultQuery = false
                query.push(`apparel=${appendQueryIds(selectedApparels)}`)
            }

            idList = appendQueryIds(selectedBrands)
            if (idList) {
                executeDefaultQuery = false
                query.push(`brand=${appendQueryIds(selectedBrands)}`)
            }

            idList = appendQueryIds(selectedPriceRanges)
            if (idList) {
                query.push(`price=${appendQueryIds(selectedPriceRanges)}`)
            }

            if (selectedPriceRanges.length > 0) {
                selectedPriceRanges.forEach(function (element) {
                    let priceRange = filterAttributes.priceRanges[element.id - 1].type
                        .replace(new RegExp('\\$', 'g'), '')
                    let priceRangeId = filterAttributes.priceRanges[element.id - 1].id

                    if (priceRange[0] === "U") {
                        query.push(`price=lt:${priceRange.split(" ")[1]},id:${priceRangeId}`)
                    } else if (priceRange[0] === "A") {
                        query.push(`price=gt:${priceRange.split(" ")[1]},id:${priceRangeId}`)
                    } else {
                        query.push(`price=bt:${priceRange.split("-")[0]},
                    ${priceRange.split("-")[1]},id:${priceRangeId}`)
                    }
                })
            }

            if (selectedSort) {
                query.push(`sortby=${selectedSort.id}`)
            }

            if (selectedPage) {
                query.push(`page=${(selectedPage.pageNumber - 1) * MAX_PRODUCTS_PER_PAGE},${MAX_PRODUCTS_PER_PAGE}`)
            }

            if (executeDefaultQuery) {
                query.push("category=all")
            }

            if (query.length > 0) {
                log.info(`[FilterProductDisplay] query is prepared and ready to dispatch`)
                props.loadProducts(query.join("::"))
            }
        }

        const dispatchFilterAttributes = (actionType, attrString, attrList, oldSelectedAttrList) => {

            const getObjectFromList = (id, list) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === parseInt(id))
                        return list[i]
                }
                return null
            }

            let params = history.location.search
            let attrParams = params.split(`${attrString}=`)

            if (attrParams.length === 1) {
                return
            }

            let values
            let newSelectedAttrList = []

            // 0th index consist of "?q=" which we are not interest
            // actual data starts from pIndex=1
            for (let pIndex = 1; pIndex < attrParams.length; ++pIndex) {
                try {
                    values = attrParams[pIndex].split("::")[0].split(",")
                } catch (e) {
                    log.error("Corrupted URL. Unable to decode url field")
                }

                if (values.length > 0) {
                    values.forEach(id => {
                        // check if Id is already present or not in the existing
                        // selected list in order to avoid duplicating the entries
                        let attrObject = getObjectFromList(id, attrList)
                        if (attrObject) {
                            newSelectedAttrList.push({
                                id: attrObject.id,
                                value: attrObject.type
                            })
                        }
                    })
                }
            }

            if (newSelectedAttrList.length > 0) {
                log.info(`[ACTION] setFilterAttributesFromURL Dispatching = ${actionType}`)
                dispatch({
                    type: actionType,
                    payload: {
                        attrList: newSelectedAttrList
                    }
                })
            }
        }

        const setFilterAttributesFromURL = () => {
            if (history.location && history.location.pathname.localeCompare(PRODUCTS_ROUTE) === 0) {
                log.info(`[FilterProductDisplay]: url = ${history.location.search}`)

                const attrInfoList = [
                    {
                        type: ADD_GENDER_CATEGORY,
                        attrStr: "gender",
                        attrList: filterAttributes.genders,
                        selectedAttrList: selectedGenders
                    },
                    {
                        type: ADD_APPAREL_CATEGORY,
                        attrStr: "apparel",
                        attrList: filterAttributes.apparels,
                        selectedAttrList: selectedApparels
                    },
                    {
                        type: ADD_BRAND_CATEGORY,
                        attrStr: "brand",
                        attrList: filterAttributes.brands,
                        selectedAttrList: selectedBrands
                    },
                    {
                        type: SELECT_SORT_CATEGORY,
                        attrStr: "sortby",
                        attrList: filterAttributes.sorts,
                        selectedAttrList: selectedSort
                    },

                ]

                attrInfoList.forEach(({type, attrStr, attrList}) => {
                    dispatchFilterAttributes(type, attrStr, attrList)
                })

                setLoadAttributesFromURL(true)
            }
        }

        useEffect(() => {
            log.info(`[FilterProductDisplay] Component did mount`)

            if (!loadAttributesFromURL) {
                log.info(`[FilterProductDisplay] setting selected attributes from URL`)
                if (filterAttributes) {
                    log.info(`[FilterProductDisplay] filterAttributes is not null`)
                    setFilterAttributesFromURL()
                }
            } else {
                log.info(`[FilterProductDisplay] build query`)
                prepareQueryAndDispatch()
            }

            window.scrollTo(0, 0)

            // eslint-disable-next-line
        }, [selectedApparels, selectedGenders, selectedBrands, selectedPriceRanges,
            selectedSort, selectedPage, filterAttributes]);

        const renderPageNotFound = () => {
            return (
                <Box display="flex" pb={15} justifyContent="center" css={{width: '100%'}}>
                    <PageNotFound/>
                </Box>
            )
        }

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