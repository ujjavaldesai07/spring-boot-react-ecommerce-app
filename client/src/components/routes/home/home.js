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
import {LOAD_HOME_PAGE, HOME_PAGE_DATA_API, HOME_PAGE_API_OBJECT_LEN} from "../../../actions/types";
import {BadRequest} from "../../ui/error/badRequest";
import {useBackButton} from "../../../hooks/backButtonHook";

const Home = props => {
    const {hover} = useSelector(state => state.tabHoverEventReducer)
    const homeAPIData = useSelector(state => state.homePageDataReducer)

    useBackButton()

    // Main screen API is loaded during Component Did mount
    useEffect(() => {
        log.info("[Home]: component did mount and home API is called.")
        props.getDataViaAPI(LOAD_HOME_PAGE, HOME_PAGE_DATA_API);

        // eslint-disable-next-line
    }, [homePageDataReducer]);

    if (homeAPIData.isLoading) {
        log.info("[Home]: loading")
        return <Spinner/>
    } else {
        if (homeAPIData.hasOwnProperty("data")) {
            if (Object.entries(homeAPIData.data).length !== HOME_PAGE_API_OBJECT_LEN) {

                log.info(`[Home]: homeAPIData.data length didn't matched` +
                    `actual length = ${Object.entries(homeAPIData.data).length},` +
                    `expected length = ${HOME_PAGE_API_OBJECT_LEN}`)

                return <BadRequest/>
            }
        } else {
            if (homeAPIData.hasOwnProperty('statusCode')) {
                log.info(`[Home]: homeAPIData.statusCode = ${homeAPIData.statusCode}`)
                return <HTTPError statusCode={homeAPIData.statusCode}/>
            }
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