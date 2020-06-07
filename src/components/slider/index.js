import React, { useEffect, useState } from 'react'
import { SliderContainer } from "./style";
import "swiper/css/swiper.css"
import Swiper from "swiper";

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper(".slider-container", {
                initialSlide: 3,
                autoplay: {
                    delay: 5000,
                },
                // loop: true,
                // autoplay: true,
                // delay: 3000,
                disableOnInteraction: false,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            });
            setSliderSwiper(sliderSwiper)
        }
    }, [bannerList.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map((slider, index) => {
                            return (
                                <div className="swiper-slide" key={slider.picUrl}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="recommend" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    );
}

export default React.memo(Slider);