import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import styles from './WatchProduct.module.scss';
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
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const WatchProduct = () => {
    const user = useSelector((state) => state.user);

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

    return (
        <div className={cx('container_watch')}>
            <Helmet>
                <title>Sản phẩm bạn đã xem</title>
            </Helmet>
            <div className={cx('wrapper_watch')}>
                <div className={cx('wrapper-type')}>
                    <div className={cx('type-home')}>Trang chủ</div>
                    <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                    <span className={cx('type-title')}>Sản phẩm đã xem</span>
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
                        <div className={cx('information')}>Sản phẩm đã xem </div>
                        <div className={cx('wrapper_right')}>
                            <div className={cx('element')}>
                                <img
                                    alt=""
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg"
                                    width={200}
                                />
                                <div>Bạn chưa xem sản phẩm nào. Mua sắm thôi!</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default WatchProduct;
