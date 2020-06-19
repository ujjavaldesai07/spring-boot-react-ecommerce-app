import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {loadFilterProducts} from "../../../actions";

const FilterProductsDisplay = props => {
    const {filterQuery} = useSelector(state => state.imageClickEventReducer)
    const filterProducts = useSelector(state => state.filterProductsReducer)

    useEffect(() => {
        props.loadFilterProducts(filterQuery);
    }, [props, filterQuery]);

    if (!filterProducts) {
        return null
    }

    const renderImageList = imageList => {
        if (!imageList) {
            return null
        }

        return imageList.map( ({id, name, imageName}) => {
            return (
                <Grid key={id} item xs={3}>
                    <Link to=".">
                        <img src={imageName} alt={name} style={{width: '90%', height: '100%'}} title={name}/>
                    </Link>
                </Grid>
            )
        });
    };

    return (
        <>
            {renderImageList(filterProducts)}
        </>
    )
};
export default connect(null, {loadFilterProducts})(FilterProductsDisplay);