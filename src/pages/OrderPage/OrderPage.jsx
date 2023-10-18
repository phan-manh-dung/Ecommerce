import React, { useMemo, useState } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { Row, Col, Checkbox, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_oto from '~/assets/img_Global/oto.png';
import chart from '~/assets/img_Global/chart.png';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    console.log('order', order);
    const [numProduct, setNumProduct] = useState(1);
    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1);
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1);
            }
        }
    };
    return (
        <div className={cx('container_order')}>
            <div className={cx('wrapper_order')}>
                <div className={cx('cart')}>
                    <span className={cx('cart-title')}>Giỏ hàng</span>
                    <span>Giao đến: Dung</span>
                </div>
                <div className={cx('create-row')}>
                    <Row>
                        <Col xs={0} sm={17} style={{ paddingRight: '1%' }}>
                            <div>
                                <div style={{ height: '50px', backgroundColor: '#fff' }}>giu</div>
                                <div className={cx('wrapper_all')}>
                                    <span style={{ width: '36%' }}>
                                        <Checkbox /> Tất cả ({order?.orderItems?.length}) sản phẩm
                                    </span>
                                    <span>Đơn giá</span>
                                    <span>Số lượng</span>
                                    <span>Thành tiền</span>
                                    <span>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </div>
                                {order?.orderItems?.map((orders) => {
                                    return (
                                        <div className={cx('product', 'scrollable-content')}>
                                            <div className={cx('type')}>
                                                <div>
                                                    <Checkbox /> Type
                                                </div>
                                                <img src={img_right_arrow} alt="right" width={18} height={18} />
                                                <div>{orders?.type || 'Đồ'}</div>
                                            </div>
                                            <div className={cx('wrapper_content')}>
                                                <Row style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Col sm={1}>
                                                        <Checkbox />
                                                    </Col>
                                                    <Col sm={10}>
                                                        <div className={cx('img-content')}>
                                                            <div>
                                                                <img alt="" width={80} height={80} />{' '}
                                                            </div>
                                                            <div className={cx('img-title')}>
                                                                <span className={cx('title_content')}>
                                                                    {orders?.name}
                                                                    <div
                                                                        style={{
                                                                            color: '#999',
                                                                            padding: '1% 0',
                                                                            fontSize: '11px',
                                                                        }}
                                                                    >
                                                                        100% chi tiết
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        <img
                                                                            alt="oto"
                                                                            src={img_oto}
                                                                            width={32}
                                                                            height={16}
                                                                        />
                                                                        <span style={{ paddingLeft: '2%' }}>
                                                                            Giao hàng siêu tốc
                                                                        </span>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col sm={5}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {orders?.price}
                                                            <img
                                                                alt=""
                                                                src={chart}
                                                                width={20}
                                                                height={20}
                                                                style={{ padding: '0 1%' }}
                                                            />
                                                            <div style={{ fontSize: '11px', color: 'rgb(0, 171, 86)' }}>
                                                                Giảm {orders?.discount || 10} %
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <div className={cx('quantity')}>
                                                            <div className={cx('wrapper_add')}>
                                                                <div className={cx('input')}>
                                                                    <InputNumber
                                                                        value={orders?.amount}
                                                                        readOnly
                                                                        style={{ width: '30%', border: 'none' }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <div style={{ paddingLeft: '2%' }}>{orders?.price}</div>
                                                    </Col>
                                                    <Col sm={1}>
                                                        <div style={{ paddingLeft: '62%' }}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className={cx('sale')}>
                                                <span>
                                                    SHOP KHUYẾN MẠI
                                                    <span style={{ paddingLeft: '2%', color: 'rgb(120, 120, 120)' }}>
                                                        Vui lòng chọn trước sản phẩm
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col xs={0} sm={7} style={{ paddingRight: '1%' }}>
                            <div className={cx('wrapper-right')}>
                                {/* /// */}
                                <div className={cx('address')}>
                                    <div className={cx('address-content')}>
                                        <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)' }}>Giao tới</span>
                                        <span>Thay đổi</span>
                                    </div>
                                    <div className={cx('name')}>
                                        Phan mạnh Dũng <i className={cx('i')}></i> 0373286662{' '}
                                    </div>
                                    {/* address */}
                                    <div className={cx('address-detail')}>
                                        <span className={cx('house')}>Nhà</span>
                                        <span style={{ color: 'rgb(128, 128, 137)' }}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cumque
                                            autem. Cumque doloremque est, enim id officia fugit vero incidunt!
                                        </span>
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
                                    <div style={{ padding: '4% 0 0 0', color: 'rgb(11, 116, 229)', cursor: 'pointer' }}>
                                        Chọn hoặc nhập mã khuyến mãi khác
                                    </div>
                                </div>
                                {/* price */}
                                <div className={cx('price')}>
                                    <ul>
                                        <li>
                                            <div>Tạm tính</div>
                                            <div style={{ color: 'black' }}>
                                                120 <sup>đ</sup>
                                            </div>
                                        </li>
                                        <li>
                                            <div>Giảm giá</div>
                                            <div style={{ color: 'black' }}>
                                                20 <sup>đ</sup>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={cx('pay')}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>Tổng tiền</div>
                                            <div>
                                                <div> Vui lòng chọn sản phẩm</div>
                                                <p style={{ fontSize: '13px', color: '#999' }}>(Đã bao gồm VAT)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* pay */}
                                <div className={cx('button-pay')}>
                                    <div>
                                        <ButtonComponent
                                            textButton="Mua hàng"
                                            style={{ background: 'rgb(255, 66, 78)', color: '#fff' }}
                                        />
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

export default OrderPage;
