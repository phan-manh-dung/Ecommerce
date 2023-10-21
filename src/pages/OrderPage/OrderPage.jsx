import React, { useEffect, useMemo, useState } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import User1 from '~/assets/img_products/dongu1.jpg';
import { Row, Col, Checkbox, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_oto from '~/assets/img_Global/oto.png';
import chart from '~/assets/img_Global/chart.png';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllOrderProduct, removeOrderProduct } from '~/redux/slide/orderSlide';
import { convertPrice } from '~/utils';
import ModalComponent from '~/component/ModalComponent/ModalComponent';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [listChecked, setListChecked] = useState([]);
    const [listCheckedAmount, setListCheckedAmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteOrder = () => {
        dispatch(removeOrderProduct({ idProduct: order?.orderItems[0]?.product }));
    };

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            // nếu đã check rồi
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const handleRemoveAllOrder = () => {
        if (listChecked?.length === order?.orderItems?.length) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };

    const priceMemo = useMemo(() => {
        if (listChecked && order) {
            const selectedItems = order.orderItems.filter((item) => listChecked.includes(item.product));
            const result = selectedItems.reduce((total, current) => {
                return total + current.price * current.amount;
            }, 0);
            return result;
        } else {
            return 0;
        }
    }, [listChecked, order]);

    const discountMemo = useMemo(() => {
        if (listChecked && order) {
            const itemDiscount = order?.orderItems?.filter((item) => listChecked.includes(item.product));
            const result = itemDiscount.reduce((total, current) => {
                return total + current.discount;
            }, 0);
            return result;
        }
    }, [listChecked, order]);

    const totalPrice = useMemo(() => {
        return Number(priceMemo) - Number(priceMemo) * (Number(discountMemo) / 100);
    }, [priceMemo, discountMemo]);

    const handlePayOrder = () => {
        if (!listChecked.length || !(user?.address || user?.city)) {
            setIsModalOpen(true);
        } else {
            navigate('/payment');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={cx('container_order')}>
            <div className={cx('wrapper_order')}>
                <div className={cx('cart')}>
                    <span className={cx('cart-title')}>Giỏ hàng</span>
                    <span>
                        <FontAwesomeIcon icon={faLocationDot} style={{ color: '#999', marginRight: '3px' }} />
                        <span style={{ fontSize: '13px', color: '#808089' }}>Giao đến:</span>
                        <u> {user?.address || user?.city}</u>
                    </span>
                </div>
                <div className={cx('create-row')}>
                    <Row>
                        <Col xs={0} sm={17} style={{ paddingRight: '1%' }}>
                            <div>
                                <div style={{ height: '50px', backgroundColor: '#fff' }}>giu</div>
                                <div className={cx('wrapper_all')}>
                                    <span style={{ width: '36%' }}>
                                        <Checkbox
                                            onChange={handleCheckAll}
                                            checked={listChecked?.length === order?.orderItems?.length}
                                        />
                                        Tất cả ({order?.orderItems?.length}) sản phẩm
                                    </span>
                                    <span>Đơn giá</span>
                                    <span>Số lượng</span>
                                    <span>Thành tiền</span>
                                    <span onClick={handleRemoveAllOrder}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </div>
                                <div className={cx('scrollable-content')}>
                                    {order?.orderItems?.map((orders, index) => {
                                        console.log('check', order);
                                        return (
                                            <div key={index} className={cx('product')}>
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
                                                            <Checkbox
                                                                onChange={onChange}
                                                                value={orders.product}
                                                                checked={listChecked?.includes(orders.product)}
                                                            />
                                                            {/* orders của map để lấy ra từng id chứ k phải order chung */}
                                                        </Col>
                                                        <Col sm={10}>
                                                            <div className={cx('img-content')}>
                                                                <div>
                                                                    <img alt="" width={80} height={80} src={User1} />
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
                                                                {convertPrice(orders?.price)}
                                                                <sup>
                                                                    <u>đ</u>
                                                                </sup>
                                                                <img
                                                                    alt=""
                                                                    src={chart}
                                                                    width={20}
                                                                    height={20}
                                                                    style={{ padding: '0 1%' }}
                                                                />
                                                                <div
                                                                    style={{
                                                                        fontSize: '11px',
                                                                        color: 'rgb(0, 171, 86)',
                                                                    }}
                                                                >
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
                                                            <div style={{ paddingLeft: '2%' }}>
                                                                {convertPrice(orders?.price * orders?.amount)}
                                                                <sup>
                                                                    <u>đ</u>
                                                                </sup>
                                                            </div>
                                                        </Col>
                                                        <Col sm={1}>
                                                            {/* xóa thì phải truyền đi cái id */}
                                                            <div
                                                                style={{ paddingLeft: '62%', cursor: 'pointer' }}
                                                                onClick={() => handleDeleteOrder(order?.product)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className={cx('sale')}>
                                                    <span>
                                                        SHOP KHUYẾN MẠI
                                                        <span
                                                            style={{ paddingLeft: '2%', color: 'rgb(120, 120, 120)' }}
                                                        >
                                                            Vui lòng chọn trước sản phẩm
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
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
                                        {user?.nickname || user?.name} <i className={cx('i')}></i> {user?.phone}
                                    </div>
                                    {/* address */}
                                    <div className={cx('address-detail')}>
                                        <span className={cx('house')}>Nhà</span>
                                        <span style={{ color: 'rgb(128, 128, 137)' }}>{user?.address}</span>
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
                                                {convertPrice(priceMemo)} <sup>đ</sup>
                                            </div>
                                        </li>
                                        <li>
                                            <div>Giảm giá</div>
                                            <div style={{ color: 'black' }}>{discountMemo} %</div>
                                        </li>
                                    </ul>
                                    <div className={cx('pay')}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>Tổng tiền</div>

                                            <div>
                                                <div>
                                                    {totalPrice
                                                        ? convertPrice(totalPrice) + 'đ'
                                                        : 'Vui lòng chọn sản phẩm'}
                                                </div>
                                            </div>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '13px',
                                                color: '#999',
                                                float: 'right',
                                            }}
                                        >
                                            (Đã bao gồm VAT)
                                        </p>
                                    </div>
                                </div>
                                {/* pay */}
                                <div className={cx('button-pay')}>
                                    <div>
                                        <ButtonComponent
                                            onClick={handlePayOrder}
                                            textButton="Mua hàng"
                                            style={{ background: 'rgb(255, 66, 78)', color: '#fff' }}
                                        ></ButtonComponent>

                                        <ModalComponent
                                            footer={null}
                                            okText="..."
                                            okType=""
                                            isOpen={isModalOpen}
                                            title="Thông báo"
                                            onCancel={handleCancel}
                                        >
                                            Bạn chưa mua hàng hoặc chưa có thông tin địa chỉ
                                        </ModalComponent>
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
