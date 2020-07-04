import React, {useEffect} from "react";
import {Dimmer} from "semantic-ui-react";
import VerticalSlider from "./verticalSlider";
import TopCategoriesAndBrands from "./topCategoriesAndBrands";
import {StyledSegment, StyledDimmer} from "../../../styles/semanticUI/customStyles";
import {connect, useSelector} from "react-redux";
import {DocumentTitle} from "../../ui/documentTitle";
import {loadHomePage} from "../../../actions";
import log from 'loglevel';
import {homePageDataReducer} from "../../../reducers/screens/commonScreenReducer";
import HomeMenuIcons from "./homeMenuIcons";
import Hidden from "@material-ui/core/Hidden";
import history from "../../../history";
import {PageNotFound} from "../../ui/pageNotFound";

const Home = props => {
    const {hover} = useSelector(state => state.tabHoverEventReducer)

    // Main screen API is loaded during Component Did mount
    useEffect(() => {
        log.info("[Home]: component did mount and home API is called.")
        props.loadHomePage();

        // eslint-disable-next-line
    }, [homePageDataReducer]);

    if(history.location.pathname.localeCompare('/') !== 0) {
        return <PageNotFound/>
    }

    log.info("[Home]: Rendering Home Component")
    return (
        <Dimmer.Dimmable as={StyledSegment} dimmed={hover}>
            <DocumentTitle title="Online Shopping for Women, Men, Kids Fashion & Lifestyle - Shoppers"/>
            <Hidden only={['xs', 'sm', 'lg']}>
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

export default connect(null, {loadHomePage})(Home);