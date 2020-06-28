import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import log from 'loglevel';
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {useSelector} from "react-redux";

const queryType = {
    brand: 1,
    apparel: 2
}

const headerStyles = {
    padding: '30px 0 0 30px',
    textDecoration: 'underline',
}

const TopCategoriesAndBrands = () => {
    const homeAPIData = useSelector(state => state.mainScreenReducer? state.mainScreenReducer : null)

    if (!homeAPIData) {
        log.debug("[TopCategoriesAndBrands]: homeAPIData is null")
        return null
    } else if (!homeAPIData.brands) {
        log.debug("[TopCategoriesAndBrands]: homeAPIData.brands is null")
        return null
    } else if (!homeAPIData.apparels) {
        log.debug("[TopCategoriesAndBrands]: homeAPIData.apparels is null")
        return null
    }

    const renderImageList = (imageList, filterQueryType) => {
        if (imageList == null) {
            log.debug(`[TopCategoriesAndBrands]: imageList is null`)
            return null
        }

        return imageList.map(info => {

            let filterQuery = null

            // prepare query parameters
            switch (filterQueryType) {
                case queryType.brand:
                    filterQuery = info.brandInfo ? `brand=${info.brandInfo.id}` : null
                    break
                case queryType.apparel:
                    if (info.apparelInfo && info.genderInfo) {
                        filterQuery = `apparel=${info.apparelInfo.id}::gender=${info.genderInfo.id}`
                    }
                    break
                default:
                    log.error("[TopCategoriesAndBrands]: filterQueryType is unsupported = " + filterQueryType)
                    return null
            }

            log.trace(`[TopCategoriesAndBrands]: filterQuery = ${filterQuery}, filterQueryType = ${filterQueryType}`)
            return (
                <Grid key={info.title} item xs={2}>
                    <Link to={`/products?q=${filterQuery}::page=0,${MAX_PRODUCTS_PER_PAGE}`}>
                        <img src={info.filePath} alt={info.filePath} style={{width: '90%', height: '100%'}}
                             title={info.title}/>
                    </Link>
                </Grid>
            )
        });
    };

    log.info("[TopCategoriesAndBrands]: Rendering TopCategoriesAndBrands Component")

    return (
        <div>
            <Typography variant="h5" noWrap style={headerStyles}>
                #Shop Top Brands
            </Typography>
            <Grid container spacing={0} style={{padding: '10px 0 0 30px'}}>
                {renderImageList(homeAPIData.brands, queryType.brand)}
            </Grid>
            <Typography variant="h5" noWrap style={headerStyles}>
                #Shop Top Categories
            </Typography>
            <Grid container spacing={0} style={{padding: '20px 0 70px 30px'}}>
                {renderImageList(homeAPIData.apparels, queryType.apparel)}
            </Grid>
        </div>
    )
};
export default TopCategoriesAndBrands;