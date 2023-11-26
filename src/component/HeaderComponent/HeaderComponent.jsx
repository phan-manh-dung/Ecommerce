import React, { useState } from 'react';
import styles from './HeaderComponent.module.scss';
import classNames from 'classnames/bind';
import { Badge, Col, Popover, Row } from 'antd';
import InputSearch from '../InputSearch/InputSearch';
import logo_shop from '../../assets/img_Global/logoshop.png';
import logo_home from '../../assets/img_Global/home.png';
import logo_user from '../../assets/img_Global/user.png';
import logo_astra from '../../assets/img_Global/astra.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '~/service/UserService';
import { resetUser } from '~/redux/slide/userSlide';
import { searchProduct } from '../../redux/slide/productSlide';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [search, setSearch] = useState('');
    const handleNavigate = () => {
        navigate('/sign-in');
    };
    const handleLogOut = async () => {
        setLoading(true);
        await UserService.logOutUser();
        dispatch(resetUser());
        setLoading(false);
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    const content = (
        <div className={cx('content-header')}>
            <p
                onClick={() => {
                    navigate('/profile-user');
                }}
            >
                Thông tin người dùng
            </p>
            {user?.isAdmin && (
                <p
                    onClick={() => {
                        navigate('/system/admin');
                    }}
                >
                    Quản lí hệ thống
                </p>
            )}
            <p
                onClick={handleLogOut}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                Log out
                <FontAwesomeIcon icon={faRightFromBracket} />
            </p>
        </div>
    );

    return (
        <div className={cx('container_header')}>
            <div className={cx('wrapper_header')}>
                <Row className={cx('wrapper_row')}>
                    <Col span={6} className={cx('row_left')}>
                        <img style={{ width: '20%', height: '100%' }} src={logo_shop} alt="logo" />
                    </Col>
                    {!isHiddenSearch && (
                        <Col span={8}>
                            <InputSearch onChange={onSearch} />
                        </Col>
                    )}
                    <Col span={10}>
                        <div className={cx('row_right')}>
                            <div className={cx('row_right-list')}>
                                <img src={logo_home} alt="home" style={{ width: '24px', height: '24px' }} />
                                <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingLeft: '5px' }}>
                                    <a href="/" style={{ textDecoration: 'none', color: '#999' }}>
                                        Trang chủ
                                    </a>
                                </span>
                            </div>
                            <div
                                className={cx('row_right-list')}
                                style={{ width: '15%', justifyContent: 'space-between', display: 'flex' }}
                            >
                                <img src={logo_astra} alt="astra" style={{ width: '24px', height: '24px' }} />
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: 'rgb(128, 128, 137)',
                                        paddingLeft: '5px',
                                    }}
                                >
                                    Astra
                                </span>
                            </div>
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="hover">
                                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                            {user?.nickname || user?.name}
                                        </div>
                                    </Popover>
                                </>
                            ) : (
                                <div className={cx('row_right-list')} onClick={handleNavigate}>
                                    <img src={logo_user} alt="user" style={{ width: '24px', height: '24px' }} />
                                    <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingLeft: '5px' }}>
                                        Đăng nhập
                                    </span>
                                </div>
                            )}
                            {!isHiddenCart && (
                                <div
                                    className={cx('row_right-list')}
                                    onClick={() => navigate('/order')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span
                                        style={{ fontSize: '14px', color: 'rgb(128, 128, 137)', paddingRight: '5px' }}
                                    >
                                        Giỏ hàng
                                    </span>
                                    <Badge count={order?.orderItems?.length} size="small">
                                        <ShoppingCartOutlined style={{ width: '24px', height: '24px' }} />
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default HeaderComponent;
