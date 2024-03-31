import React from 'react';

import styles from './FindPay.module.scss';
import classNames from 'classnames/bind';

import find_pay from '~/assets/img_Global/find_pay.png';

const cx = classNames.bind(styles);

const FindPay = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div>
                    <img alt="find_pay" src={find_pay} width={200} height={200} />
                </div>
                <div style={{ fontSize: '16px' }}>Chưa có đơn hàng</div>
            </div>
        </div>
    );
};

export default FindPay;
