import React from 'react';
import styles from './SlideCardComponent.module.scss';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

const SliderCardComponent = ({ children, rtl = false }) => {
  const childrenArray = React.Children.toArray(children);
  const midPoint = Math.ceil(childrenArray.length / 2);
  const firstHalf = childrenArray.slice(0, midPoint);
  const secondHalf = childrenArray.slice(midPoint);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    lazyLoad: 'ondemand',
    cssEase: 'ease-in-out',
    rtl: rtl,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (window.innerWidth <= 600) {
    return (
      <div className={cx('slider_container')}>
        <div className={cx('slider_row')}>
          <Slider {...settings}>
            {firstHalf.map((child, index) => (
              <div key={index} className={cx('slider_item')}>
                {child}
              </div>
            ))}
          </Slider>
        </div>
        <div className={cx('slider_row')}>
          <Slider {...settings}>
            {secondHalf.map((child, index) => (
              <div key={index} className={cx('slider_item')}>
                {child}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('slider_container')}>
      <Slider {...settings}>
        {childrenArray.map((child, index) => (
          <div key={index} className={cx('slider_item')}>
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCardComponent;
