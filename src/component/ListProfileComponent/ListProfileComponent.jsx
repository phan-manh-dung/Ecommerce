import React, { useState } from 'react';
import styles from './ListProfile.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);
const ListProfileComponent = ({ index, name, width, height, src }) => {
    const navigate = useNavigate();

    const handleOrder = (name) => {
        if (name === 'Quản lý đơn hàng') {
            navigate('/my-order');
        }
        if (name === 'Thông tin tài khoản') {
            navigate('/profile-user');
        }
        if (name === 'Thông báo của tôi') {
            navigate('/my-notification');
        }
        if (name === 'Quản lý đổi trả') {
            navigate('/lie-manager');
        }
        if (name === 'Sổ địa chỉ') {
            navigate('/my-address');
        }
        if (name === 'Thông tin thanh toán') {
            navigate('/my/pay-information');
        }
        if (name === 'Đánh giá sản phẩm') {
            navigate('/my-review');
        }
        if (name === 'Sản phẩm bạn đã xem') {
            navigate('/my-watched');
        }
        if (name === 'Sản phẩm yêu thích') {
            navigate('/my/favorite-product');
        }
        if (name === 'Nhận xét của tôi') {
            navigate('/my-comment');
        }
        if (name === 'Hỗ trợ khách hàng') {
            navigate('/customer/help');
        }
    };

    return (
        <div className={cx('left_list')} onClick={() => handleOrder(name)}>
            <div className={cx('wrapper_list')}>
                <div style={{ marginRight: '22px' }}>
                    <FontAwesomeIcon icon={src} style={{ width: '18px', height: '18px', color: 'rgb(155,155,155)' }} />
                </div>
                <span style={{ color: 'rgb(0,0,0)', fontSize: '13px' }}>{name}</span>
            </div>
        </div>
    );
};

export default ListProfileComponent;
