import React, { useEffect, useState } from 'react';
import { Col, Radio, Row, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@fortawesome/free-solid-svg-icons';

import styles from './MyOfOrder.module.scss';
import classNames from 'classnames/bind';
import Loading from '~/component/LoadingComponent/Loading';
import ListProfileComponent from '~/component/ListProfileComponent/ListProfileComponent';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_user from '~/assets/img_Global/user_profile.png';
import astra_reward from '~/assets/img_Global/astra_reward.png';
import astra from '~/assets/img_Global/astra_red.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AllOrders from '~/orders_component/AllOrders/AllOrders';
import WaitPay from '~/orders_component/WaitPay/WaitPay';
import Processing from '~/orders_component/Processing/Processing';
import Delivered from '~/orders_component/Delivered/Delivered';
import Transport from '~/orders_component/Transport/Transport';
import Cancelled from '~/orders_component/Cancelled/Cancelled';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const MyOfOrder = () => {
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

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật trạng thái của tab khi người dùng click vào
  };

  // Hàm render component dựa trên tab đang được chọn
  const renderComponent = () => {
    switch (activeTab) {
      case 'all':
        return <AllOrders />;
      case 'wait_pay':
        return <WaitPay />;
      case 'processing':
        return <Processing />;
      case 'transport':
        return <Transport />;
      case 'delivered':
        return <Delivered />;
      case 'cancelled':
        return <Cancelled />;
      default:
        return null;
    }
  };

  return (
    <div className={cx('container_my-order')}>
      <Helmet>
        <title>Đơn hàng của tôi</title>
      </Helmet>
      <div className={cx('wrapper_my-order')}>
        <div className={cx('wrapper-type')}>
          <div className={cx('type-home')}>Trang chủ</div>
          <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
          <span className={cx('type-title')}>Đơn hàng của tôi</span>
        </div>
        <Row>
          <Col xs={0} sm={5}>
            <div className={cx('container_left')}>
              <div className={cx('wrapper_left')}>
                <div className={cx('user')}>
                  <div className="img">
                    {user?.avatar ? (
                      <div>
                        <img className={cx('wrapper_form')} alt="img" src={user?.avatar} width={50} height={50} />
                      </div>
                    ) : (
                      <div>
                        <img className={cx('wrapper_form')} alt="" src={img_user} style={{ width: '52px' }} />
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
                    return <ListProfileComponent key={index} index={index} src={icon} name={current} />;
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
          <Col sx={0} sm={19} style={{ padding: '0 16px' }}>
            <div className={cx('information')}>Đơn hàng của tôi</div>
            <div className={cx('container_order')}>
              <div className={cx('list')}>
                <Row style={{ height: '42px', backgroundColor: '#fff' }}>
                  <Col
                    xs={0}
                    sm={4}
                    className={cx('col', { active: activeTab === 'all' })}
                    onClick={() => handleTabClick('all')}
                  >
                    <div>Tất cả đơn</div>
                  </Col>
                  <Col
                    xs={0}
                    sm={4}
                    className={cx('col', { active: activeTab === 'wait_pay' })}
                    onClick={() => handleTabClick('wait_pay')}
                  >
                    <div>Chờ thanh toán</div>
                  </Col>
                  <Col
                    xs={0}
                    sm={4}
                    className={cx('col', { active: activeTab === 'processing' })}
                    onClick={() => handleTabClick('processing')}
                  >
                    <div>Đang xử lí</div>
                  </Col>
                  <Col
                    xs={0}
                    sm={4}
                    className={cx('col', { active: activeTab === 'transport' })}
                    onClick={() => handleTabClick('transport')}
                  >
                    <div>Đang vận chuyển</div>
                  </Col>
                  <Col
                    xs={0}
                    sm={4}
                    className={cx('col', { active: activeTab === 'delivered' })}
                    onClick={() => handleTabClick('delivered')}
                  >
                    <div>Đã giao</div>
                  </Col>
                  <Col
                    xs={0}
                    sm={4}
                    className={cx('col', { active: activeTab === 'cancelled' })}
                    onClick={() => handleTabClick('cancelled')}
                  >
                    <div>Đã hủy</div>
                  </Col>
                </Row>
              </div>
              <div className={cx('search')}>
                <div>
                  <FontAwesomeIcon icon={faMagnifyingGlass} width={40} color="#808089" />
                </div>
                <input type="text" placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm" />
                <div className={cx('find')}>Tìm đơn hàng</div>
              </div>
              {/* componet */}
              <div className={cx('slide-in')}>{renderComponent()}</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyOfOrder;
