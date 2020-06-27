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
    MAX_PRODUCTS_PER_PAGE,
} from "../../../constants/constants";

const FilterProductDisplay = props => {
        const filterProducts = useSelector(state => state.filterProductsReducer)
        const filterAttributes = useSelector(state => state.filterAttributesReducer)
        const selectedGenders = useSelector(state => state.selectGenderReducer)
        const selectedApparels = useSelector(state => state.selectApparelReducer)
        const selectedBrands = useSelector(state => state.selectBrandReducer)
        const selectedPriceRanges = useSelector(state => state.selectPriceReducer)
        const selectedSortValue = useSelector(state => state.selectSortReducer)
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

            if (selectedGenders.length > 0) {
                query.push(`gender=${selectedGenders[0].id}`)
            }

            let idList = appendQueryIds(selectedApparels)
            if (idList) {
                query.push(`apparel=${appendQueryIds(selectedApparels)}`)
            }

            idList = appendQueryIds(selectedBrands)
            if (idList) {
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

            if (selectedSortValue) {
                query.push(`sortby=${selectedSortValue.id}`)
            }

            if (query.length > 0) {
                log.info(`[FilterProductDisplay] query is prepared and ready to dispatch`)
                props.loadProducts(query.join("::"))
            }
        }

        useEffect(() => {
            log.info(`[FilterProductDisplay] Component did mount`)

            // page reload is fired or navigated from different page
            // so directly execute the URL.
            if (!filterProducts) {
                log.info(`[FilterProductDisplay] browser is reloaded`)
                return
            }
            log.info(`[FilterProductDisplay] build query`)
            prepareQueryAndDispatch()

            window.scrollTo(0, 0)
            // eslint-disable-next-line
        }, [selectedApparels, selectedGenders, selectedBrands, selectedPriceRanges, selectedSortValue]);


        if (!filterProducts) {
            log.info(`[FilterProductDisplay] filterProducts is null`)
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