import React from 'react';
import styles from './SlideCardComponent.module.scss';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

const SliderCardComponent = ({ children, rtl = false }) => {
  const childrenArray = React.Children.toArray(children);
  // Kiểm tra số lượng sản phẩm
  const hasSingleProduct = childrenArray.length === 1;
  console.log('hasSingleProduct', hasSingleProduct);
  const midPoint = Math.ceil(childrenArray.length / 2);
  const firstHalf = childrenArray.slice(0, midPoint);
  const secondHalf = childrenArray.slice(midPoint);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: hasSingleProduct ? 1 : 5,
    slidesToScroll: hasSingleProduct ? 1 : 3,
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
          slidesToShow: hasSingleProduct ? 1 : 3, // Điều chỉnh cho breakpoint 900
          slidesToScroll: hasSingleProduct ? 1 : 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: hasSingleProduct ? 1 : 2, // Điều chỉnh cho breakpoint 600
          slidesToScroll: hasSingleProduct ? 1 : 1,
        },
      },
    ],
  };

  // Nếu có duy nhất 1 sản phẩm và ở màn hình nhỏ hơn 600px
  if (window.innerWidth <= 600) {
    if (hasSingleProduct) {
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
    }

    // Nếu có nhiều sản phẩm, chia thành 2 hàng
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
