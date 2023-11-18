import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './OrderSuccess.module.scss';
import classNames from 'classnames/bind';
import call from '~/assets/img_Global/call.png';
import { Col, Row } from 'antd';
import { convertPrice } from '~/utils';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import donu from '~/assets/img_products/dongu4.jpg';
import ch_play from '~/assets/img_Global/chplay.png';
import app_store from '~/assets/img_Global/appstore.png';
const cx = classNames.bind(styles);

const OrderSuccess = () => {
    const order = useSelector((state) => state.order);
    const { state } = useLocation();
    const priceProduct = state?.totalPriceMemo;
    const id = order?.orderItems[0]?.product;
    return (
        <div className={cx('wrapper_order')}>
            <div className={cx('container_order')}>
                <div className={cx('title')}>
                    <span>Shop MD</span>
                    <div>
                        <img alt="call" src={call} width={185} height={56} />
                    </div>
                </div>
                {/* main */}
                <div className={cx('main')}>
                    <Row>
                        <Col sm={15}>
                            <div className={cx('title-content')}>
                                <div className={cx('title-content_top')}>
                                    <div>
                                        <img
                                            alt="anh"
                                            width={150}
                                            height={150}
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/tiki-mascot-congrat.svg"
                                        />
                                    </div>
                                    <div>
                                        <h1 className={cx('content_1')}>Yay, đặt hàng thành công!</h1>
                                        <h3 className={cx('content_2')}>
                                            Chuẩn bị tiền mặt {convertPrice(priceProduct)} VND
                                        </h3>
                                    </div>
                                </div>
                                <div className={cx('wrapper-bottom')}>
                                    <div className={cx('content_bottom')}>
                                        <div className={cx('bottom-title')}>Phương thức thanh toán</div>
                                        <div className={cx('bottom-title')}>Thanh toán tiền mặt</div>
                                    </div>
                                    <div className={cx('content_bottom')}>
                                        <div className={cx('bottom-title')}>Tổng cộng</div>
                                        <div className={cx('bottom-title', 'price')}>
                                            {convertPrice(priceProduct)} <sup>đ</sup>
                                        </div>
                                    </div>
                                </div>
                                <a href="/">
                                    <div className={cx('back_home')}>
                                        <ButtonComponent
                                            textButton="Quay trở về trang chủ"
                                            styleTextButton={{ color: 'rgb(23,128,231)' }}
                                        />
                                    </div>
                                </a>
                            </div>
                        </Col>
                        <Col sm={9}>
                            <div className={cx('container_wrapper-right')}>
                                <div className={cx('wrapper_right')}>
                                    <div className={cx('wrapper_1')}>
                                        <div className={cx('container_wrapper')}>
                                            <span className={cx('id_product')}>Mã đơn hàng: {id}</span>
                                            <span
                                                className={cx('view-product')}
                                                style={{ color: 'rgb(56,129,230)', cursor: 'pointer' }}
                                            >
                                                Xem đơn hàng
                                            </span>
                                        </div>
                                    </div>
                                    {/* wrapper 2 */}
                                    <div className={cx('wrapper_2')}>
                                        <div>
                                            <span style={{ fontSize: '12px', color: 'rgb(93,93,97)' }}>
                                                Giao thứ 4 , trước 19h , 15/11
                                            </span>
                                        </div>
                                        <div className={cx('product_content')}>
                                            <div>
                                                <img
                                                    alt="product"
                                                    src={order?.orderItems[0]?.image}
                                                    height={48}
                                                    width={48}
                                                />
                                            </div>
                                            <div
                                                className={cx('title_child')}
                                                style={{ color: 'rgb(144,144,156)', fontSize: '13px' }}
                                            >
                                                quần áo nữ gia dụng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* wrapper 3 */}
                                <div className={cx('wrapper_ch-play')}>
                                    <div>
                                        <span style={{ fontWeight: 600 }}>Mua sắm tiết kiệm hơn trên ứng dụng MD</span>
                                    </div>
                                    <div className={cx('wrapper_img')}>
                                        <img alt="app_store" src={app_store} width={120} height={40} />
                                        <img alt="ch_play" src={ch_play} width={120} height={40} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
