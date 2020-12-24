import React, {useEffect} from "react";
import {Dimmer} from "semantic-ui-react";
import VerticalSlider from "./verticalSlider";
import TopCategoriesAndBrands from "./topCategoriesAndBrands";
import {StyledSegment, StyledDimmer} from "../../../styles/semanticUI/customStyles";
import {connect, useSelector} from "react-redux";
import {DocumentTitle} from "../../ui/documentTitle";
import {getDataViaAPI, setDefaultSearchSuggestions} from "../../../actions";
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
import {authServiceAPI} from "../../../api/service_api";
import axios from "axios";
import {Grid} from "@material-ui/core";

const Home = props => {
    const {hover} = useSelector(state => state.tabHoverEventReducer)
    const homeAPIData = useSelector(state => state.homePageDataReducer)

    // Main screen API is loaded during Component Did mount
    useEffect(() => {
        log.info("[Home]: component did mount.")

        ///////////////////////////////////////////////////////////
        // Below requests are made just to wake up all services on
        // Heroku so that it serves the requests quickly.
        // This should be removed when the app is deployed on actual server.
        props.setDefaultSearchSuggestions()
        authServiceAPI.post('/authenticate').catch(err => {
        })
        if (process.env.REACT_APP_PAYMENT_SERVICE_URL) {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_PAYMENT_SERVICE_URL}/payment`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: "xyz"
            }).catch(err => {
            })
        }
        ///////////////////////////////////////////////////////////


        if (!homeAPIData.hasOwnProperty("data")) {
            props.getDataViaAPI(LOAD_HOME_PAGE, HOME_PAGE_DATA_API, null, false);
        }

        // eslint-disable-next-line
    }, [homePageDataReducer]);

    // we will be showing spinner till we get the data via API
    if (homeAPIData.isLoading) {
        log.info("[Home]: loading")
        return <Spinner textComponent={
            <Grid container direction="column" spacing={1} style={{
                alignItems: "center", fontSize: "1.1rem", fontWeight: "bold"}}>
                <Grid item>
                    Please wait! This will take 1-2 minutes to load page for the first time.
                </Grid>
                <Grid item>
                    The backend service on heroku was in sleep mode and now its started.
                </Grid>
                <Grid item>
                    It will sleep again if the backend service is inactive for 30 minutes.
                </Grid>
            </Grid>}/>
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

export default connect(null, {getDataViaAPI, setDefaultSearchSuggestions})(Home);
