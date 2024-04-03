import React from 'react';
import { Col, Radio, Row, Upload } from 'antd';
import { useSelector } from 'react-redux';

import styles from './SuccessLieComponent.module.scss';
import classNames from 'classnames/bind';

import empty from '~/assets/img_Global/empty-order.png';

const cx = classNames.bind(styles);

const SuccessLieComponent = () => {
    return (
        <div className={cx('container_success-lie')}>
            <div className={cx('wrapper_success-lie')}>
                <img alt="empty" src={empty} width={200} height={200} />
                <p>Chưa có đơn hàng</p>
            </div>
        </div>
    );
};

export default SuccessLieComponent;
