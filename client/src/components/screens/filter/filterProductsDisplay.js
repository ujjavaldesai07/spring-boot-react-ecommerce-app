import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {loadFilterScreen} from "../../../actions";

const FilterProductsDisplay = props => {
    const {filterQuery} = useSelector(state => state.imageClickEventReducer)
    const filterScreenData = useSelector(state => state.filterScreenReducer)

    useEffect(() => {
        props.loadFilterScreen(filterQuery);
    }, [props, filterQuery]);

    const renderImageList = (imageList) => {
        if (imageList == null) {
            return null
        }

        return imageList.map(({id, name, imageName}) => {
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
            {renderImageList(filterScreenData)}
        </>
    )
};
export default connect(null, {loadFilterScreen})(FilterProductsDisplay);