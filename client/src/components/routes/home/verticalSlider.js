import React from 'react';
import Swiper from 'react-id-swiper';
import log from 'loglevel';
import {useSelector} from "react-redux";

const VerticalSlider = () => {
    const homeAPIData = useSelector(state => state.homeScreenReducer? state.homeScreenReducer : null)

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

    if (!homeAPIData) {
        log.debug("[VerticalSlider]: homeAPIData is null")
        return null
    } else if (!homeAPIData.carousels) {
        log.debug("[VerticalSlider]: homeAPIData.carousels is null")
        return null
    }

    const renderImageList = (imageList) => {
        if (imageList == null) {
            log.debug("[VerticalSlider]: imageList is null")
            return null
        }

        // filter out images which are not for carousels.
        // eslint-disable-next-line array-callback-return
        imageList = imageList.filter(image => { if(image.filePath.search("icon") === -1) return image})
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
        <Swiper {...params} >
            {renderImageList(homeAPIData.carousels)}
        </Swiper>
    )
};
export default VerticalSlider;