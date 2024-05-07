import React from 'react';

import styles from './WaitPay.module.scss';
import classNames from 'classnames/bind';

import FindPay from '~/component/FindPay/FindPay';

const cx = classNames.bind(styles);

const WaitPay = () => {
    return <FindPay />;
};

export default WaitPay;
