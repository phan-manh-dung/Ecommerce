import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_pay from '~/assets/img_Global/pay.png';

import img1 from '~/assets/img_Global/slide10.jpg';
import User1 from '~/assets/img_products/dongu1.jpg';
import User2 from '~/assets/img_products/dongu2.jpg';
import User3 from '~/assets/img_products/dongu3.jpg';
import User4 from '~/assets/img_products/dongu4.jpg';
import User5 from '~/assets/img_products/dongu5.jpg';
import User6 from '~/assets/img_products/donu6.jpg';
import User7 from '~/assets/img_products/donu7.jpg';
import User8 from '~/assets/img_products/donu8.jpg';
import the from '~/assets/img_category/uudaithevi.jpg';
import offical from '~/assets/img_Global/offical.jpg';
import img111 from '~/assets/img_Global/111.png';
import img222 from '~/assets/img_Global/222.png';
import img333 from '~/assets/img_Global/333.png';
import black_friday from '~/assets/img_Global/black_fraiday.jpg';
import robot from '~/assets/img_Global/robot.png';
import tay from '~/assets/img_Global/chaptay.png';
import chamthan from '~/assets/img_Global/chamthan.png';
import logoshop from '~/assets/img_Global/logoshop.png';

import { Col, InputNumber, Row } from 'antd';
import { CaretLeftOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import * as ProductService from '~/service/ProductService';
import { createCart } from '~/service/OrderService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '~/redux/slide/orderSlide';
import { convertPrice } from '~/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faComment, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../ModalComponent/ModalComponent';
import AddressComponent from '../AddressComponent/AddressComponent';
import { useMutationHook } from '~/hook/useMutationHook';
const cx = classNames.bind(styles);

const ProductDetailComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const [randomNumber, setRandomNumber] = useState('');
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const navigate = useNavigate();
    const location = useLocation(); // lấy thông tin về đường dẫn hiện tại
    const dispatch = useDispatch();
    const arrImageUsers = [User2, User3, User4, User5, User6, User7, User8];
    const [startIndex, setStartIndex] = useState(0);
    const imagesToShow = 6;
    const visibleImages = arrImageUsers.slice(startIndex, startIndex + imagesToShow);
    const [openSystem, setOpenSystem] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    // Mảng lưu trữ các ID sản phẩm đã thêm vào giỏ hàng
    const [addedProducts, setAddedProducts] = useState([]);

    function generateRandom() {
        return `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    }

    useEffect(() => {
        setRandomNumber(generateRandom());
    }, []);

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productsDetail?._id);
        if (
            orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
            (!orderRedux && productsDetail?.countInStock > 0)
        ) {
            //   setErrorLimitOrder(false);
        } else if (productsDetail?.countInStock === 0) {
            // setErrorLimitOrder(true);
        }
    }, [numProduct]);

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

    const showNextImages = () => {
        const nextIndex = startIndex + imagesToShow;
        if (nextIndex < arrImageUsers.length) {
            setStartIndex(nextIndex);
        }
    };
    const showPreviousImages = () => {
        const previousIndex = startIndex - imagesToShow;
        if (previousIndex >= 0) {
            setStartIndex(previousIndex);
        }
    };

    const fetchGetDetailProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailProduct(id); //  là id
            return res.data;
        }
    };
    const { isLoading, data: productsDetail } = useQuery(['product-details', idProduct], fetchGetDetailProduct, {
        enabled: !!idProduct,
    });

    const totalPriceProduct = useMemo(() => {
        const priceEnd = productsDetail?.price || 0;
        const discountEnd = productsDetail?.discount || 0;
        const priceAfterDiscount = Number(priceEnd) * (1 - Number(discountEnd) / 100);
        return numProduct * priceAfterDiscount;
    }, [productsDetail, numProduct]);

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            navigate('/payment', { state: { totalPriceProduct, productsDetail, numProduct } });
        }
    };

    const handleOrderDispatch = async () => {
        const userId = user?.id; // Lấy userId của người dùng đã đăng nhập
        const productId = productsDetail?._id;

        if (!addedProducts.includes(productId)) {
            // Kiểm tra xem sản phẩm đã được thêm chưa
            const orderItem = {
                name: productsDetail?.name,
                amount: numProduct,
                image: productsDetail?.image,
                price: productsDetail?.price,
                product: productId,
                color: productsDetail?.color,
                discount: productsDetail?.discount,
                type: productsDetail?.type,
            };

            // Dispatch đơn hàng và thông tin userId vào Redux
            dispatch(addOrderProduct({ orderItem, userId }));
            setAddedProducts([...addedProducts, productId]); // Thêm ID sản phẩm vào mảng

            try {
                const data = {
                    userId,
                    ...orderItem,
                };
                const result = await createCart(data); // Gửi dữ liệu lên backend thông qua hàm createCart
            } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
            }
        } else {
            alert('Bạn đã có sản phẩm này trong giỏ hàng');
        }
    };

    const handleAddOrderProductCart = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            handleOrderDispatch();
        }
    };

    const clickOpenSystem = () => {
        setOpenSystem(true);
    };

    const cancelOpenSystem = () => {
        setOpenSystem(false);
    };

    const handleOpenModalAddress = () => {
        setShowAddressModal(true);
    };

    const handleCloseAddressModal = () => {
        setShowAddressModal(false);
    };

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('container_user')}>
                <div className={cx('wrapper_user')}>
                    <div className={cx('wrapper-type')}>
                        <div className={cx('type-home')}>
                            <a href="/">Trang chủ</a>
                        </div>
                        <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                        <span className={cx('type-title')}>{productsDetail?.type}</span>
                        <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                        <span className={cx('type-title')}>{productsDetail?.name}</span>
                    </div>
                    <div className={cx('wrapper_row')}>
                        <Row>
                            <Col sm={16} className={cx('scrollable-content')}>
                                <Row>
                                    <Col xs={0} sm={12}>
                                        <div className={cx('user_left')}>
                                            <div className={cx('left')}>
                                                <img alt="donu1" src={productsDetail?.image} width={368} height={368} />
                                            </div>

                                            <div>
                                                <div className={cx('img_list')}>
                                                    {visibleImages.map((current, index) => (
                                                        <div key={index} className={cx('img')}>
                                                            <img alt="anh" src={current} width={45} height={45} />
                                                        </div>
                                                    ))}
                                                    {startIndex > 0 && (
                                                        <div
                                                            onClick={showPreviousImages}
                                                            className={cx('button_right')}
                                                        >
                                                            <div className={cx('button')}>
                                                                <CaretLeftOutlined
                                                                    style={{
                                                                        backgroundColor: 'var(--primary-color)',
                                                                        height: '24px',
                                                                        width: '26px',
                                                                        borderRadius: '50%',
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {startIndex + imagesToShow < arrImageUsers.length && (
                                                        <div onClick={showNextImages} className={cx('button_right')}>
                                                            <div className={cx('button')}>
                                                                <img
                                                                    alt="right_arrow"
                                                                    src={img_right_arrow}
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={cx('img_bottom')}>
                                                <img alt="img" src={img1} width={368} height={123} />
                                            </div>
                                        </div>
                                        <div className={cx('img-robot')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img alt="img" src={robot} width={24} height={24} />
                                                <span style={{ paddingLeft: '10px', color: '#999' }}>Xem thêm</span>
                                                <span style={{ paddingLeft: '10px' }}>
                                                    Ưu điểm & lưu ý của sản phẩm
                                                </span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={0} sm={12}>
                                        <div className={cx('container_wrapper-center', 'scrollable-content')}>
                                            <div className={cx('center')}>
                                                <div className={cx('wrapper_center')}>
                                                    <div className={cx('center1')}>
                                                        <div className={cx('brand')}>
                                                            Thương hiệu:{' '}
                                                            <div style={{ color: 'rgb(13, 92, 182)' }}> OCM</div>{' '}
                                                        </div>
                                                        <div className={cx('name')}>{productsDetail?.name}</div>
                                                        <div className={cx('star')}>
                                                            <div className={cx('vote')}>{productsDetail?.rating}</div>
                                                            {Array(5)
                                                                .fill(null)
                                                                .map((_, index) => (
                                                                    <StarFilled
                                                                        className={cx('star_icon')}
                                                                        key={index}
                                                                        style={{
                                                                            fontSize: '10px',
                                                                            color:
                                                                                index < productsDetail?.rating
                                                                                    ? '#ffce3d'
                                                                                    : 'gray',
                                                                            width: 20,
                                                                            height: 20,
                                                                        }}
                                                                    />
                                                                ))}
                                                            <span className={cx('comment')}>Đã bán</span>
                                                            <span className={cx('sold')}>
                                                                {productsDetail?.sold || 0}
                                                            </span>
                                                        </div>
                                                        <div className={cx('wrapper_price')}>
                                                            <div className={cx('price')}>
                                                                {convertPrice(productsDetail?.price)}
                                                                <sup>
                                                                    <u>đ</u>
                                                                </sup>
                                                            </div>
                                                            {productsDetail?.discount && (
                                                                <div className={cx('discount')}>
                                                                    - {productsDetail?.discount}%
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className={cx('color')}>{productsDetail?.color}</div>
                                                        <div className={cx('choose_color')}>
                                                            <div className={cx('choose')}>
                                                                <img alt="img" src={User1} width={38} height={38} />
                                                            </div>
                                                            <div className={cx('choose_name')}>
                                                                {productsDetail?.color} {randomNumber}
                                                            </div>
                                                        </div>
                                                        <div className={cx('choose_color')}>
                                                            <div className={cx('choose')}>
                                                                <img alt="img" src={User1} width={38} height={38} />
                                                            </div>
                                                            <div className={cx('choose_name')}>
                                                                {productsDetail?.color} {randomNumber}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('wrapper_address')}>
                                                    <div className={cx('information')}>Thông tin vận chuyển</div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div>
                                                            <span className={cx('shipper')}>Giao đến</span>
                                                            <span className={cx('address')}>
                                                                {user?.moreAddress},{user?.address},{user?.city}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span
                                                                className={cx('change')}
                                                                onClick={handleOpenModalAddress}
                                                            >
                                                                Đổi
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('wrapper_address')}>
                                                    <div className={cx('information')}>Dịch vụ bổ sung</div>
                                                    <div className={cx('pay')}>
                                                        <div className={cx('pay1')}>
                                                            <img
                                                                style={{ borderRadius: '10px' }}
                                                                alt=""
                                                                src={img_pay}
                                                                width={40}
                                                                height={40}
                                                            />
                                                            <span style={{ marginLeft: '10px' }}>
                                                                Mua trước trả sau
                                                            </span>
                                                        </div>
                                                        <div style={{ cursor: 'pointer' }}>
                                                            <span
                                                                onClick={clickOpenSystem}
                                                                style={{ color: 'rgb(11,105,255)' }}
                                                            >
                                                                Đổi
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className={cx('pay')} style={{ paddingTop: '4%' }}>
                                                        <div className={cx('pay1')}>
                                                            <img
                                                                style={{ borderRadius: '10px' }}
                                                                alt=""
                                                                src={the}
                                                                width={40}
                                                                height={40}
                                                            />
                                                            <span style={{ marginLeft: '10px' }}>
                                                                Ưu đãi khi thanh toán thẻ
                                                            </span>
                                                        </div>
                                                        <div style={{ cursor: 'pointer' }}>
                                                            <span
                                                                onClick={clickOpenSystem}
                                                                style={{ color: 'rgb(11,105,255)' }}
                                                            >
                                                                Đổi
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('information')}>Thông tin nhà bán</div>
                                                <div className={cx('wrapper_shop')}>
                                                    <Row>
                                                        <Col sm={4}>
                                                            <img
                                                                src={logoshop}
                                                                alt="the"
                                                                width={40}
                                                                height={40}
                                                                style={{ borderRadius: '50%' }}
                                                            />
                                                        </Col>
                                                        <Col sm={20}>
                                                            <div className={cx('name_brand')}>
                                                                <span
                                                                    style={{
                                                                        fontWeight: '600',
                                                                        paddingRight: '2%',
                                                                    }}
                                                                >
                                                                    Mạnh Dũng
                                                                </span>
                                                                <img alt="shop" src={offical} width={72} height={20} />
                                                            </div>
                                                            <div className={cx('register')}>
                                                                <div className={cx('follow')}>
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                    <span>Theo dõi</span>
                                                                </div>
                                                                <div
                                                                    className={cx('follow')}
                                                                    style={{ marginLeft: '10px' }}
                                                                >
                                                                    <span>Chat</span>
                                                                    <FontAwesomeIcon icon={faComment} />
                                                                </div>
                                                            </div>
                                                            <div className={cx('evaluate')}>
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    style={{ color: 'rgb(255,203,33)' }}
                                                                />
                                                                <span style={{ fontWeight: '600' }}>4.7</span>
                                                                <span className={cx('vote')}>(5.4tr+ đánh giá)</span>
                                                                <span style={{ fontWeight: '600' }}>
                                                                    583.4k+{' '}
                                                                    <span style={{ fontWeight: 400 }}>Theo dõi</span>
                                                                </span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('information')}>Thông tin bảo hành</div>
                                                <div className={cx('wrapper_guarantee')}>
                                                    <div style={{ display: 'flex' }}>
                                                        <div>Thời gian bảo hành:</div>
                                                        <div
                                                            style={{
                                                                paddingLeft: '8px',
                                                                fontWeight: '600',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            24 tháng
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex' }}>
                                                        <div>Hình thức bảo hành:</div>
                                                        <div
                                                            style={{
                                                                paddingLeft: '8px',
                                                                fontWeight: '600',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            Điện tử
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex' }}>
                                                        <div>Nơi bảo hành:</div>
                                                        <div
                                                            style={{
                                                                paddingLeft: '8px',
                                                                fontWeight: '600',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            Bảo hành chính hãng
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex' }}>
                                                        <div>Hướng dẫn bảo hành:</div>
                                                        <div
                                                            style={{
                                                                paddingLeft: '8px',
                                                                fontWeight: '600',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            Xem chi tiết
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    className={cx('information')}
                                                >
                                                    An tâm mua sắm
                                                    <FontAwesomeIcon icon={faChevronRight} width={20} height={20} />
                                                </div>
                                                <div className={cx('wrapper_assured')}>
                                                    <div className={cx('assured')}>
                                                        <img alt="111" src={img111} width={20} height={20} />
                                                        <div className={cx('title')}>
                                                            <strong>Được mở hộp kiểm tra</strong> khi nhận hàng.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('wrapper_assured')}>
                                                    <div className={cx('assured')}>
                                                        <img alt="111" src={img222} width={20} height={20} />
                                                        <div className={cx('title')}>
                                                            {' '}
                                                            <strong>Được hoàn tiền 111%</strong> nếu là hàng giả.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('wrapper_assured')}>
                                                    <div className={cx('assured')}>
                                                        <img alt="111" src={img333} width={20} height={20} />
                                                        <div className={cx('title')}>
                                                            <strong>Đổi trả miễn phí trong 7 ngày</strong> nếu sản phẩm
                                                            lỗi.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('information')}>Thông tin chi tiết</div>
                                                <div className={cx('wrapper_description')}>
                                                    <div className={cx('description')}>
                                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Xuất xứ</span>
                                                        <span>Việt nam</span>
                                                    </div>
                                                    <div className={cx('description', 'des2')}>
                                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Chất liệu</span>
                                                        <span>Voan Lụa Phối Ren</span>
                                                    </div>
                                                    <div className={cx('description')}>
                                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Thương hiệu</span>
                                                        <span>OCM</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('information')}>Mô tả sản phẩm</div>
                                                <div>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
                                                    repellat laudantium omnis praesentium commodi sunt voluptates
                                                    maiores maxime quis perspiciatis. Asperiores aut atque eligendi vero
                                                    quas ullam nam quaerat consectetur.
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div>
                                    <Row>
                                        <Col sm={24}>
                                            <div className={cx('wrapper_row-footer')}>
                                                <Row>
                                                    <Col sm={24}>
                                                        <div className={cx('container_row-footer')}>
                                                            <Row>
                                                                <Col sm={6} className={cx('wrapper_left')}>
                                                                    <div className={cx('information')}>
                                                                        Khách hàng đánh giá
                                                                    </div>
                                                                    <p style={{ paddingTop: '2%' }}>Tổng quan</p>
                                                                    <div className={cx('wrapper-star')}>
                                                                        <div className={cx('star')}>
                                                                            <div className={cx('vote')}>
                                                                                {productsDetail?.rating}
                                                                            </div>
                                                                            {Array(5)
                                                                                .fill(null)
                                                                                .map((_, index) => (
                                                                                    <StarFilled
                                                                                        className={cx('star_icon')}
                                                                                        key={index}
                                                                                        style={{
                                                                                            fontSize: '20px',
                                                                                            color:
                                                                                                index <
                                                                                                productsDetail?.rating
                                                                                                    ? '#ffce3d'
                                                                                                    : 'gray',
                                                                                            width: 40,
                                                                                            height: 40,
                                                                                        }}
                                                                                    />
                                                                                ))}
                                                                        </div>
                                                                    </div>
                                                                    <p style={{ color: '#999' }}>(16 đánh giá)</p>
                                                                    <div style={{ padding: '2px' }}>
                                                                        {Array(5)
                                                                            .fill(null)
                                                                            .map((_, index) => (
                                                                                <StarFilled
                                                                                    className={cx('star_icon')}
                                                                                    key={index}
                                                                                    style={{
                                                                                        fontSize: '10px',
                                                                                        color:
                                                                                            index < 5
                                                                                                ? '#ffce3d'
                                                                                                : 'gray',
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                    </div>
                                                                    <div style={{ padding: '2px' }}>
                                                                        {Array(5)
                                                                            .fill(null)
                                                                            .map((_, index) => (
                                                                                <StarFilled
                                                                                    className={cx('star_icon')}
                                                                                    key={index}
                                                                                    style={{
                                                                                        fontSize: '10px',
                                                                                        color:
                                                                                            index < 4
                                                                                                ? '#ffce3d'
                                                                                                : 'gray',
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                    </div>
                                                                    <div style={{ padding: '2px' }}>
                                                                        {Array(5)
                                                                            .fill(null)
                                                                            .map((_, index) => (
                                                                                <StarFilled
                                                                                    className={cx('star_icon')}
                                                                                    key={index}
                                                                                    style={{
                                                                                        fontSize: '10px',
                                                                                        color:
                                                                                            index < 3
                                                                                                ? '#ffce3d'
                                                                                                : 'gray',
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                    </div>
                                                                    <div style={{ padding: '2px' }}>
                                                                        {Array(5)
                                                                            .fill(null)
                                                                            .map((_, index) => (
                                                                                <StarFilled
                                                                                    className={cx('star_icon')}
                                                                                    key={index}
                                                                                    style={{
                                                                                        fontSize: '10px',
                                                                                        color:
                                                                                            index < 2
                                                                                                ? '#ffce3d'
                                                                                                : 'gray',
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                    </div>
                                                                    <div style={{ padding: '2px' }}>
                                                                        {Array(5)
                                                                            .fill(null)
                                                                            .map((_, index) => (
                                                                                <StarFilled
                                                                                    className={cx('star_icon')}
                                                                                    key={index}
                                                                                    style={{
                                                                                        fontSize: '10px',
                                                                                        color:
                                                                                            index < 1
                                                                                                ? '#ffce3d'
                                                                                                : 'gray',
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                    </div>
                                                                </Col>

                                                                <Col sm={18} className={cx('wrapper_right')}>
                                                                    <div>
                                                                        <strong>Tất cả hình ảnh ({0})</strong>
                                                                    </div>
                                                                    <div className={cx('img-img')}></div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={8}>
                                <Row>
                                    <Col xs={0} sm={24}>
                                        <div className={cx('container_right')}>
                                            <div className={cx('wrapper_right')}>
                                                <div className={cx('right_User')}>
                                                    <div>
                                                        <img alt="" src={User1} width={40} height={40} />
                                                    </div>
                                                    <div className={cx('title_right')}>Đỏ 89 free size</div>
                                                </div>
                                                <div className={cx('quantity')}>
                                                    <div>
                                                        <span style={{ fontWeight: '500' }}>Số lượng</span>
                                                    </div>
                                                    <div className={cx('wrapper_add')}>
                                                        <div
                                                            className={cx('add')}
                                                            onClick={() =>
                                                                handleChangeCount('decrease', numProduct === 1)
                                                            }
                                                        >
                                                            <MinusOutlined />
                                                        </div>
                                                        <div
                                                            onChange={onChange}
                                                            defaultValue={1}
                                                            max={productsDetail?.countInStock}
                                                            min={1}
                                                            value={numProduct}
                                                            size="small"
                                                        ></div>
                                                        <div className={cx('input')}>
                                                            <InputNumber
                                                                readOnly
                                                                value={numProduct}
                                                                style={{ width: '90%' }}
                                                            />
                                                        </div>
                                                        <div
                                                            className={cx('add')}
                                                            onClick={() =>
                                                                handleChangeCount(
                                                                    'increase',
                                                                    numProduct === productsDetail?.countInStock,
                                                                )
                                                            }
                                                        >
                                                            <PlusOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('provisional')}>Tạm tính</div>
                                                <div className={cx('price')}>
                                                    {convertPrice(productsDetail?.price * numProduct)}
                                                    <sup>đ</sup>
                                                </div>
                                                <div className={cx('wrapper_button')}>
                                                    <div className={cx('button')}>
                                                        <div
                                                            style={{ paddingBottom: '10px' }}
                                                            onClick={handleAddOrderProduct}
                                                        >
                                                            <ButtonComponent
                                                                color="#fff"
                                                                backgroundColor="rgb(255, 66, 78)"
                                                                width="90%"
                                                                textButton="Mua ngay"
                                                                height="40px"
                                                            />
                                                        </div>
                                                        <div onClick={handleAddOrderProductCart}>
                                                            <ButtonComponent
                                                                color="var(--primary-color)"
                                                                height="40px"
                                                                width="90%"
                                                                textButton="Thêm vào giỏ"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('img_right_footer')}>
                                            <img
                                                alt="black_friday"
                                                src={black_friday}
                                                width={410}
                                                height={120}
                                                style={{ borderRadius: '6px' }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <AddressComponent
                            showAddressModal={showAddressModal}
                            handleCloseAddressModal={handleCloseAddressModal}
                        />
                    </div>
                    <ModalComponent title="" footer={null} open={openSystem} onCancel={cancelOpenSystem}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img alt="" src={chamthan} width={20} height={20} />
                            <p style={{ paddingRight: '10px' }}>Xin lỗi hệ thống chúng tôi đang cập nhật chức năng</p>
                            <img alt="" src={tay} width={20} height={20} />
                        </div>
                    </ModalComponent>
                </div>
            </div>
        </Loading>
    );
};

export default ProductDetailComponent;
