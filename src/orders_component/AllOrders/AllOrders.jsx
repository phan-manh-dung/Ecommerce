import React from 'react';
import styles from './AllOrders.module.scss';
import classNames from 'classnames/bind';

import astra from '~/assets/img_Global/astra_red.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const AllOrders = () => {
    return (
        <div className={cx('wrapper_cancelled')}>
            <div className={cx('title')}>
                <span>Đã hủy</span>
                <FontAwesomeIcon icon="fa-solid fa-ban" />
            </div>
            <div className={cx('content')}>
                <div className={cx('content_left')}>
                    <div className={cx('img')}>
                        <img alt="" src={astra} width={80} height={80} />
                    </div>
                    <div className={cx('main_content')}>
                        <div className={cx('main1')} style={{ fontSize: '1.3rem' }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum.
                        </div>
                        <div className={cx('main2')}>
                            <span className={cx('span')}>Shop MD</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content_right')}>
                    <div className={cx('price')}>119 ₫</div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('total_money')}>
                    <div className={cx('title')}>Tổng tiền:</div>
                    <div className={cx('total')}>185.000 ₫</div>
                </div>
                <div className={cx('button')}>
                    <div>Mua lại</div>
                    <div>Xem chi tiết</div>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
