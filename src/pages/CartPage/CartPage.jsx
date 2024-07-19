import React, { useEffect, useMemo, useState } from 'react';
import styles from './CartPage.module.scss';
import classNames from 'classnames/bind';
import { Row, Col, Checkbox, InputNumber, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_oto from '~/assets/img_Global/oto.png';
import cart_null from '~/assets/img_Global/cart-null.png';
import chart from '~/assets/img_Global/chart.png';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductInCart, removeAllProductInCart } from '~/redux/slide/cartSlide';
import { convertPrice } from '~/utils';
import ModalComponent from '~/component/ModalComponent/ModalComponent';
import { useNavigate } from 'react-router-dom';
import { deleteCart, findCart, findManyCart, deleteManyCart } from '~/service/OrderService';
import { getCartByUserId } from '~/service/OrderService';
import { Helmet } from 'react-helmet';
import { useMutationHook } from '~/hook/useMutationHook';

const cx = classNames.bind(styles);

const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const [listChecked, setListChecked] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
    const dispatch = useDispatch(); // gửi action đến reducer
    const navigate = useNavigate(); // chuyển trang
    const [isChecked, setIsChecked] = useState(false);
    // mảng ids cart dùng để xóa
    const [dataDeleteMany, setDataDeleteMany] = useState([]);

    const userId = user?.id;

    const handleDeleteProductInCart = async (productId) => {
        if (!productId) {
            message.error('Không tìm thấy sản phẩm để xóa');
            return;
        }
        try {
            const cartId = await findCart(userId, productId, user?.access_token);
            console.log('cartId', cartId);

            if (!cartId) {
                message.error('Không tìm thấy giỏ hàng để xóa');
                return;
            }
            dispatch(removeProductInCart({ idProduct: productId }));
            deleteCart(cartId, user?.access_token)
                .then(() => {
                    message.success('Sản phẩm đã được xóa khỏi giỏ hàng');
                })
                .catch((error) => {
                    message.error('Xóa thất bại');
                    console.error(error);
                });
        } catch (error) {
            console.error('Error finding cart:', error);
            message.error('Xảy ra lỗi khi tìm giỏ hàng');
        }
    };

    // check 1 sản phẩm

    const onChangeOne = (e) => {
        const newValue = !listChecked.includes(e.target.value);
        setListChecked((prevListChecked) =>
            newValue ? [...prevListChecked, e.target.value] : prevListChecked.filter((item) => item !== e.target.value),
        );
        setIsChecked(newValue);
    };

    // onchange check all
    const handleCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            cart?.cartItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const handleRemoveAllCart = async () => {
        if (listChecked.length > 0) {
            try {
                dispatch(removeAllProductInCart({ listChecked }));
                await deleteManyCart(dataDeleteMany, user?.access_token);
                message.success('Đã xóa hết giỏ hàng');
            } catch (error) {
                message.error('Xóa thất bại');
                console.error('Error deleting carts:', error);
            }
        }
    };

    useEffect(() => {
        const handleFindCarts = async () => {
            try {
                const carts = await findManyCart(userId, listChecked, user?.access_token);
                setDataDeleteMany(carts);
            } catch (error) {
                console.error('Error finding carts:', error);
            }
        };

        if (listChecked.length > 0) {
            handleFindCarts();
        }
    }, [userId, listChecked, user?.access_token]);

    // xóa many cart

    // price product
    const priceMemo = useMemo(() => {
        if (listChecked && cart) {
            const selectedItems = cart.cartItems.filter((item) => listChecked.includes(item.product));
            const result = selectedItems.reduce((total, current) => {
                return total + current.price * current.amount;
            }, 0);
            return result;
        } else {
            return 0;
        }
    }, [listChecked, cart]);

    // discount
    const discountMemo = useMemo(() => {
        if (listChecked && cart) {
            const itemDiscount = cart?.cartItems?.filter((item) => listChecked.includes(item.product));
            const result = itemDiscount.reduce((total, current) => {
                return total + current.discount;
            }, 0);
            return result;
        }
    }, [listChecked, cart]);

    // price end
    const totalPrice = useMemo(() => {
        return Number(priceMemo) - Number(priceMemo) * (Number(discountMemo) / 100);
    }, [priceMemo, discountMemo]);

    //   gửi state sang payment

    const handlePayOrder = async () => {
        if (!listChecked.length || !(user?.address || user?.city || user?.country)) {
            setIsModalOpen(true);
        } else if (listChecked.length === 1) {
            // value product của đối tượng đầu tiên trong listChecked
            const selectedItemId = listChecked[0];
            const selectedItem = cart?.cartItems.find((item) => item.product === selectedItemId);
            if (selectedItem) {
                try {
                    const cartId = await findCart(userId, selectedItem.product, user?.access_token);
                    navigate('/payment', { state: { selectedItem, totalPrice, cartId } });
                } catch (error) {
                    message.error('Xảy ra lỗi khi mua hàng');
                }
            }
        } else if (listChecked.length > 1) {
            setIsModalOpenProduct(true);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancelModalProduct = () => {
        setIsModalOpenProduct(false);
    };

    const navigateUpdate = () => {
        navigate('/profile-user');
    };

    function getPhoneCode(country) {
        let phoneCode = '';
        switch (country) {
            case 'VietNamese':
                phoneCode = '+84';
                break;
            case 'Japan':
                phoneCode = '+81';
                break;
            case 'Franch':
                phoneCode = '+33';
                break;
            case 'Italy':
                phoneCode = '+39';
                break;
            case 'Egypt':
                phoneCode = '+20';
                break;
            case 'India':
                phoneCode = '+91';
                break;
            default:
                phoneCode = 'Country not found';
        }
        return phoneCode;
    }

    return (
        <div className={cx('container_order')}>
            <Helmet>
                <title>Giỏ hàng | MD.com</title>
            </Helmet>
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
                    {cart?.cartItems.length > 0 ? (
                        <Row>
                            <Col xs={0} sm={17} style={{ paddingRight: '1%' }}>
                                <div>
                                    <div style={{ height: '50px', backgroundColor: '#fff' }}>giu</div>
                                    <div className={cx('wrapper_all')}>
                                        <span style={{ width: '36%' }}>
                                            <Checkbox
                                                onChange={handleCheckAll}
                                                checked={listChecked?.length === cart?.cartItems?.length}
                                            />
                                            Tất cả ({cart?.cartItems?.length}) sản phẩm
                                        </span>
                                        <span>Đơn giá</span>
                                        <span>Số lượng</span>
                                        <span>Thành tiền</span>
                                        <span onClick={handleRemoveAllCart}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                    </div>
                                    <div className={cx('scrollable-content')}>
                                        {cart?.cartItems?.map((carts, index) => {
                                            return (
                                                <div key={index} className={cx('product')}>
                                                    <div className={cx('type')}>
                                                        <div>
                                                            <Checkbox /> Type
                                                        </div>
                                                        <img src={img_right_arrow} alt="right" width={18} height={18} />
                                                        <div>{carts?.type || 'Đồ'}</div>
                                                    </div>
                                                    <div className={cx('wrapper_content')}>
                                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Col sm={1}>
                                                                <Checkbox
                                                                    onChange={onChangeOne}
                                                                    value={carts.product}
                                                                    checked={listChecked?.includes(carts.product)}
                                                                />
                                                                {/* orders của map để lấy ra từng id chứ k phải order chung */}
                                                            </Col>
                                                            <Col sm={10}>
                                                                <div className={cx('img-content')}>
                                                                    <div>
                                                                        <img
                                                                            alt=""
                                                                            width={80}
                                                                            height={80}
                                                                            src={carts?.image}
                                                                        />
                                                                    </div>
                                                                    <div className={cx('img-title')}>
                                                                        <span className={cx('title_content')}>
                                                                            {carts?.name}
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
                                                                    {convertPrice(carts?.price)}
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
                                                                        Giảm {carts?.discount || 10} %
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <div className={cx('quantity')}>
                                                                    <div className={cx('wrapper_add')}>
                                                                        <div className={cx('input')}>
                                                                            <InputNumber
                                                                                value={carts?.amount}
                                                                                readOnly
                                                                                style={{ width: '30%', border: 'none' }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col sm={4}>
                                                                <div style={{ paddingLeft: '2%' }}>
                                                                    {convertPrice(carts?.price * carts?.amount)}
                                                                    <sup>
                                                                        <u>đ</u>
                                                                    </sup>
                                                                </div>
                                                            </Col>
                                                            <Col sm={1}>
                                                                {/* xóa thì phải truyền đi cái id */}

                                                                <div
                                                                    key={index}
                                                                    style={{
                                                                        paddingLeft: '62%',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={() =>
                                                                        handleDeleteProductInCart(
                                                                            cart?.cartItems?.[index]?.product,
                                                                        )
                                                                    }
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
                                                                style={{
                                                                    paddingLeft: '2%',
                                                                    color: 'rgb(120, 120, 120)',
                                                                }}
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
                                            <span style={{ fontSize: '14px', color: 'rgb(128, 128, 137)' }}>
                                                Giao tới
                                            </span>
                                            <span>Thay đổi</span>
                                        </div>
                                        <div className={cx('name')}>
                                            {user?.nickname || user?.name} <i className={cx('i')}></i>
                                            <span style={{ fontSize: '12px', paddingRight: '6px' }}>
                                                {getPhoneCode(user?.country)}
                                            </span>
                                            {user?.phone}
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
                                                <div class="style-flex">
                                                    <span>Bạn chưa có thông tin địa chỉ hoặc chưa chọn sản phẩm</span>
                                                    <div onClick={navigateUpdate}>
                                                        <ButtonComponent
                                                            textButton="Cập nhật"
                                                            backgroundColor="rgb(71,141,255)"
                                                            color="#fff"
                                                        />
                                                    </div>
                                                </div>
                                            </ModalComponent>

                                            <ModalComponent
                                                footer={null}
                                                okText="..."
                                                okType=""
                                                isOpen={isModalOpenProduct}
                                                title="Thông báo"
                                                onCancel={handleCancelModalProduct}
                                            >
                                                Bạn chỉ được thanh toán 1 sản phẩm 1 lần
                                            </ModalComponent>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <div className={cx('cart_null')}>
                            <img alt="anh" src={cart_null} width={160} height={160} />
                            <span>Giỏ hàng trống</span>
                            <p>Bạn tham khảo thêm các sản phẩm được Shop MD gợi ý bên dưới nhé!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
