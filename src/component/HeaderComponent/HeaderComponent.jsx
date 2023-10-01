import React from 'react';
import styles from './HeaderComponent.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import InputSearch from '../InputSearch/InputSearch';
import logo_shop from '../../assets/img_Global/logoshop.png';
import logo_home from '../../assets/img_Global/home.png';
import logo_user from '../../assets/img_Global/user.png';
import logo_cart from '../../assets/img_Global/cart.png';
import logo_astra from '../../assets/img_Global/astra.png';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderComponent() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/sign-in');
    };

    return (
        <div className={cx('container_header')}>
            <div className={cx('wrapper_header')}>
                <Row className={cx('wrapper_row')}>
                    <Col span={6} className={cx('row_left')}>
                        <img style={{ width: '20%', height: '100%' }} src={logo_shop} alt="logo" />
                    </Col>
                    <Col span={8}>
                        <InputSearch />
                    </Col>
                    <Col span={10}>
                        <div className={cx('row_right')}>
                            <div className={cx('row_right-list')}>
                                <img src={logo_home} alt="home" style={{ width: '24px', height: '24px' }} />
                                <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingLeft: '5px' }}>
                                    Trang chủ
                                </span>
                            </div>
                            <div className={cx('row_right-list')} onClick={handleNavigate}>
                                <img src={logo_user} alt="user" style={{ width: '24px', height: '24px' }} />
                                <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingLeft: '5px' }}>
                                    Đăng nhập
                                </span>
                            </div>
                            <div className={cx('row_right-list')}>
                                <img src={logo_astra} alt="astra" style={{ width: '24px', height: '24px' }} />
                                <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingLeft: '5px' }}>
                                    Astra
                                </span>
                            </div>
                            <div className={cx('row_right-list')}>
                                <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingRight: '5px' }}>
                                    Giỏ hàng
                                </span>
                                <img src={logo_cart} alt="cart" style={{ width: '24px', height: '24px' }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default HeaderComponent;
