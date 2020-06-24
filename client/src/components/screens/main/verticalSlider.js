import React from 'react';
import Swiper from 'react-id-swiper';
import log from 'loglevel';

const VerticalSlider = props => {
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

    if (!props.carouselImages) {
        log.debug("[VerticalSlider]: props.carouselImages is null")
        return null
    }

    const renderImageList = (imageList) => {
        if (imageList == null) {
            log.debug("[VerticalSlider]: imageList is null")
            return null
        }
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
            {renderImageList(props.carouselImages)}
        </Swiper>
    )
};
export default VerticalSlider;