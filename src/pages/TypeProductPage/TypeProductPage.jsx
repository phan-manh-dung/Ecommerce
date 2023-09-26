import React from 'react';
import styles from './TypeProduct.module.scss';
import classNames from 'classnames/bind';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

const TypeProductPage = () => {
    const arr = [
        'Chăm sóc da mặt',
        'Trang điểm ',
        'Chăm sóc cá nhân',
        'Chăm sóc cơ thể',
        'Dược mỹ phẩm',
        'Sản phẩm thiên nhiên & Khác',
    ];
    return (
        <div className={cx('container_type-product')}>
            <div className={cx('wrapper-type')}>
                <div className={cx('type-home')}>Trang chủ</div>
                <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                <span className={cx('type-title')}>Làm Đẹp - Sức Khỏe</span>
            </div>
            <Row>
                <Col xs={0} sm={5}>
                    <div className={cx('wrapper_left')}>
                        <div className={cx('wrapper-category')}>
                            <div className={cx('category')}>Danh mục sản phẩm</div>
                            <div>
                                {arr.map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={19}>
                    <div style={{ backgroundColor: '#fff' }}>ddd</div>
                </Col>
            </Row>
        </div>
    );
};

export default TypeProductPage;
