import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {HANDLE_IMAGE_CLICK_EVENT} from "../../../actions/types";
import {useDispatch} from "react-redux";

const queryType = {
    brands: 1,
    clothesTypes: 2
}


const TopCategoriesAndBrands = props => {
    const dispatch = useDispatch();

    const handleImageClick = filterQuery => {
        dispatch({
            type: HANDLE_IMAGE_CLICK_EVENT,
            payload: {
                filterQuery: filterQuery
            }
        });
    }

    const renderImageList = (imageList, filterQueryType) => {
        if (imageList == null) {
            return null
        }

        return imageList.map(info => {

            let filterQuery = null

            switch (filterQueryType) {
                case queryType.brands:
                    filterQuery = info.brandInfo ? `brand=${info.brandInfo.id}` : null
                    break
                case queryType.clothesTypes:
                    if (info.clothesTypeInfo && info.genderInfo) {

                        filterQuery = `clothestype=${info.clothesTypeInfo.id}::gender=${info.genderInfo.id}`
                    }
                    break
                default:
                    console.log("Invalid query type...")
                    return null
            }

            return (
                <Grid key={info.title} item xs={2}>
                    <Link to={`/products?q=${filterQuery}`} onClick={() => handleImageClick(filterQuery)}>
                        <img src={info.filePath} alt={info.filePath} style={{width: '90%', height: '100%'}}
                             title={info.title}/>
                    </Link>
                </Grid>
            )
        });
    };

    if (!props.brandImages) {
        return null;
    }

    if (!props.clothesTypeImages) {
        return null;
    }

    return (
        <div>
            <Typography variant="h5" noWrap style={{padding: '30px 0 0 30px', textDecoration: 'underline'}}>
                #Shop Top Brands
            </Typography>
            <Grid container spacing={0} style={{padding: '10px 0 0 30px'}}>
                {renderImageList(props.brandImages, queryType.brands)}
            </Grid>
            <Typography variant="h5" noWrap style={{padding: '30px 0 0 30px', textDecoration: 'underline'}}>
                #Shop Top Categories
            </Typography>
            <Grid container spacing={0} style={{padding: '20px 0 70px 30px'}}>
                {renderImageList(props.clothesTypeImages, queryType.clothesTypes)}
            </Grid>
        </div>
    )
};
export default TopCategoriesAndBrands;