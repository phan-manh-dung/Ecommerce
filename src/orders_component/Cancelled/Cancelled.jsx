import React, { useEffect, useState } from 'react';
import styles from './Cancelled.module.scss';
import classNames from 'classnames/bind';

import find_pay from '~/assets/img_Global/find_pay.png';
import icon_sad from '~/assets/img_Global/icon_sad.png';

import * as OrderService from '~/service/OrderService';
import { useSelector } from 'react-redux';
import { convertPrice } from '~/utils';
import ModalComponent from '~/component/ModalComponent/ModalComponent';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Cancelled = () => {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // mở modal

    // tắt modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // mở modal
    const modalAbortOrder = () => {
        setIsModalOpen(true);
    };

    // api delete order

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await OrderService.getAllOrder(user?.access_token);
                if (response.status === 'OK') {
                    setOrders(response.data);
                } else {
                    console.error('Error retrieving orders:', response.message);
                }
            } catch (error) {
                console.error('Error retrieving orders:', error);
            }
        };

        fetchOrders();
    }, [user]);

    // filter lọc chỉ lấy  ra các đơn hàng đã hủy
    const cancelledOrders = orders.filter((order) => order.status === 'cancelled');

    // api mua lại
    const handlePayBack = () => {};

    return (
        <div className={cx('wrapper_cancelled')}>
            {cancelledOrders.length === 0 ? (
                <div className={cx('wrapper')}>
                    <div>
                        <img alt="find_pay" src={find_pay} width={200} height={200} />
                    </div>
                    <div style={{ fontSize: '16px' }}>Chưa có đơn hàng</div>
                </div>
            ) : (
                cancelledOrders.map((order, index) => (
                    <div key={order._id} className={cx('order')}>
                        {/* trạng thái đơn hàng */}
                        <div>
                            <span style={{ paddingRight: '6px', color: '#C0C0C0' }}>Đã hủy</span>
                            <FontAwesomeIcon icon={faBan} color="#C0C0C0" />
                        </div>
                        {/* Phần tử giao diện cho phần thông tin đơn hàng */}
                        <div className={cx('content')}>
                            <div className={cx('content_left')}>
                                <div className={cx('img')}>
                                    {order.orderItems && order.orderItems.length > 0 && (
                                        <img alt="" src={order.orderItems[0].image} width={80} height={80} />
                                    )}
                                </div>
                                <div className={cx('main_content')}>
                                    <div className={cx('main1')} style={{ fontSize: '1.3rem' }}>
                                        {order.orderItems && order.orderItems.length > 0 && order.orderItems[0].name}
                                    </div>
                                    <div className={cx('main2')}>
                                        <span className={cx('span')}>{order.shopName || 'Shop MD'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content_right')}>
                                <div className={cx('price')}>
                                    {order.orderItems &&
                                        order.orderItems.length > 0 &&
                                        convertPrice(order.orderItems[0].price)}{' '}
                                    ₫
                                </div>
                            </div>
                        </div>
                        {/* Phần tử giao diện cho phần footer */}
                        <div className={cx('footer')}>
                            <div className={cx('total_money')}>
                                <div className={cx('title')}>Tổng tiền:</div>
                                <div className={cx('total')}>{convertPrice(order.totalPrice)} ₫</div>
                            </div>
                            <div className={cx('button')}>
                                <div
                                    onClick={() => {
                                        handlePayBack();
                                    }}
                                >
                                    Mua lại
                                </div>
                                <div>Theo dõi đơn</div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cancelled;
