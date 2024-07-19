import { Card } from 'antd';
import React from 'react';
import { BorderBottomOutlined, StarFilled } from '@ant-design/icons';
import img_now from '../../assets/img_Global/now.png';
import img_genuine from '../../assets/img_Global/genuine.png';
import topdeal from '../../assets/img_Global/topdealsmall.png';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '~/utils';
const cx = classNames.bind(styles);

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, sold, discount, originOfCountry, id } = props;
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        // nhận id của homepage
        navigate(`/product-details/${id}`);
    };
    const coverStyle = {
        border: '1px solid #F0F0F0',
        overflow: 'hidden', // Để che phần border không bị hiển thị ra bên ngoài hình ảnh
    };

    return (
        <div onClick={() => handleDetailsProduct(id)}>
            <Card
                hoverable
                bodyStyle={{ padding: '10px', borderTop: 'none' }}
                style={{ width: 167, marginRight: '10px' }}
                cover={<img alt="img" src={image} style={coverStyle} />}
            >
                <div className={cx('card-container')}>
                    <div className={cx('card-content')}>
                        <div className={cx('wrapper_icon')}>
                            {originOfCountry !== 'vietnamese' && (
                                <div className={cx('genuine')}>
                                    <img alt="top deal" src={topdeal} width={89} height={20} />
                                </div>
                            )}
                            <div className={cx('genuine')}>
                                <img alt="genuine" src={img_genuine} width={89} height={20} />
                            </div>
                        </div>
                        <div className={cx('user_name')}>{name}</div>
                        <div className={cx('user_sold')}>
                            <div className={cx('wrapper_star')}>
                                {rating ? <span>{rating}</span> : <span className={cx('no_rating')}>0</span>}
                                <StarFilled style={{ fontSize: '10px', color: '#ffce3d', padding: '0px 2px' }} />
                            </div>
                            <div> | Đã bán: {sold || 0}</div>
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
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CardComponent;
