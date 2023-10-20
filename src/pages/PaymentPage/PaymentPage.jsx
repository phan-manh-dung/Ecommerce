import React from 'react';
import styles from './Payment.module.scss';
import classNames from 'classnames/bind';

import call from '~/assets/img_Global/call.png';
import down from '~/assets/img_Global/muiten_dow.png';
import { Col, Radio, Row } from 'antd';

const cx = classNames.bind(styles);

const PaymentPage = () => {
    return (
        <div className={cx('container_payment')}>
            <div className={cx('wrapper_payment')}>
                <div className={cx('title')}>
                    <span>Thanh toán</span>
                    <div>
                        <img alt="call" src={call} width={185} height={56} />
                    </div>
                </div>
                {/* content */}
                <div className={cx('container_content')}>
                    <div className={cx('wrapper_content')}>
                        <Row>
                            <Col xs={0} sm={17}>
                                <div className={cx('left')}>
                                    <div className={cx('choose')}>
                                        <span className={cx('content')}>Chọn hình thức giao hàng</span>
                                    </div>
                                    {/* petit */}
                                    <div className={cx('petit')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio defaultChecked={true} />
                                            <span
                                                style={{ padding: '0 1%', fontSize: '13px', color: 'rgb(30, 30, 30)' }}
                                            >
                                                Giao tiết kiệm
                                            </span>
                                            <div className={cx('down')}>-25K</div>
                                        </div>
                                        <div className={cx('down_img')}>
                                            <img alt="" src={down} width={32} />
                                        </div>
                                    </div>
                                    {/* product */}
                                    <div className={cx('product')}>
                                        <div className={cx('left-content')}>
                                            <div className={cx('title-left')}>
                                                <span style={{ fontSize: '12px', lineHeight: '16px' }}>
                                                    GIAO TIẾT KIỆM
                                                </span>
                                                <span>
                                                    7.000 <sup>đ</sup>{' '}
                                                </span>
                                            </div>
                                            <div className={cx('content_left')}>
                                                <div>
                                                    <img alt="" src="" width={48} height={48} />
                                                </div>
                                                <div className={cx('noidung')}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                    Consequatur, doloribus!
                                                    <p>Số lượng: x1</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('right-content')}></div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={0} sm={7}>
                                1
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
