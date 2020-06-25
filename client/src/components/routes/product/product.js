import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterNavBar";
import FilterProductsDisplay from "./filterProductDisplay";
import {connect} from "react-redux";
import {loadFilterAttributes} from "../../../actions";
import log from 'loglevel';
import filterAttributesReducer from "../../../reducers/screens/filter/filterAttributesReducer";

function Product(props) {

    // load product attributes from API
    useEffect(() => {
        log.info("[Product] Component did mount and product attributes API is called.")
        props.loadFilterAttributes();

        // eslint-disable-next-line
    }, [filterAttributesReducer]);

    log.info("[Product] Rendering Product Component.")
    return (
        <Grid container>
            <Grid item md={2}>
                <FilterNavBar/>
            </Grid>
            <Grid item md={10}>
                <FilterProductsDisplay/>
            </Grid>
        </Grid>
    );
}

export default connect(null, {loadFilterAttributes})(React.memo(Product));