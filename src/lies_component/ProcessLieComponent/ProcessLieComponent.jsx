import React from 'react';
import { Col, Radio, Row, Upload } from 'antd';
import { useSelector } from 'react-redux';

import empty from '~/assets/img_Global/empty-order.png';

import styles from './ProcessLieComponent.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const ProcessLieComponent = () => {
    return (
        <div className={cx('container_process')}>
            <div className={cx('wrapper_process')}>
                <img alt="img" src={empty} width={200} height={200} />
                <p>Chưa có đơn hàng</p>
            </div>
        </div>
    );
};

export default ProcessLieComponent;
