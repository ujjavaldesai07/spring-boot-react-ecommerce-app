import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadFilterProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import {Divider} from "@material-ui/core";
import FilterChips from "./filterChips";
import Pagination from '@material-ui/lab/Pagination';
import {SET_FILTER_ATTRIBUTES} from "../../../actions/types";
import DropdownSection from "../../parts/dropDown";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        paddingTop: "85px",
    },
}));

const FilterProductsDisplay = props => {
    const classes = useStyles()
    const {filterQuery} = useSelector(state => state.imageClickEventReducer)
    const filterProducts = useSelector(state => state.filterProductsReducer)
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)
    const filterAttributes = useSelector(state => state.filterAttributesReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("Component Did Mount.... filterQuery = " + filterQuery)
        if (!filterQuery) {
            props.loadFilterProducts(null);
        } else {
            props.loadFilterProducts(`${filterQuery}::${selectedFilterAttributes.page.toString()}::sortby=${selectedFilterAttributes.sortBy[2]}`);
        }
        window.scrollTo(0, 0)
    }, [filterQuery]);

    const getQuery = () => {
        let filterAttr = ["gender", "apparel", "brand", "page"]
        let filterQuery = []
        let categoryPresentInQuery = false
        filterAttr.forEach(function (attr) {
            if (selectedFilterAttributes[attr].length > 0) {
                filterQuery.push(`${attr}=${selectedFilterAttributes[attr].toString()}`)

                if (attr[0] === "g" || attr[0] === "a" || attr[0] === "b") {
                    categoryPresentInQuery = true
                }
            }
        })

        if (!categoryPresentInQuery) {
            filterQuery.push("category=all")
        }

        if (selectedFilterAttributes.sortBy.length > 0) {
            filterQuery.push(`sortby=${selectedFilterAttributes.sortBy[2]}`)
        }

        if (selectedFilterAttributes.price.length > 0) {

            selectedFilterAttributes.price.forEach(function (element) {

                let priceRange = filterAttributes.priceRanges[element - 1].type
                    .replace(new RegExp('\\$', 'g'), '')

                if (priceRange[0] === "U") {
                    filterQuery.push(`price=lt:${priceRange.split(" ")[1]}`)
                } else if (priceRange[0] === "A") {
                    filterQuery.push(`price=gt:${priceRange.split(" ")[1]}`)
                } else {
                    filterQuery.push(`price=bt:${priceRange.split("-")[0]},
                    ${priceRange.split("-")[1]}`)
                }

            })
        }

        return filterQuery.join("::")
    }

    useEffect(() => {
        console.log("Component Did Update....")
        let query = getQuery()
        if (query && query.length > 0) {
            console.log("Loading filter products................")
            props.loadFilterProducts(getQuery());
        }
        window.scrollTo(0, 0)
    }, [selectedFilterAttributes]);

    if (!filterProducts || !selectedFilterAttributes || !filterAttributes) {
        return null
    }

    console.log("selectedFilterAttributes = " + JSON.stringify(selectedFilterAttributes))

    const handleChangePage = (event, page) => {
        dispatch({
            type: SET_FILTER_ATTRIBUTES,
            payload: {
                page: [page * 12, 12]
            }
        })
    }

    const dropdownHandler = (id, text) => {
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
        dispatch({
            type: SET_FILTER_ATTRIBUTES,
            payload: {
                sortBy: [id, text, queryValue]
            }
        })
    }

    const renderImageList = imageList => {
        if (!imageList) {
            return null
        }

        return imageList.map((info) => {
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

    console.log("Calling Filter Products Display....")

    return (
        <>
            <span style={{display: "flex", padding: "20px 0 20px 0"}}>
            <Box width="75%" style={{padding: "26px 0 0 20px"}}>
                <FilterChips/>
            </Box>
                <Box width="auto">
                     <DropdownSection
                         options={filterAttributes.sorts}
                         activeInfo={selectedFilterAttributes.sortBy}
                         onChangeHandler={dropdownHandler}/>
                </Box>
            </span>
            <Divider/>
            <Grid container spacing={0} style={{padding: "20px 0 0 20px"}}>
                {renderImageList(filterProducts)}
            </Grid>
            <Divider/>
            <Grid container direction="column"
                  alignItems="center"
                  justify="center"
                  style={{padding: "30px 0 100px 0"}}>
                <Pagination onChange={handleChangePage} count={5} color="secondary"/>
            </Grid>
        </>
    )
};
export default connect(null, {loadFilterProducts})(FilterProductsDisplay);