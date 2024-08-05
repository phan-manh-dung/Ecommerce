import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import * as ProductService from '~/service/ProductService';

import { StarFilled } from '@ant-design/icons';
import { useInView } from 'react-intersection-observer';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '~/utils';
const cx = classNames.bind(styles);

const arrImageWeb = {
  img_now: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722594961/sc3jl7zzyjd49gdomjkh.png',
  img_genuine: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722594960/s7ewizniyyrvevtybvq3.png',
  topdeal: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722594960/flxhvjtghd8v5yfcvhpo.png',
};

const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, sold, discount, originOfCountry, id } = props;
  const navigate = useNavigate();
  const [commentsDatabase, setCommentsDatabase] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true }); // trigger chỉ gọi api 1 lần duy nhất

  useEffect(() => {
    if (inView) {
      const fetchComments = async () => {
        try {
          const response = await ProductService.getVoteDetail(id);
          if (response.status === 'OK') {
            setCommentsDatabase(response.data);
          }
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchComments();
    }
  }, [inView, id]);

  // tính sao trung bình
  const caculatorRating = () => {
    try {
      if (commentsDatabase.length === 0) {
        return 0;
      }

      const totalRating = commentsDatabase.reduce((acc, item) => {
        return acc + (typeof item.rating === 'number' ? item.rating : 0);
      }, 0);

      const totalComment = commentsDatabase.length;
      const resultTotal = totalRating / totalComment;

      return resultTotal;
    } catch (error) {
      console.error('Error calculating rating:', error);
      return 0;
    }
  };
  const averageRating = caculatorRating();

  const handleDetailsProduct = (id) => {
    // nhận id của homepage
    navigate(`/product-details/${id}`);
  };
  const coverStyle = {
    border: '1px solid #F0F0F0',
    overflow: 'hidden', // Để che phần border không bị hiển thị ra bên ngoài hình ảnh
  };

  return (
    <div onClick={() => handleDetailsProduct(id)} ref={ref}>
      <Card
        hoverable
        bodyStyle={{ padding: '10px', borderTop: 'none' }}
        style={{ width: 167, marginRight: '10px' }}
        cover={<img loading="lazy" alt="img" src={image} style={coverStyle} />}
      >
        <div className={cx('card-container')}>
          <div className={cx('card-content')}>
            <div className={cx('wrapper_icon')}>
              {originOfCountry !== 'vietnamese' && (
                <div className={cx('genuine')}>
                  <img loading="lazy" alt="top deal" src={arrImageWeb.topdeal} width={89} height={20} />
                </div>
              )}
              <div className={cx('genuine')}>
                <img loading="lazy" alt="genuine" src={arrImageWeb.img_genuine} width={89} height={20} />
              </div>
            </div>
            <div className={cx('user_name')}>{name}</div>
            <div className={cx('user_sold')}>
              <div className={cx('wrapper_star')}>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <StarFilled
                      className={cx('star_icon')}
                      key={index}
                      style={{
                        fontSize: '1rem',
                        color: index < Math.round(averageRating) ? '#ffce3d' : 'gray',
                        width: 11,
                        height: 11,
                      }}
                    />
                  ))}
              </div>
              <div style={{ fontSize: '1.2rem' }}> | Đã bán: {sold || 0}</div>
            </div>

            <div className={cx('user_wrapper-price')}>
              <div className={cx('user_price')}>
                {convertPrice(price)}
                <sup>
                  <u>đ</u>
                </sup>
              </div>

              <div className={cx('user_discount')}>
                <span>{discount}%</span>
              </div>
            </div>

            <div className={cx('user_speed')}>
              <img loading="lazy" alt="now" src={arrImageWeb.img_now} width={32} height={16} />
              <span className={cx('speed_title')}>Giao hàng nhanh</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
