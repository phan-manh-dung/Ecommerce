import React from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import {
    faBell,
    faBox,
    faClipboard,
    faComment,
    faCreditCard,
    faEye,
    faHeartCirclePlus,
    faLocationDot,
    faStarHalfStroke,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import ListProfileComponent from '~/component/ListProfileComponent/ListProfileComponent';

import img_user from '~/assets/img_Global/user_profile.png';
import astra_reward from '~/assets/img_Global/astra_reward.png';
import tiki360 from '~/assets/img_Global/tiki360.png';
import astra from '~/assets/img_Global/astra_red.png';
import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import avatar_blue from '~/assets/img_Global/avatar_blue.png';
import Input from 'antd/es/input/Input';

const cx = classNames.bind(styles);

const ProfilePage = () => {
    const arrImage = [
        faUser,
        faBell,
        faClipboard,
        faBox,
        faLocationDot,
        faCreditCard,
        faComment,
        faEye,
        faHeartCirclePlus,
        faStarHalfStroke,
    ];
    const arrTitleLeft = [
        'Thông tin tài khoản',
        'Thông báo của tôi',
        'Quản lý đơn hàng',
        'Quản lý đổi trả',
        'Sổ địa chỉ',
        'Thông tin thanh toán',
        'Đánh giá sản phẩm',
        'Sản phẩm bạn đã xem',
        'Sản phẩm yêu thích',
        'Nhận xét của tôi',
    ];
    return (
        <div className={cx('container_profile')}>
            <div className={cx('wrapper_profile')}>
                <div className={cx('wrapper-type')}>
                    <div className={cx('type-home')}>Trang chủ</div>
                    <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                    <span className={cx('type-title')}>Làm Đẹp - Sức Khỏe</span>
                </div>
                <Row>
                    <Col xs={0} sm={6}>
                        <div className={cx('container_left')}>
                            <div className={cx('wrapper_left')}>
                                <div className={cx('user')}>
                                    <div className="img">
                                        <img alt="" src={img_user} width={45} style={{ borderRadius: '50%' }} />
                                    </div>
                                    <div style={{ paddingLeft: '12px' }}>
                                        <p>Tài khoản của</p>
                                        <p style={{ fontWeight: 600, fontSize: '1.6rem' }}>Mạnh Dũng</p>
                                    </div>
                                </div>
                                {/* list left */}
                                {arrTitleLeft.map((current, index) => {
                                    const icon = arrImage[index % arrImage.length];
                                    return <ListProfileComponent src={icon} name={current} />;
                                })}
                                {/* list left 2 */}
                                <div className={cx('left_list')}>
                                    <a href="/" className={cx('wrapper_list')}>
                                        <div style={{ marginRight: '16px' }}>
                                            <img alt="" src={astra_reward} width={24} height={24} />
                                        </div>
                                        <span style={{ color: 'rgb(155,155,155)' }}>Astra Reward</span>
                                    </a>
                                </div>
                                <div className={cx('left_list')}>
                                    <a href="/" className={cx('wrapper_list')}>
                                        <div style={{ marginRight: '16px' }}>
                                            <img alt="" src={tiki360} width={24} height={24} />
                                        </div>
                                        <span style={{ color: 'rgb(155,155,155)' }}>Hợp đồng bảo hiểm</span>
                                    </a>
                                </div>
                                <div className={cx('left_list')}>
                                    <a href="/" className={cx('wrapper_list')}>
                                        <div style={{ marginRight: '16px' }}>
                                            <img alt="" src={astra} width={24} height={24} />
                                        </div>
                                        <span style={{ color: 'rgb(155,155,155)' }}>Astra của bạn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={18}>
                        <div className={cx('information')}>Thông tin tài khoản</div>
                        <div className={cx('container_right')}>
                            <div className={cx('wrapper_right')}>
                                <div className={cx('wrapper_content')}>
                                    <Row>
                                        <Col xs={0} sm={12}>
                                            <div className={cx('wrapper_right-left')}>
                                                <div className={cx('right-left')}>
                                                    <span className={cx('info-title')}>Thông tin cá nhân</span>
                                                </div>
                                                <div className={cx('form-info')}>
                                                    <div className={cx('wrapper_form')}>
                                                        <img alt="img" src={avatar_blue} width={50} height={50} />
                                                    </div>
                                                    <div className={cx('wrapper_input')}>
                                                        <div
                                                            style={{
                                                                alignItems: 'center',
                                                                display: 'flex',
                                                                justifyContent: 'space-around',
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ paddingRight: '40px' }}>Họ & tên</label>
                                                            </div>
                                                            <div>
                                                                <Input style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                alignItems: 'center',
                                                                display: 'flex',
                                                                justifyContent: 'space-around',
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ paddingRight: '40px' }}>Họ & tên</label>
                                                            </div>
                                                            <div>
                                                                <Input style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={0} sm={12}>
                                            <div className={cx('wrapper_right-right')}>
                                                <div className="right-right"></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProfilePage;
