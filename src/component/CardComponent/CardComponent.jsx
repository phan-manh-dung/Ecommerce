import { Card } from 'antd';
import React from 'react';
import { StarFilled } from '@ant-design/icons';
import laptop1 from '../../assets/img_products/laptop1.png';
import img_now from '../../assets/img_Global/now.png';
import img_genuine from '../../assets/img_Global/genuine.png';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '~/utils';
const cx = classNames.bind(styles);

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, sold, discount, id } = props;
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        // nhận id của homepage
        navigate(`/product-details/${id}`);
    };
    return (
        <div onClick={() => handleDetailsProduct(id)}>
            <Card
                hoverable
                bodyStyle={{ padding: '10px' }}
                style={{ width: 167, marginRight: '10px' }}
                cover={<img alt="laptop1" src={image} />}
            >
                <div className={cx('genuine')}>
                    <img alt="genuine" src={img_genuine} width={89} height={20} />
                </div>
                <div className={cx('user_name')}>{name}</div>
                <div className={cx('user_sold')}>
                    {rating} <StarFilled style={{ fontSize: '10px', color: '#ffce3d' }} /> | Đã bán: {sold || 0}
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
                    <img alt="now" src={img_now} width={32} height={16} />
                    <span className={cx('speed_title')}>Giao hàng nhanh</span>
                </div>
            </Card>
        </div>
    );
};

export default CardComponent;
