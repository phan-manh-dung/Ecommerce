import React from 'react';

import styles from './Promotion.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Promotion = () => {
    return (
        <div className={cx('img')}>
            <img alt="Không có thông báo" src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg" />
            <p>Bạn chưa có thông báo</p>
            <a href="/">Tiếp tục mua sắm</a>
        </div>
    );
};

export default Promotion;
