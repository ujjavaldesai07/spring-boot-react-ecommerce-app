import React, {useEffect} from "react";
import {Dimmer} from "semantic-ui-react";
import VerticalSlider from "./verticalSlider";
import TopCategoriesAndBrands from "./topCategoriesAndBrands";
import {StyledSegment, StyledDimmer} from "../../../styles/semanticUI/customStyles";
import {connect, useSelector} from "react-redux";
import {DocumentTitle} from "../../ui/documentTitle";
import {getDataViaAPI} from "../../../actions";
import log from 'loglevel';
import {homePageDataReducer} from "../../../reducers/screens/commonScreenReducer";
import HomeMenuIcons from "./homeMenuIcons";
import Hidden from "@material-ui/core/Hidden";
import Spinner from "../../ui/spinner";
import {HTTPError} from "../../ui/error/httpError";
import {LOAD_HOME_PAGE} from "../../../actions/types";
import {BadRequest} from "../../ui/error/badRequest";
import {HOME_PAGE_DATA_API} from "../../../constants/api_routes";
import {HOME_PAGE_API_OBJECT_LEN} from "../../../constants/constants"

const Home = props => {
    const {hover} = useSelector(state => state.tabHoverEventReducer)
    const homeAPIData = useSelector(state => state.homePageDataReducer)

    // Main screen API is loaded during Component Did mount
    useEffect(() => {
        log.info("[Home]: component did mount and home API is called.")
        props.getDataViaAPI(LOAD_HOME_PAGE, HOME_PAGE_DATA_API);

        // eslint-disable-next-line
    }, [homePageDataReducer]);

    // we will be showing spinner till we get the data via API
    if (homeAPIData.isLoading) {
        log.info("[Home]: loading")
        return <Spinner/>
    } else {

        // check if we got the data from the API
        if (homeAPIData.hasOwnProperty("data")
            && Object.entries(homeAPIData.data).length !== HOME_PAGE_API_OBJECT_LEN) {

            log.info(`[Home]: homeAPIData.data length didn't matched` +
                `actual length = ${Object.entries(homeAPIData.data).length},` +
                `expected length = ${HOME_PAGE_API_OBJECT_LEN}`)

            // if we can't get the data then the front end
            // didn't use the API correctly.
            return <BadRequest/>

            // if statusCode exist in the object then
            // we are sure that something went wrong at server side while
            // fetching the API
        } else if (homeAPIData.hasOwnProperty('statusCode')) {
            log.info(`[Home]: homeAPIData.statusCode = ${homeAPIData.statusCode}`)
            return <HTTPError statusCode={homeAPIData.statusCode}/>
        }
    }

    log.info("[Home]: Rendering Home Component")
    return (
        <Dimmer.Dimmable as={StyledSegment} dimmed={hover}>
            <DocumentTitle title="Online Shopping for Women, Men, Kids Fashion & Lifestyle - Shoppers"/>
            <Hidden only={['xs', 'lg']}>
                <HomeMenuIcons/>
            </Hidden>
            <Hidden only={['xs']}>
                <VerticalSlider/>
            </Hidden>
            <TopCategoriesAndBrands/>
            <StyledDimmer active={hover}/>
        </Dimmer.Dimmable>
    )
}

export default connect(null, {getDataViaAPI})(Home);