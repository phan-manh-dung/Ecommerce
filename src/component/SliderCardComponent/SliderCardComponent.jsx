import React from 'react';
import styles from './SlideCardComponent.module.scss';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

const SliderCardComponent = ({ children, rtl = false }) => {
  const childrenCount = React.Children.count(children);

  if (childrenCount <= 1) {
    return (
      <div className={cx('single_item')}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={cx('slider_item')}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5, //  Số lượng ảnh được hiển thị cùng một lúc là
    slidesToScroll: 3, // Số lượng ảnh sẽ cuộn qua mỗi lần là .
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    lazyLoad: 'ondemand',
    cssEase: 'ease-in-out',
    rtl: rtl,
  };

  return (
    <div className={cx('slider_container')}>
      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={cx('slider_item')}>
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCardComponent;
