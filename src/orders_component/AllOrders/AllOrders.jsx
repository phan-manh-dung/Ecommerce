import React, { useEffect, useState } from 'react';
import styles from './AllOrders.module.scss';
import classNames from 'classnames/bind';

import find_pay from '~/assets/img_Global/find_pay.png';

import * as OrderService from '~/service/OrderService';
import { useSelector } from 'react-redux';
import { convertPrice } from '~/utils';
import ModalComponent from '~/component/ModalComponent/ModalComponent';

const cx = classNames.bind(styles);

const AllOrders = () => {
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

    return (
        <div className={cx('wrapper_cancelled')}>
            {!orders ? (
                <div className={cx('wrapper')}>
                    <div>
                        <img alt="find_pay" src={find_pay} width={200} height={200} />
                    </div>
                    <div style={{ fontSize: '16px' }}>Chưa có đơn hàng</div>
                </div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={index} className={cx('order')}>
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
                                            {order.orderItems &&
                                                order.orderItems.length > 0 &&
                                                order.orderItems[0].name}
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
                                    <div onClick={modalAbortOrder}>Hủy đơn hàng</div>

                                    <div>Theo dõi đơn</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* modal hủy đơn hàng */}
            <ModalComponent
                footer={null}
                okText="..."
                okType=""
                isOpen={isModalOpen}
                title="Hủy đơn hàng"
                onCancel={handleCancel}
            >
                <div class="style-flex">
                    <span>Bạn chưa có thông tin địa chỉ hoặc chưa chọn sản phẩm</span>
                    <div></div>
                </div>
            </ModalComponent>
        </div>
    );
};

export default AllOrders;
