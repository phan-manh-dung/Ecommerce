import React, { useEffect, useState } from 'react';
import styles from './AllOrders.module.scss';
import classNames from 'classnames/bind';

import find_pay from '~/assets/img_Global/find_pay.png';
import icon_sad from '~/assets/img_Global/icon_sad.png';
import xe_xanh from '~/assets/img_Global/xexanh.png';
import indicator from '~/assets/img_Global/indicator.png';

import * as OrderService from '~/service/OrderService';
import { useSelector } from 'react-redux';
import { convertPrice } from '~/utils';
import ModalComponent from '~/component/ModalComponent/ModalComponent';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useMutationHook } from '~/hook/useMutationHook';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutationHooks } from '~/hooks/useMutationHook';

const cx = classNames.bind(styles);

const AllOrders = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  console.log('orders', orders);
  const [isModalOpen, setIsModalOpen] = useState(false); // mở modal
  // lấy id để xóa của order
  const [idDelete, setIdDelete] = useState('');

  const queryClient = useQueryClient();

  // tắt modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // mở modal
  const modalAbortOrder = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };

  // api delete order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getAllOrderDetail(user?.id, user?.access_token);
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

  // mutation delete order
  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id, token } = data;
      return OrderService.deleteOrderToCancelled(id, token);
    },
    {
      onSuccess: () => {
        alert('Hủy đơn hàng thành công');
        // Sau khi xoá thành công, refetch lại dữ liệu orders
        queryClient.invalidateQueries('orders');
      },
      onError: (error) => {
        // Hiển thị thông báo lỗi hoặc xử lý lỗi
        console.error('Error deleting order:', error);
      },
    },
  );

  // api hủy đơn hàng
  const handleCancelOrder = (id) => {
    mutationDeleted.mutate({ id, token: user?.access_token });
    setIsModalOpen(false);
  };

  return (
    <div className={cx('wrapper_all-order')}>
      {orders && orders.length === 0 ? (
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
              {/* trạng thái đơn hàng */}
              <div>
                {order?.status !== 'cancelled' && order?.status === 'pending' ? (
                  <div className={cx('wrapper_pending')}>
                    <div className={cx('pending_car')}>
                      <img alt="xe_xanh" src={xe_xanh} width={20} height={20} />
                      <span style={{ fontSize: '1.3rem', color: '#00ab56', paddingLeft: '3px' }}>
                        Giao hàng 3 - 5 ngày
                      </span>
                    </div>
                    <div className={cx('pending_wait')}>
                      <img alt="indicator" src={indicator} width={20} height={20} />
                      <span style={{ paddingLeft: '3px', fontSize: '1.3rem', fontWeight: '600' }}>Chờ xác nhận</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span style={{ paddingRight: '6px', color: '#C0C0C0' }}>Đã hủy</span>
                    <FontAwesomeIcon icon={faBan} color="#C0C0C0" />
                  </div>
                )}
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
                    {order.orderItems && order.orderItems.length > 0 && convertPrice(order.orderItems[0].price)}₫
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
                  {order?.status !== 'cancelled' ? (
                    <div onClick={() => modalAbortOrder(order?._id)}>Hủy đơn hàng</div>
                  ) : (
                    <div>Mua lại</div>
                  )}
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
        <div className={cx('style-flex')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Bạn có muốn hủy đơn hàng không ? </span>
            <div>
              <img alt="icon_sad" src={icon_sad} width={18} height={18} />
            </div>
          </div>
          <div onClick={() => {}}>
            <ButtonComponent
              onClick={() => handleCancelOrder(idDelete)}
              textButton="Xác nhận"
              backgroundColor="#E54646"
            />
          </div>
          <div>
            <ButtonComponent onClick={handleCancel} textButton="Thoát" backgroundColor="deepskyblue" />
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default AllOrders;
