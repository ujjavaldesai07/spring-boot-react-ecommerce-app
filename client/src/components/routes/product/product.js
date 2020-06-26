import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FilterNavBar from "./filterNavBar";
// import FilterProductsDisplay from "./filterProductDisplay";
import {connect} from "react-redux";
import {loadFilterAttributes} from "../../../actions";
import log from 'loglevel';
import filterAttributesReducer from "../../../reducers/screens/filter/filterAttributesReducer";
import Box from "@material-ui/core/Box";
import FilterChips from "./filterChips";
import DropdownSection from "../../ui/dropDown";
import {Divider} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import FilterDropdown from "./filterDropdown";

function Product(props) {

    // load product attributes from API
    useEffect(() => {
        log.info("[Product] Component did mount and filter attributes API is called.")
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
                            <span style={{display: "flex", padding: "20px 0 20px 0"}}>
            <Box width="75%" style={{padding: "26px 0 0 20px"}}>
                <FilterChips/>
            </Box>
                                <Box width="auto">
                                     <FilterDropdown/>
                                </Box>
            </span>
                <Divider/>
                {/*<FilterProductsDisplay/>*/}
                <Divider/>
                <Grid container direction="column"
                      alignItems="center"
                      justify="center"
                      style={{padding: "30px 0 100px 0"}}>
                    {/*<Pagination onChange={handleChangePage}*/}
                    {/*            page={selectedFilterAttributes.page[0] === 0 ?*/}
                    {/*                1 : (selectedFilterAttributes.page[0] / MAX_PRODUCTS_PER_PAGE) + 1}*/}
                    {/*            count={5}*/}
                    {/*            color="secondary"/>*/}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default connect(null, {loadFilterAttributes})(Product);