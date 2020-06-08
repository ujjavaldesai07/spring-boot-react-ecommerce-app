import React from 'react';
import Swiper from 'react-id-swiper';

const carouselImages = [
    { id: 13, src: require('../images/carousel/c1.png')},
    { id: 14, src: require('../images/carousel/c2.png')},
    { id: 15, src: require('../images/carousel/c3.png')},
    { id: 16, src: require('../images/carousel/c4.png')},
];

const VerticalSlider = () => {
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

    const renderImageList = () => {
       return carouselImages.map(({id, src}) => {
           return (
                <img key={id} src={src} alt={src}/>
           )
        });
    };
    return (
        <Swiper {...params} >
            {renderImageList()}
        </Swiper>
    )
};
export default VerticalSlider;