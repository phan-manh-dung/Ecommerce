import React from 'react';
import styles from './Payment.module.scss';
import classNames from 'classnames/bind';

import call from '~/assets/img_Global/call.png';
import down from '~/assets/img_Global/muiten_dow.png';
import truck from '~/assets/img_Global/truck.png';
import img_down from '~/assets/img_Global/muiten_dow.png';
import cash from '~/assets/img_Global/cash.png';
import viettel from '~/assets/img_Global/viettel.png';
import momo from '~/assets/img_Global/momo.jpg';
import zalo from '~/assets/img_Global/zalopay.png';
import vnpay from '~/assets/img_Global/vnpay.png';
import doublevisa from '~/assets/img_Global/doublevisa.png';
import manyvisa from '~/assets/img_Global/manyvisa.png';
import atm from '~/assets/img_Global/atm_noi_dia.png';
import asa from '~/assets/img_Global/asa.png';
import chu_t from '~/assets/img_Global/chut.png';
import { Checkbox, Col, Radio, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

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
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <p>Số lượng: x1</p>
                                                        <p
                                                            style={{
                                                                lineHeight: '20px',
                                                                fontWeight: '500',
                                                                fontSize: '14px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            117.000
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('right-content')}>
                                            <div className={cx('wrapper_icon')}>
                                                <div className={cx('icon')}>
                                                    <img alt="xe" src={truck} width={24} height={24} />
                                                </div>
                                                <div className={cx('title_icon')}>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
                                                    minima?
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '2%' }}>
                                        <div>Shop khuyến mãi</div>
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                paddingLeft: '1%',
                                                fontSize: '12px',
                                                color: '#999',
                                            }}
                                        >
                                            Nhập hoặc chọn mã
                                            <FontAwesomeIcon icon={faChevronRight} width={24} height={24} />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('left2')}>
                                    <div className={cx('choose')}>
                                        <span className={cx('content')}>Chọn hình thức thanh toán</span>
                                    </div>
                                    {/* pay 1 */}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio defaultChecked={true} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={cash} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>Thanh toán bằng tiền mặt</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pay 2 */}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={viettel} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>
                                                    Thanh toán bằng ví Viettel Money
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pay 3*/}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={momo} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>Thanh toán bằng ví MoMo</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pay 4 */}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={zalo} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>Thanh toán bằng ví Zalo Pay</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pay 5*/}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={vnpay} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>
                                                    Thanh toán bằng VNPay
                                                    <p style={{ color: '#999', fontSize: '12px' }}>
                                                        Quét mã QR từ ứng dụng ngân hàng
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pay 6 */}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={doublevisa} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>
                                                    Thanh toán bằng thẻ quốc tế
                                                    <p>
                                                        {' '}
                                                        <img alt="tt" src={manyvisa} width={124} height={24} />{' '}
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pay 7 */}
                                    <div className={cx('choose_pay')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Radio />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="the" src={atm} width={32} height={32} />
                                                <span style={{ paddingLeft: '12px' }}>
                                                    Thẻ ATM nội địa / Internet banking
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* button  */}
                                    <div className={cx('choose_add')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ paddingLeft: '8px' }}>
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    width={20}
                                                    height={20}
                                                    color="rgb(11, 116, 229)"
                                                />
                                            </div>
                                            <span style={{ paddingLeft: '12px', color: 'rgb(11, 116, 229)' }}>
                                                Thêm thẻ mới
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={0} sm={7}>
                                <div className={cx('right')}>
                                    {/* //// */}
                                    <div className={cx('address')}>
                                        <div className={cx('address-content')}>
                                            <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)' }}>
                                                Giao tới
                                            </span>
                                            <span>Thay đổi</span>
                                        </div>
                                        <div className={cx('name')}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis,
                                            harum!
                                        </div>
                                        {/* address */}
                                        <div className={cx('address-detail')}>
                                            <span className={cx('house')}>Nhà</span>
                                            <span style={{ color: 'rgb(128, 128, 137)' }}>lorem</span>
                                        </div>
                                    </div>
                                    {/* sale */}
                                    <div className={cx('promotion')}>
                                        <div className={cx('promotion-child')}>
                                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Dũng Khuyến Mãi</span>
                                            <span style={{ color: 'rgb(128, 128, 137)', fontSize: '13px' }}>
                                                Có thể chọn 2
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                padding: '4% 0 0 0',
                                                color: 'rgb(11, 116, 229)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Chọn hoặc nhập mã khuyến mãi khác
                                        </div>
                                    </div>
                                    {/* asa */}
                                    <div className={cx('asa')}>
                                        <div className={cx('asa1')}>
                                            <img alt="asa" src={asa} width={24} height={24} />
                                            <span style={{ marginRight: '40%' }}>
                                                Giảm 81
                                                <sup>
                                                    <u>đ</u>
                                                </sup>
                                                <p style={{ fontSize: '12px', color: '#999' }}>
                                                    Khi dùng 1 ASA của bạn
                                                </p>
                                            </span>
                                            .
                                        </div>
                                        <div className={cx('asa2')}>
                                            <img alt="asa" src={chu_t} width={24} height={24} />
                                            <span style={{ marginRight: '28%' }}>
                                                Chưa áp dụng giảm giá
                                                <sup>
                                                    <u>đ</u>
                                                </sup>
                                                <p style={{ fontSize: '12px', color: '#999' }}>
                                                    Vì sở hữu chưa đủ 1000 xu
                                                </p>
                                            </span>
                                            .
                                        </div>
                                    </div>
                                    {/* request */}
                                    <div className={cx('request')}>
                                        <Checkbox />
                                        <span style={{ paddingLeft: '6%' }}>
                                            Yêu cầu hóa đơn <p>Chỉ có hóa đơn điện tự</p>{' '}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
