import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import log from "loglevel";
import {PageNotFound} from "../../ui/pageNotFound";
import {MAX_PRODUCTS_PER_PAGE, PRODUCT_ROUTE} from "../../../constants/constants";
import history from "../../../history";
import {
    ADD_APPAREL_CATEGORY,
    ADD_BRAND_CATEGORY,
    ADD_GENDER_CATEGORY,
    SELECT_SORT_CATEGORY
} from "../../../actions/types";

const FilterProductDisplay = props => {
        const filterProducts = useSelector(state => state.filterProductsReducer)
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
                    let priceRange = filterAttributes.priceRanges[element - 1].value
                        .replace(new RegExp('\\$', 'g'), '')
                    let priceRangeId = filterAttributes.priceRanges[element - 1].id

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

        const setFilterAttributesFromURL = (actionType, attrString, attrList, oldSelectedAttrList) => {

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

        const setWrapper = () => {
            if (history.location && history.location.pathname.localeCompare(PRODUCT_ROUTE) === 0) {
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
                    setFilterAttributesFromURL(type, attrStr, attrList)
                })

                setLoadAttributesFromURL(true)
            }
        }

        useEffect(() => {
            log.info(`[FilterProductDisplay] Component did mount`)

            if(!loadAttributesFromURL) {
                log.info(`[FilterProductDisplay] setting selected attributes from URL`)
                if (filterAttributes) {
                    log.info(`[FilterProductDisplay] filterAttributes is not null`)
                    setWrapper()
                }
            } else {
                log.info(`[FilterProductDisplay] build query`)
                prepareQueryAndDispatch()
            }

            window.scrollTo(0, 0)

            // eslint-disable-next-line
        }, [selectedApparels, selectedGenders, selectedBrands, selectedPriceRanges,
            selectedSort, selectedPage, filterAttributes]);


        if (!filterProducts) {
            log.info(`[FilterProductDisplay] filterProducts is null`)
            return null
        }

        const renderImageList = imageList => {
            if (imageList.length === 0) {
                log.debug(`[FilterProductDisplay] Rendering renderImageList and imageList is null`)
                return (
                    <Grid container direction="column"
                          alignItems="center"
                          justify="center"
                          style={{padding: "30px 0 100px 0"}}>
                        <PageNotFound/>
                    </Grid>
                )
            }

            log.trace(`[FilterProductDisplay] Rendering renderImageList imageList = ${JSON.stringify(imageList)}`)

            return imageList.map((info) => {
                log.trace(`[FilterProductDisplay] Rendering imageList info = ${info}`)
                return (
                    <Grid item key={info.id} md={3} style={{padding: "10px 0 30px 0"}}>
                        <Link to=".">
                            <img src={info.imageName} alt={info.name}
                                 style={{width: '90%', height: '70%', border: "1px solid black"}}
                                 title={info.name}/>
                        </Link>
                        <div style={{fontSize: "16px", padding: "5px 0 0 3px", fontWeight: "bold"}}>
                            {info.productBrandCategory.type}
                        </div>
                        <div style={{fontSize: "14px", padding: "5px 0 0 3px", color: "grey"}}>
                            {info.name}
                        </div>
                        <div style={{fontSize: "14px", padding: "5px 0 0 3px", fontWeight: "bold"}}>
                            {`$${info.price}`}
                        </div>
                        <div style={{fontSize: "14px", padding: "10px 0 0 3px"}}>
                            Free ship at $25
                        </div>
                        <Rating
                            style={{paddingTop: "10px", zIndex: "1"}}
                            name="customized-empty"
                            defaultValue={info.ratings}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        />
                    </Grid>
                )
            });
        };

        log.info(`[FilterProductDisplay] Rendering FilterProductDisplay Component`)
        return (
            <Grid container spacing={0} style={{padding: "20px 0 0 20px"}}>
                {renderImageList(filterProducts)}
            </Grid>
        )
    }
;
export default connect(null, {loadProducts})(FilterProductDisplay);