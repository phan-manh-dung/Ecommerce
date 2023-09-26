import React from 'react';
import styles from './Assistant.module.scss';
import classNames from 'classnames/bind';

import img_truck from '~/assets/img_Global/truck.png';
import img_user_love from '~/assets/img_Global/user_love.png';
import img_protected from '~/assets/img_Global/protected.png';
import img_right_arrow from '~/assets/img_Global/right_arrow.png';

const cx = classNames.bind(styles);

const AssistantComponent = () => {
    return (
        <div className={cx('container_assistant')}>
            <div className={cx('wrapper_assistant')}>
                <div className={cx('wrapper_div')}>
                    <img src={img_protected} alt="protected" width={24} height={24} />
                    <span className={cx('assistant_title')}>100% hàng chính hãng</span>
                </div>
                <div className={cx('wrapper_div')}>
                    <img src={img_user_love} alt="protected" width={24} height={24} />
                    <span className={cx('assistant_title')}>Trợ lý cá nhân</span>
                </div>
                <div className={cx('wrapper_div')}>
                    <img src={img_truck} alt="protected" width={24} height={24} />
                    <span className={cx('assistant_title')}>Giao nhanh & đúng hẹn</span>
                </div>
            </div>
            <div className={cx('assurance')}>
                <div>An tâm mua sắm</div>
                <img alt="right_arrow" src={img_right_arrow} width={24} height={24} />
            </div>
        </div>
    );
};

export default AssistantComponent;
