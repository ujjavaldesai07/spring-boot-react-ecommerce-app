import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {loadFilterProducts} from "../../../actions";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

        return imageList.map((info) => {
            return (
                <Grid item key={info.id} md={3} style={{paddingBottom: "30px"}}>
                    <Link to=".">
                        <img src={info.imageName} alt={info.name}
                             style={{width: '85%', height: '70%', border: "1px solid black"}} title={info.name}/>
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

    return (
        <Grid container spacing={0} style={{padding: '40px 0 0 40px'}}>
            {renderImageList(filterProducts)}
        </Grid>
    )
};
export default connect(null, {loadFilterProducts})(FilterProductsDisplay);