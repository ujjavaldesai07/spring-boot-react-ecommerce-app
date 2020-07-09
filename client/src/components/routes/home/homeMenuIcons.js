import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import log from 'loglevel';
import {MAX_PRODUCTS_PER_PAGE} from "../../../constants/constants";
import {useSelector} from "react-redux";
import {BadRequest} from "../../ui/error/badRequest";

const HomeMenuIcons = () => {
    const homeAPIData = useSelector(state => state.homePageDataReducer)

    const renderImageList = (imageList) => {

        if(!imageList) {
            log.info(`[HomeMenuIcons]: imageList is null`)
            return <BadRequest/>
        }

        // filter out images which are related to home icons.
        imageList = imageList.filter(image => image.filePath.search("icon") !== -1)

        return imageList.map(info => {

            let filterQuery = null

            return (
                <Grid key={info.id} item md>
                    <Link to={`/products?q=${filterQuery}::page=0,${MAX_PRODUCTS_PER_PAGE}`}>
                        <img src={info.filePath} alt={info.filePath} style={{width: '90%', height: '100%'}}
                             title={info.title}/>
                    </Link>
                </Grid>
            )
        });
    };

    log.info("[HomeMenuIcons]: Rendering HomeMenuIcons Component")

    return (
        <Grid container spacing={6} style={{padding: '20px 0 70px 30px'}}>
            {renderImageList(homeAPIData.data.carousels)}
        </Grid>
    )
};
export default HomeMenuIcons;