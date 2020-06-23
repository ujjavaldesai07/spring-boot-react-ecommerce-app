import React, {useEffect} from "react";
import {Dimmer} from "semantic-ui-react";
import VerticalSlider from "./verticalSlider";
import TopCategoriesAndBrands from "./topCategoriesAndBrands";
import {StyledSegment, StyledDimmer} from "../../../styles/semanticUI/customStyles";
import {connect, useSelector} from "react-redux";
import {DocumentTitle} from "../../parts/documentTitle";
import {loadMainScreen} from "../../../actions";

const MainScreen = props => {
    const {hover} = useSelector(state => state.tabHoverEventReducer)
    const mainScreenData = useSelector(state => state.mainScreenReducer)

    useEffect(() => {
        props.loadMainScreen();
    },[props]);

    if(!mainScreenData) {
        return null;
    }

    return (
        <Dimmer.Dimmable as={StyledSegment} dimmed={hover}>
            <DocumentTitle title="Online Shopping for Women, Men, Kids Fashion & Lifestyle - Shoppers"/>
            <VerticalSlider carouselImages={mainScreenData.carousels}/>
            <TopCategoriesAndBrands brandImages={mainScreenData.brands} apparelImages={mainScreenData.apparels}/>
            <StyledDimmer active={hover}/>
        </Dimmer.Dimmable>
    )
}

export default connect(null, {loadMainScreen})(MainScreen);