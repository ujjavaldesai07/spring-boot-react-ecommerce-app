import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {SELECT_FILTER_ATTRIBUTES} from "../../../actions/types";
import log from "loglevel";
import {PageNotFound} from "../../ui/pageNotFound";
import {
    INITIAL_FILTER_ATTRIBUTES_STATE,
    MAX_PRODUCTS_PER_PAGE
} from "../../../constants/constants";

const FilterProductDisplay = props => {
    const filterProducts = useSelector(state => state.filterProductsReducer)
    const selectedGenders = useSelector(state => state.selectGenderReducer)
    const selectedApparels = useSelector(state => state.selectApparelReducer)
    const selectedBrands = useSelector(state => state.selectBrandReducer)
    const selectedPriceRanges = useSelector(state => state.selectPriceReducer)
    const selectedSortValue = useSelector(state => state.selectSortReducer)
    const dispatch = useDispatch()

    const selectAttributesAndPrepareQueryFromURI = () => {
        let uri = window.location.href.split("products?q=")
        log.info(`[FilterProductDisplay] (selectAttributesAndPrepareQueryFromURI) Page Reload is detected with query params = ${uri[1]}`)

        if (uri) {
            let queryParamStr = uri[1]
            let queryParam = queryParamStr.split("::")
            let reloadAttrState = INITIAL_FILTER_ATTRIBUTES_STATE

            queryParam.forEach(param => {
                let keyValue = param.split("=")
                let mapKey = keyValue[0]
                let mapValue = keyValue[1]
                let valueList = []

                if (mapKey.includes("pr", 0)) {
                    reloadAttrState[mapKey] = [...reloadAttrState[mapKey], parseInt(mapValue.split("id:")[1])]
                } else {
                    try {
                        mapValue.split(",").forEach(value => {
                            valueList.push(parseInt(value))
                        })
                        if (isNaN(valueList[0])) {
                            throw new Error("Not a Number")
                        }
                        reloadAttrState[mapKey] = valueList
                        log.trace(`[FilterProductDisplay] mapKey = ${mapKey}, valueList = ${valueList}`)
                    } catch (e) {
                        log.trace(`[FilterProductDisplay] mapKey = ${mapKey}, mapValue = ${mapValue}`)
                        reloadAttrState[mapKey] = mapValue
                    }
                }
            })

            log.info(`[FilterProductDisplay] extracted filterAttr from URI = ${JSON.stringify(reloadAttrState)} `)
            dispatch({
                type: SELECT_FILTER_ATTRIBUTES,
                payload: {
                    reloadAttrState
                }
            })
            return queryParam.join("::")
        }
        return null
    }

    const prepareQueryParameters = () => {
        log.info(`[FilterProductDisplay] (prepareQueryParameters) selectedFilterAttributes = ${JSON.stringify(selectedFilterAttributes)}`)

        let filterQuery = []

        // clear all will reset all the selectedFilterAttributes
        // and will add the default category=all that returns all
        // the products
        if (selectedFilterAttributes.clearAll) {

            log.info(`[FilterProductDisplay] Clear All parameter is found true`)
            filterQuery.push("category=all")

        } else {

            log.info(`[FilterProductDisplay] Searching for query params of categories`)
            let filterAttr = ["gender", "apparel", "brand", "page"]

            filterAttr.forEach(function (attr) {
                try {
                    if (selectedFilterAttributes[attr].length > 0) {
                        filterQuery.push(`${attr}=${selectedFilterAttributes[attr].toString()}`)
                    }
                } catch (e) {
                    log.warn(`[FilterProductDisplay] Attribute ${attr} does not exist in the object selectedFilterAttributes`)
                    return null
                }
            })
        }

        if (selectedFilterAttributes.sortBy.length > 0) {
            filterQuery.push(`sortby=${selectedFilterAttributes.sortBy[2]}`)
        }

        if (selectedFilterAttributes.price.length > 0) {
            selectedFilterAttributes.price.forEach(function (element) {
                let priceRange = filterAttributes.priceRanges[element - 1].type
                    .replace(new RegExp('\\$', 'g'), '')
                let priceRangeId = filterAttributes.priceRanges[element - 1].id

                if (priceRange[0] === "U") {
                    filterQuery.push(`price=lt:${priceRange.split(" ")[1]},id:${priceRangeId}`)
                } else if (priceRange[0] === "A") {
                    filterQuery.push(`price=gt:${priceRange.split(" ")[1]},id:${priceRangeId}`)
                } else {
                    filterQuery.push(`price=bt:${priceRange.split("-")[0]},
                    ${priceRange.split("-")[1]},id:${priceRangeId}`)
                }

            })
        }
        return filterQuery.join("::")
    }


    useEffect(() => {
        log.info(`[FilterProductDisplay] Component did mount.`)
        let query

        if ((selectedGenders.length + selectedApparels.length
            + selectedBrands.length) === 0) {

            // page reload is fired or navigated from different page
            // so extract the parameters from URI
            query = selectAttributesAndPrepareQueryFromURI();
        } else {
            query = prepareQueryParameters()
        }

        log.info(`[FilterProductDisplay]` +
            `query = ${query}, length = ${query.length}, typeOf = ${typeof query}`)

        if (query) {
            log.info(`[FilterProductDisplay] loading filter products`)
            props.loadFilterProducts(query.replace(/\s/g, ''));
        } else {
            log.info(`[FilterProductDisplay] query is null`)
        }

        window.scrollTo(0, 0)
        // eslint-disable-next-line
    }, [selectedFilterAttributes]);

    if (!filterProducts || !selectedFilterAttributes || !filterAttributes) {
        log.debug(`[FilterProductDisplay] filterProducts or selectedFilterAttributes or filterAttributes is null`)
        return null
    }

    const handleChangePage = (event, page) => {
        log.info(`[FilterProductDisplay] dispatching SET_FILTER_ATTRIBUTES for page = ${page}`)
        dispatch({
            type: SELECT_FILTER_ATTRIBUTES,
            payload: {
                page: [page === 1 ? 0 : (page - 1) * MAX_PRODUCTS_PER_PAGE, MAX_PRODUCTS_PER_PAGE]
            }
        })
    }

    const dropdownHandler = (id, text) => {
        log.debug(`[FilterProductDisplay] dropdownHandler id = ${id}, text = ${text}`)

        let queryValue = "newest"
        switch (id) {
            case 1:
                queryValue = "newest"
                break
            case 2:
                queryValue = "ratings"
                break
            case 3:
                queryValue = "lh"
                break
            case 4:
                queryValue = "hl"
                break
            default:
                throw new Error("Unsupported datatype")
        }

        log.debug(`[FilterProductDisplay] dispatching SET_FILTER_ATTRIBUTES for sortBy`)
        dispatch({
            type: SELECT_FILTER_ATTRIBUTES,
            payload: {
                sortBy: [id, text, queryValue]
            }
        })
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
                             style={{width: '90%', height: '70%', border: "1px solid black"}} title={info.name}/>
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
};
export default connect(null, {loadFilterProducts: loadProducts})(FilterProductDisplay);