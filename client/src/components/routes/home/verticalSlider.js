import React from 'react';
import Swiper from 'react-id-swiper';
import log from 'loglevel';
import {useSelector} from "react-redux";
import {BadRequest} from "../../ui/error/badRequest";

const VerticalSlider = () => {
    const homeAPIData = useSelector(state => state.homePageDataReducer)

    const params = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    }

    const renderImageList = (imageList) => {

        if(!imageList) {
            log.info(`[VerticalSlider]: imageList is null`)
            return <BadRequest/>
        }

        // filter out images which are not for carousels.
        imageList = imageList.filter(image => image.filePath.search("icon") === -1)

        log.trace("[VerticalSlider]: Rendering renderImageList imageList = " + JSON.stringify(imageList))
        return imageList.map(({id, filePath}) => {
            log.trace(`[VerticalSlider]: Rendering renderImageList imageList filePath = ${filePath}`)
            return (
                <img key={id} src={filePath} alt={filePath}/>
            )
        });
    };

    log.info("[VerticalSlider]: Rendering VerticalSlider Component")
    return (
        <Swiper {...params}>
            {renderImageList(homeAPIData.data.carousels)}
        </Swiper>
    )
};
export default VerticalSlider;