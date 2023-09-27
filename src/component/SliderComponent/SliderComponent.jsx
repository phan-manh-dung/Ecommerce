import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import styles from './Slider.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SliderComponent = ({ arrImages, width, height }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div>
            <Slider {...settings}>
                {arrImages.map((image, index) => {
                    return (
                        <div key={index}>
                            <Image
                                style={{ width: width, height: height }}
                                className={cx('wrapper_image')}
                                src={image}
                                alt="img"
                                preview={false}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default SliderComponent;
