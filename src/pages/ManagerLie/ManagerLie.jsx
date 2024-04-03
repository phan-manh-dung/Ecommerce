import React, { useState } from 'react';
import { Col, Radio, Row, Upload } from 'antd';
import { useSelector } from 'react-redux';

import styles from './ManagerLie.module.scss';
import classNames from 'classnames/bind';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_user from '~/assets/img_Global/user_profile.png';
import astra_reward from '~/assets/img_Global/astra_reward.png';
import astra from '~/assets/img_Global/astra_red.png';

import {
    faBell,
    faBox,
    faClipboard,
    faComment,
    faCreditCard,
    faEnvelope,
    faEye,
    faHeartCirclePlus,
    faKey,
    faLocationDot,
    faPhone,
    faShieldVirus,
    faStarHalfStroke,
    faUser,
    faHeadset,
    faMagnifyingGlass,
    faHome,
    faGift,
    faNoteSticky,
    faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import ListProfileComponent from '~/component/ListProfileComponent/ListProfileComponent';
import AllLieComponent from '~/lies_component/AllLieComponent/AllLieComponent';
import ProcessLieComponent from '~/lies_component/ProcessLieComponent/ProcessLieComponent';
import SuccessLieComponent from '~/lies_component/SuccessLieComponent/SuccessLieComponent';

const cx = classNames.bind(styles);

const ManagerLie = () => {
    const user = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState('all');

    // dữ liệu map
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
        faHeadset,
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
        'Hỗ trợ khách hàng',
    ];

    const clickValue = (value) => {
        setActiveTab(value);
    };

    // Hàm render component dựa trên tab đang được chọn
    const renderComponent = () => {
        switch (activeTab) {
            case 'all':
                return <AllLieComponent />;
            case 'process':
                return <ProcessLieComponent />;
            case 'success':
                return <SuccessLieComponent />;

            default:
                return null;
        }
    };

    return (
        <div className={cx('container_lie')}>
            <div className={cx('wrapper_lie')}>
                <div className={cx('wrapper-type')}>
                    <div className={cx('type-home')}>Trang chủ</div>
                    <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                    <span className={cx('type-title')}>Thông báo của tôi</span>
                </div>
                <Row>
                    <Col xs={0} sm={5}>
                        <div className={cx('container_left')}>
                            <div className={cx('wrapper_left')}>
                                <div className={cx('user')}>
                                    <div className="img">
                                        {user?.avatar ? (
                                            <div>
                                                <img
                                                    className={cx('wrapper_form')}
                                                    alt="img"
                                                    src={user?.avatar}
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <img
                                                    className={cx('wrapper_form')}
                                                    alt=""
                                                    src={img_user}
                                                    style={{ width: '52px' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ paddingLeft: '12px' }}>
                                        <p>Tài khoản của</p>
                                        <p
                                            style={{
                                                fontWeight: 600,
                                                fontSize: '1.6rem',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {user?.name ? user?.nickname : 'Chưa có'}
                                        </p>
                                    </div>
                                </div>
                                {/* list left */}
                                {arrTitleLeft.map((current, index) => {
                                    const icon = arrImage[index % arrImage.length];
                                    if (index === 2) {
                                        return (
                                            <ListProfileComponent key={index} index={index} src={icon} name={current} />
                                        );
                                    }
                                    return <ListProfileComponent key={index} src={icon} name={current} />;
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
                                            <img alt="" src={astra} width={24} height={24} />
                                        </div>
                                        <span style={{ color: 'rgb(155,155,155)' }}>Astra của bạn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className={cx('col')} xs={0} sm={19} style={{ padding: '0 16px' }}>
                        <div className={cx('information')}>Thông báo của tôi</div>
                        <div className={cx('wrapper_manager-lie')}>
                            <div className={cx('list_bar')}>
                                <div
                                    onClick={() => clickValue('all')}
                                    className={cx('style_bar', { active: activeTab === 'all' })}
                                >
                                    Tất cả
                                </div>
                                <div
                                    onClick={() => clickValue('process')}
                                    className={cx('style_bar', { active: activeTab === 'process' })}
                                >
                                    Đang tiến hành
                                </div>
                                <div
                                    onClick={() => clickValue('success')}
                                    className={cx('style_bar', { active: activeTab === 'success' })}
                                >
                                    Đã xong
                                </div>
                            </div>
                            <div>{renderComponent()}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ManagerLie;
