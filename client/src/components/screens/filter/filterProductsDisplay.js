import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadFilterProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Box from '@material-ui/core/Box';
import {Divider} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {SET_FILTER_ATTRIBUTES} from "../../../actions/types";

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
    const dispatch = useDispatch()

    useEffect(() => {
        props.loadFilterProducts(filterQuery);
    }, [props, filterQuery]);

    if (!filterProducts || !selectedFilterAttributes) {
        return null
    }

    console.log("selectedFilterAttributes = " + JSON.stringify(selectedFilterAttributes))

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

    const addBoxTagToList = (boxDataList, category) => {
        let chipBoxList = []
        if (boxDataList && boxDataList.length) {
            boxDataList.forEach(function ({type, id}) {
                chipBoxList.push(
                    <Box key={`${category}-${id}`} width="auto" display="inline-block" p={0.2}>
                        <Chip label={type}
                              color="primary"
                              onDelete={handleDelete(`${category}-${id}`)}/>
                    </Box>
                )
            })
        }
        return chipBoxList
    }

    const renderChipBoxes = () => {
        if (selectedFilterAttributes) {
            let chipBoxList = []
            if (selectedFilterAttributes["apparel"]) {
                chipBoxList = chipBoxList.concat(addBoxTagToList(selectedFilterAttributes["apparel"], "apparel"))
            }
            if (selectedFilterAttributes["brand"]) {
                chipBoxList = chipBoxList.concat(addBoxTagToList(selectedFilterAttributes["brand"], "brand"))
            }
            if (selectedFilterAttributes["price"]) {
                chipBoxList = chipBoxList.concat(addBoxTagToList(selectedFilterAttributes["price"], "price"))
            }
            return chipBoxList
        }
        return null
    }

    const handleDelete = (id) => () => {
        const splitId = id.split("-")
        if (selectedFilterAttributes[splitId[0]]
            && selectedFilterAttributes[splitId[0]].length > 0) {
            for (let i = 0; i < selectedFilterAttributes[splitId[0]].length; i++) {
                if (selectedFilterAttributes[splitId[0]][i].id === parseInt(splitId[1])) {
                    dispatch({
                        type: SET_FILTER_ATTRIBUTES,
                        payload: {
                            [splitId[0]]: selectedFilterAttributes[splitId[0]][i]
                        }
                    })
                    return
                }
            }
        }
    }

    return (
        <>
            <span>
            <Box width="75%" style={{padding: "20px 0 30px 20px"}}>
                {renderChipBoxes()}
            </Box>
                {/*<Box width="25%" style={{display: "inline-flex"}}>*/}
                {/*     <DropdownSection options={filterAttributes.sortByCategoryList}/>*/}
                {/*</Box>*/}
            </span>
            <Divider/>
            <Grid container spacing={0} style={{padding: "20px 0 0 20px"}}>
                {renderImageList(filterProducts)}
            </Grid>
        </>
    )
};
export default connect(null, {loadFilterProducts})(FilterProductsDisplay);