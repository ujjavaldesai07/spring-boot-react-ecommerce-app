import React from 'react';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import log from 'loglevel';
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import {BadRequest} from "../../ui/error/badRequest";

const queryType = {
    brand: 1,
    apparel: 2
}

const TopCategoriesAndBrands = () => {
    const homeAPIData = useSelector(state => state.homePageDataReducer)

    const renderImageList = (imageList, filterQueryType) => {
        if(!imageList) {
            log.info(`[TopCategoriesAndBrands]: imageList is null`)
            return <BadRequest/>
        }

        return imageList.map(info => {

            let filterQuery = null

            // prepare query parameters
            switch (filterQueryType) {
                case queryType.brand:
                    filterQuery = info.brandInfo ? `brands=${info.brandInfo.id}` : null
                    break
                case queryType.apparel:
                    if (info.apparelInfo && info.genderInfo) {
                        filterQuery = `apparels=${info.apparelInfo.id}::genders=${info.genderInfo.id}`
                    }
                    break
                default:
                    log.error("[TopCategoriesAndBrands]: filterQueryType is unsupported = " + filterQueryType)
                    return null
            }

            log.trace(`[TopCategoriesAndBrands]: filterQuery = ${filterQuery}, filterQueryType = ${filterQueryType}`)
            return (
                <Box key={info.title} css={{maxHeight: 400, maxWidth: 200}}>
                    <Link to={`/products?q=${filterQuery}::page=0,${MAX_PRODUCTS_PER_PAGE}`}>
                        <img src={info.filePath} alt={info.filePath} style={{width: '90%', height: '100%'}}
                             title={info.title}/>
                    </Link>
                </Box>
            )
        });
    };

    const renderDesktopSection = (title, dataList, queryType) => {
        return (
            <>
                <Box display="flex" justifyContent="center" style={{backgroundColor: "pink", marginTop: 30}}>
                    <Typography variant="h4" noWrap style={{fontWeight: "bold"}}>
                        {title}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" flexWrap="nowrap" style={{padding: '30px 0 0 0'}}>
                    {renderImageList(dataList, queryType)}
                </Box>
            </>
        )
    }

    const renderMobileSection = (title, dataList, queryType) => {
        return (
            <>
                <Box display="flex" justifyContent="center" style={{backgroundColor: "pink"}}>
                    <Typography variant="h4" style={{fontWeight: "bold"}}>
                        {title}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap" style={{padding: '50px 0 30px 0'}}>
                    {renderImageList(dataList, queryType)}
                </Box>
            </>
        )
    }

    log.info("[TopCategoriesAndBrands]: Rendering TopCategoriesAndBrands Component")

    return (
        <div>
            <Hidden xsDown>
                {renderDesktopSection("#Shop Top Brands", homeAPIData.data.brands, queryType.brand)}
                {renderDesktopSection("#Shop Top Categories", homeAPIData.data.apparels, queryType.apparel)}
            </Hidden>

            <Hidden smUp>
                {renderMobileSection("#Shop Top Brands", homeAPIData.data.brands, queryType.brand)}
                {renderMobileSection("#Shop Top Categories", homeAPIData.data.apparels, queryType.apparel)}
            </Hidden>
        </div>
    )
};
export default TopCategoriesAndBrands;