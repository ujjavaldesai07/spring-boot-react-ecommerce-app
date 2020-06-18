import React from 'react';
import Swiper from 'react-id-swiper';

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

    if(!props.carouselImages) {
        return null
    }

    const renderImageList = (imageList) => {
        if(imageList == null) {
            return null
        }

       return imageList.map(({id, filePath}) => {
           return (
                <img key={id} src={filePath} alt={filePath}/>
           )
        });
    };
    return (
        <Swiper {...params} >
            {renderImageList(props.carouselImages)}
        </Swiper>
    )
};
export default VerticalSlider;