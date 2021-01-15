// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper'
import { useSelector } from 'react-redux';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade])

export default function Carousel(props) {
    const arrSlider = useSelector(state => state.SliderReducer.dsSlider);
    // console.log(arrSlider);
    const renderSlider = () => {
        return arrSlider.map((item, index) => {
            return <SwiperSlide key={index}>
                <img className="w-100 h-100" src={item.image} alt={item.name}></img>
            </SwiperSlide>
        })
    }
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={true}
            effect="fade"
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            className="slider_home"
        >
            {renderSlider()}
        </Swiper>
    );
}

