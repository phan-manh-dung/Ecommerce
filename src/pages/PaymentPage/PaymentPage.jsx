import React, { useEffect, useMemo, useState } from 'react';
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
import free_ship from '~/assets/img_Global/free_ship.png';
import { Checkbox, Col, Radio, Row, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHook } from '~/hook/useMutationHook';
import * as ProductService from '~/service/ProductService';

import * as OrderService from '~/service/OrderService';
import { convertPrice } from '~/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeAllOrderProduct, removeAllSelectedProducts } from '~/redux/slide/orderSlide';
import { updateProduct } from '~/service/ProductService';
import { logDOM } from '@testing-library/react';

const cx = classNames.bind(styles);

const PaymentPage = () => {
    // const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const selectedItem = location.state?.selectedItem;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [payment, setPayment] = useState('later_money');

    const { totalPrice } = location.state || {};
    const idProduct = selectedItem?.product;

    const initial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        color: '',
        discount: '',
        sold: '',
    });

    const [productData, setProductData] = useState(initial); // lấy data

    // tính phí vận chuyển
    const deliveryPriceMemo = useMemo(() => {
        if (totalPrice > 200000) {
            return 20000;
        } else if (totalPrice < 200000) {
            return 10000;
        } else {
            return 0;
        }
    }, [totalPrice]);

    const totalPriceMemo = useMemo(() => {
        return Number(totalPrice) + Number(deliveryPriceMemo) - 5000;
    }, [totalPrice, deliveryPriceMemo]);

    const handleAddOrder = () => {
        if (user?.access_token && user?.name && user?.address && user?.phone && user?.id) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                paymentMethod: payment,
                itemsPrice: totalPrice,
                shippingPrice: deliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email,
            });
        }
    };

    const mutationAddOrder = useMutationHook((data) => {
        const { token, ...rests } = data;
        const res = OrderService.createOrder({ ...rests }, token);
        return res;
    });

    const { isLoading, data, isSuccess, isError } = mutationAddOrder;
    const { data: dataAdd, isLoading: isLoadingAddOrder } = mutationAddOrder;

    // mutation update
    const mutationUpdateProduct = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, { ...rests }, token);
        return res;
    });

    // update product
    const updateProduct = async () => {
        try {
            await mutationUpdateProduct.mutate({
                id: idProduct,
                token: user?.access_token,
                sold: productData.sold + 1,
                countInStock: productData.countInStock - 1,
            });
        } catch (error) {
            // handle error
        }
    };

    useEffect(() => {
        const fetchData = async (idProduct) => {
            try {
                const res = await ProductService.getDetailProduct(idProduct);
                if (res?.data) {
                    setProductData({
                        name: res?.data?.name,
                        price: res?.data?.price,
                        description: res?.data?.description,
                        rating: res?.data?.rating,
                        image: res?.data?.image,
                        type: res?.data?.type,
                        countInStock: res?.data?.countInStock,
                        discount: res?.data?.discount,
                        color: res?.data?.color,
                        sold: res?.data?.sold,
                    });
                }
            } catch (error) {
                throw error;
            }
        };

        fetchData(idProduct);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            updateProduct();
            // trước khi success phải xóa ở trong redux
            const productToRemove = selectedItem?.product; // lấy id của product
            dispatch(removeAllOrderProduct({ listChecked: productToRemove }));

            message.success('Đặt hàng thành công');
            navigate('/orderSuccess', {
                state: {
                    payment,
                    orders: selectedItem?.orderItems,
                    totalPriceMemo: totalPriceMemo,
                },
            });
        } else if (isError) {
            message.error('Đặt hàng thất bại');
        }
    }, [handleAddOrder]); // Chỉ chạy lại khi handleAddOrder thay đổi

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
                                                    {selectedItem.price} <sup>đ</sup>{' '}
                                                </span>
                                            </div>
                                            <div className={cx('content_left')}>
                                                <div>
                                                    <img alt="" src={selectedItem?.image} width={48} height={48} />
                                                </div>
                                                <div className={cx('noidung')}>{selectedItem?.name}</div>
                                            </div>
                                            <div style={{ float: 'right' }}>Số lượng: {selectedItem?.amount}</div>
                                        </div>
                                        <div className={cx('right-content')}>
                                            <div className={cx('wrapper_icon')}>
                                                <div className={cx('icon')}>
                                                    <img alt="xe" src={truck} width={24} height={24} />
                                                </div>
                                                <div className={cx('title_icon')}>Được giao bởi BEE GEE SHOP </div>
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
                                    {/* pay order */}
                                    <div className={cx('wrapper_pay-order')}>
                                        <div className={cx('order1')}>
                                            <span style={{ fontSize: '16px', lineHeight: '20px' }}>
                                                Đơn hàng <p style={{ fontSize: '13px', color: '#999' }}>1 sản phẩm</p>{' '}
                                            </span>
                                            <span>Thay đổi </span>
                                        </div>
                                        <div className={cx('order2')}>
                                            <div className={cx('provisional', 'chung')}>
                                                <div className={cx('title_chung')}>Tạm tính</div>
                                                <div>
                                                    {convertPrice(totalPrice)} <sup>đ</sup>
                                                </div>
                                            </div>
                                            <div className={cx('ship', 'chung')}>
                                                <div className={cx('title_chung')}>Phí vận chuyển</div>
                                                <div>
                                                    {convertPrice(deliveryPriceMemo)} <sup>đ</sup>
                                                </div>
                                            </div>
                                            <div className={cx('promotion1', 'chung')}>
                                                <div className={cx('title_chung')}>Khuyến mãi vận chuyển</div>
                                                <div style={{ color: 'green' }}>
                                                    - 5000 <sup>đ</sup>
                                                </div>
                                            </div>
                                            <div className={cx('total_price')}>
                                                <div>Tổng tiền</div>
                                                <div className={cx('wrapper_vat')}>
                                                    {convertPrice(totalPriceMemo)} VND
                                                </div>
                                            </div>
                                            <div className={cx('free_ship')}>
                                                <img alt="free_ship" src={free_ship} width={81} />
                                                <span className={cx('title-free_ship')}> đã được áp dụng</span>
                                            </div>
                                            <div className={cx('button_success')} onClick={() => handleAddOrder()}>
                                                <ButtonComponent
                                                    textButton="Đặt hàng"
                                                    backgroundColor="rgb(255, 66, 78)"
                                                    color="#fff"
                                                />
                                            </div>
                                        </div>
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
