import React from "react";
import {Dimmer} from "semantic-ui-react";
import VerticalSlider from "./verticalSlider";
import TopCategoriesAndBrands from "./topCategoriesAndBrands";
import {StyledSegment, StyledDimmer} from "../styles/contentScreenStyles";
import {useSelector} from "react-redux";

const MainScreen = () => {
    const hover = useSelector(state => state.tab.hover)
    return (
        <Dimmer.Dimmable as={StyledSegment} dimmed={hover}>
            <VerticalSlider/>
            <TopCategoriesAndBrands/>
            <StyledDimmer active={hover}/>
        </Dimmer.Dimmable>
    )
}

export default MainScreen;