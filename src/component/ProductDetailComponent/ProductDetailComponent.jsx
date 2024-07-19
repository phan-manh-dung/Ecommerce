import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';
import io from 'socket.io-client';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_left_arrow from '~/assets/img_Global/img_left_arrow.png';
import img_pay from '~/assets/img_Global/pay.png';
import like from '~/assets/img_Global/like.png';
import cmt from '~/assets/img_Global/comment.png';
import binhluan from '~/assets/img_Global/binhluan.png';
import chiase from '~/assets/img_Global/chiase.png';

import img1 from '~/assets/img_Global/slide10.jpg';
import User1 from '~/assets/img_products/dongu1.jpg';
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
import { Col, InputNumber, Rate, Row, Upload } from 'antd';
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import * as ProductService from '~/service/ProductService';
import * as UserService from '~/service/UserService';
import * as OrderService from '~/service/OrderService';
import { createCart } from '~/service/OrderService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProductInCart, updateCart } from '~/redux/slide/cartSlide';
import { convertPrice, getBase64 } from '~/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faComment, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../ModalComponent/ModalComponent';
import AddressComponent from '../AddressComponent/AddressComponent';
import { Helmet } from 'react-helmet';
import { message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Button } from 'antd';
const cx = classNames.bind(styles);
const socket = io('http://localhost:4000');

const ProductDetailComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const location = useLocation(); // lấy thông tin về đường dẫn hiện tại
    const dispatch = useDispatch();
    const [startIndex, setStartIndex] = useState(0);
    const imagesToShow = 6;
    const [openSystem, setOpenSystem] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    // Mảng lưu trữ các ID sản phẩm đã thêm vào giỏ hàng
    const [addedProducts, setAddedProducts] = useState([]);
    const [activeColor, setActiveColor] = useState('red');
    const [activeTabFilter, setActiveTabFilter] = useState('moi_nhat');

    const [hasPurchased, setHasPurchased] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // value rating and comment
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [comments, setComments] = useState([]);
    // name user
    const [dataNameUser, setDataNameUser] = useState([]);
    const [checkSubmitVote, setCheckSubmitVote] = useState(false);

    const handleTabClickFilter = (tabFilter) => {
        setActiveTabFilter(tabFilter);
    };

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    useEffect(() => {
        const orderRedux = cart?.cartItems?.find((item) => item.product === productsDetail?._id);
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
        if (nextIndex < productsDetail?.additionalImages.length) {
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

    const handleOrderDispatch = useCallback(async () => {
        const userId = user?.id; // Lấy userId của người dùng đã đăng nhập
        const productId = productsDetail?._id;

        if (!userId || !productId) {
            alert('Lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
            return;
        }

        if (!addedProducts.includes(productId)) {
            const cartItem = {
                name: productsDetail?.name,
                amount: numProduct,
                image: productsDetail?.image,
                price: productsDetail?.price,
                product: productId,
                color: productsDetail?.color,
                discount: productsDetail?.discount,
                type: productsDetail?.type,
            };

            setAddedProducts([...addedProducts, productId]);
            setLoading(true);
            setError(null);

            try {
                const data = {
                    userId,
                    ...cartItem,
                };
                const result = await createCart(data);
                if (result) {
                    message.success('Đã thêm sản phẩm vào giỏ hàng');
                    dispatch(addProductInCart({ cartItem, _id: result?.data?._id }));
                } else {
                    message.error('Không thêm được sản phẩm vào giỏ hàng');
                }
            } catch (error) {
                setError('Có lỗi xảy ra khi gửi dữ liệu.');
            } finally {
                setLoading(false);
            }
        } else {
            message.warning('Bạn đã có sản phẩm này trong giỏ hàng');
        }
    }, [user, productsDetail, addedProducts, dispatch, numProduct]);

    const userId = user?.id;
    const accessToken = user?.access_token;
    const productId = productsDetail?._id;

    // effect kiểm tra xem người dùng đã mua sản phẩm chưa
    useEffect(() => {
        const fetchPurchaseStatus = async () => {
            if (!userId || !productId || !accessToken) {
                setError('Missing userId, productId, or accessToken');
                setLoading(false);
                return;
            }
            try {
                const purchased = await OrderService.checkIfUserPurchasedProduct(userId, productId, accessToken);
                setHasPurchased(purchased);
            } catch (err) {
                setError('Error checking purchase status');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseStatus();
    }, [userId, productId, accessToken]);

    // submit đánh giá
    const handleSubmitVote = async () => {
        if (rating === 0 || comment.trim() === '') {
            message.error('Vui lòng nhập đánh giá và gửi sao');
            return;
        }
        setRating(0);
        setComment('');
        setCheckSubmitVote(true);
        message.success('Đánh giá của bạn đã được gửi thành công');

        const payload = {
            productId,
            userId,
            rating,
            comment,
            images,
        };
        const response = await ProductService.createVote(payload);
        return response.data;
    };

    // add ảnh
    const handleUploadChange = async ({ fileList }) => {
        const imageList = await Promise.all(fileList.map((file) => getBase64(file.originFileObj)));
        setImages(imageList);
    };

    useEffect(() => {
        // Lắng nghe sự kiện 'newComment'
        socket.on('newComment', (newComment) => {
            setComments((prevComments) => [newComment, ...prevComments]);
        });

        return () => {
            socket.off('newComment');
        };
    }, []);

    console.log('comment socket', comments[0]?.data?.userId);

    const idSocket = comments[0]?.data?.userId;

    // tìm tên người dùng
    const handleFindNameUser = async () => {
        const userData = await UserService.findNameUser(idSocket);
        if (userData) {
            setDataNameUser(userData);
        } else {
            console.log('User not found');
        }
    };

    // Gọi hàm xử lý
    useEffect(() => {
        if (checkSubmitVote && idSocket) {
            handleFindNameUser();
            setCheckSubmitVote(false);
        }
    }, [checkSubmitVote, idSocket]);

    console.log('dataNameUser', dataNameUser);
    console.log('checkSubmitVote', checkSubmitVote);

    const handleAddOrderProductCart = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            handleOrderDispatch();
        }
    };

    const handleRateChange = (value) => {
        setRating(value);
    };

    const handleReviewChange = (event) => {
        setComment(event.target.value);
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

    const handleActiveColor = (color) => {
        setActiveColor(color);
    };

    return (
        <Loading isLoading={isLoading}>
            <Helmet>
                <title>Mua {productsDetail?.name || 'Sản phẩm'}</title>
            </Helmet>
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
                            <Col sm={16} style={{}}>
                                <Row>
                                    <Col xs={0} sm={12}>
                                        <div className={cx('user_left')}>
                                            <div className={cx('left')}>
                                                <img alt="donu1" src={productsDetail?.image} width={368} height={368} />
                                            </div>

                                            <div>
                                                <div className={cx('img_list')}>
                                                    {productsDetail?.additionalImages?.map((current, index) => (
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
                                                                <img
                                                                    alt="left_arrow"
                                                                    src={img_left_arrow}
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {startIndex + imagesToShow <
                                                        productsDetail?.additionalImages.length && (
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
                                                            <span>Thương hiệu:</span>
                                                            <div style={{ color: 'rgb(13, 92, 182)' }}>
                                                                {productsDetail?.brand || 'Không có'}
                                                            </div>
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
                                                                            fontSize: '15px',
                                                                            color:
                                                                                index < productsDetail?.rating
                                                                                    ? '#ffce3d'
                                                                                    : 'gray',
                                                                            width: 20,
                                                                            height: 20,
                                                                        }}
                                                                    />
                                                                ))}
                                                            <span className={cx('')}>()</span>
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
                                                            {productsDetail?.discount ? (
                                                                <div className={cx('discount')}>
                                                                    - {productsDetail?.discount}%
                                                                </div>
                                                            ) : (
                                                                <div></div>
                                                            )}
                                                        </div>
                                                        <div className={cx('color')}>Màu</div>
                                                        <div className={cx('choose_color_container')}>
                                                            <div
                                                                className={cx('choose_color', {
                                                                    active: activeColor === 'red',
                                                                })}
                                                                onClick={() => handleActiveColor('red')}
                                                            >
                                                                <div className={cx('choose')}>
                                                                    <img alt="img" src={User1} width={38} height={38} />
                                                                </div>
                                                                <div className={cx('choose_name')}>
                                                                    {productsDetail?.color}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={cx('choose_color', {
                                                                    active: activeColor === 'blue',
                                                                })}
                                                                onClick={() => handleActiveColor('blue')}
                                                            >
                                                                <div className={cx('choose')}>
                                                                    <img alt="img" src={User1} width={38} height={38} />
                                                                </div>
                                                                <div className={cx('choose_name')}>
                                                                    {productsDetail?.color}
                                                                </div>
                                                            </div>
                                                            <div className={cx('choose_color')}>
                                                                <div className={cx('choose')}>
                                                                    <img alt="img" src={User1} width={38} height={38} />
                                                                </div>
                                                                <div className={cx('choose_name')}>
                                                                    {productsDetail?.color}
                                                                </div>
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
                                                                {user?.moreAddress || user?.district || user?.city ? (
                                                                    <>
                                                                        {user?.moreAddress}
                                                                        {','}
                                                                        {user?.district}
                                                                        {','}
                                                                        {user?.city}
                                                                    </>
                                                                ) : (
                                                                    <span>Q.1, P.Bến Nghé, Hồ Chí Minh</span>
                                                                )}
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
                                                                    MD
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
                                                        <span>{productsDetail?.originOfCountry}</span>
                                                    </div>
                                                    <div className={cx('description', 'des2')}>
                                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Chất liệu</span>
                                                        <span>Voan Lụa Phối Ren</span>
                                                    </div>
                                                    <div className={cx('description')}>
                                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Thương hiệu</span>
                                                        <span>{productsDetail?.brand || 'Chưa có'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('center')}>
                                                <div className={cx('information')}>Mô tả sản phẩm</div>
                                                <div>{productsDetail?.description || 'Không có mô tả nào'}</div>
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
                                                                <Col sm={10} className={cx('wrapper_left')}>
                                                                    <div className={cx('information')}>
                                                                        Khách hàng đánh giá
                                                                    </div>
                                                                    <p style={{ paddingTop: '2%' }}>Tổng quan</p>
                                                                    <div className={cx('wrapper-star')}>
                                                                        <div className={cx('star')}>
                                                                            <div className={cx('vote')}>0</div>
                                                                            <div>
                                                                                <StarFilled
                                                                                    className={cx('star_icon')}
                                                                                    style={{
                                                                                        fontSize: '20px',

                                                                                        width: 30,
                                                                                        height: 30,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p style={{ color: '#999' }}>(Chưa có đánh giá)</p>
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

                                                                <Col sm={14} className={cx('wrapper_right')}>
                                                                    <div>
                                                                        <strong>
                                                                            Tất cả hình ảnh (
                                                                            {productsDetail?.additionalImages.length})
                                                                        </strong>
                                                                    </div>
                                                                    <div className={cx('img-grid')}>
                                                                        {productsDetail?.additionalImages.map(
                                                                            (current, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className={cx('img-img')}
                                                                                >
                                                                                    <img
                                                                                        alt=""
                                                                                        src={current}
                                                                                        width={40}
                                                                                        height={40}
                                                                                    />
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            {/* phần show đánh giá sản phẩm */}
                                            <div className={cx('review_comment')}>
                                                <div className={cx('review_user')}>
                                                    <div className={cx('user_inner')}>
                                                        <div className={cx('user_avatar')}>
                                                            <div>
                                                                <img
                                                                    style={{ margin: '0 8px 0 0' }}
                                                                    alt=""
                                                                    src={img1}
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={cx('user_name')}>Phan Mạnh Dũng</div>
                                                            <div className={cx('user_date')}>Đã tham gia</div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('user_info')}>
                                                        <div>
                                                            <img
                                                                style={{ margin: '0 8px 0 0' }}
                                                                alt=""
                                                                src={cmt}
                                                                width={20}
                                                                height={20}
                                                            />
                                                            Đã viết
                                                        </div>
                                                        <span>196 đánh giá</span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            border: '0.5px solid rgb(235, 235, 240)',
                                                            marginTop: '9px',
                                                        }}
                                                    ></div>
                                                    <div className={cx('user_info')}>
                                                        <div>
                                                            <img
                                                                style={{ margin: '0 8px 0 0' }}
                                                                alt=""
                                                                src={like}
                                                                width={20}
                                                                height={20}
                                                            />
                                                            Đã nhận
                                                        </div>
                                                        <span>Cảm ơn</span>
                                                    </div>
                                                    <div></div>
                                                </div>
                                                <div className={cx('review_vote')}>
                                                    <div className={cx('rating_title')}>
                                                        <div>
                                                            {' '}
                                                            <StarFilled />{' '}
                                                        </div>
                                                        <div>Cực kì hài lòng</div>
                                                    </div>
                                                    <div className={cx('seller_name-attribute')}>
                                                        <div className={cx('seller-name')}>
                                                            <span>Đã mua hàng</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('comment_content')}></div>
                                                    <div className={cx('review_images')}>
                                                        <img alt="" src={img1} width={77} height={77} />
                                                    </div>
                                                    <div className={cx('create_date')}>
                                                        <div className={cx('comment_attribute')}>
                                                            <div className={cx('item')}>
                                                                <span>Xanh lá</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('comment_share')}>
                                                        <div className={cx('wrapper_like')}>
                                                            <span className={cx('like_span')}>
                                                                <img alt="" src={like} width={24} height={24} />
                                                                <span>1</span>
                                                            </span>
                                                            <span className={cx('reply_span')}>
                                                                <img alt="" src={binhluan} width={24} height={24} />
                                                                Bình luận
                                                            </span>
                                                        </div>
                                                        <div className={cx('wrapper_share')}>
                                                            <img alt="" src={chiase} width={24} height={24} />
                                                            Chia sẻ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* phần đánh giá sản phẩm cho người dùng đã mua*/}
                                            <div>
                                                {hasPurchased === true ? (
                                                    <div className={cx('write_vote')}>
                                                        <div className={cx('wrapper_label')}>
                                                            <span className={cx('span_child1')}>Đánh giá sản phẩm</span>
                                                            <span className={cx('span_child2')}>Mức độ ưa thích</span>
                                                            <Rate onChange={handleRateChange} value={rating} />
                                                        </div>
                                                        <div style={{ width: '100%' }}>
                                                            <TextArea
                                                                rows={3}
                                                                placeholder="Đánh giá của bạn"
                                                                value={comment}
                                                                onChange={handleReviewChange}
                                                            />
                                                        </div>
                                                        <div className={cx('wrapper_btn')}>
                                                            <div>
                                                                <Button
                                                                    color="#fff"
                                                                    type="primary"
                                                                    style={{ width: 'auto' }}
                                                                    onClick={handleSubmitVote}
                                                                >
                                                                    Gửi đánh giá
                                                                </Button>
                                                            </div>
                                                            <div>
                                                                <Upload
                                                                    multiple
                                                                    showUploadList={false}
                                                                    onChange={handleUploadChange}
                                                                >
                                                                    <Button>Select Images</Button>
                                                                </Upload>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className={cx('container_filter-star')}>
                                                            <div className={cx('filter-review__label')}>Lọc theo</div>
                                                            <div className={cx('filter-review__inner')}>
                                                                <div
                                                                    className={cx('review_filter_item', {
                                                                        activeFilter: activeTabFilter === 'moi_nhat',
                                                                    })}
                                                                    onClick={() => handleTabClickFilter('moi_nhat')}
                                                                >
                                                                    <span className={cx('filter-review__text')}>
                                                                        Mới nhất
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={cx('review_filter_item', {
                                                                        activeFilter: activeTabFilter === '5sao',
                                                                    })}
                                                                    onClick={() => handleTabClickFilter('5sao')}
                                                                >
                                                                    <span className={cx('filter-review__text')}>
                                                                        5 sao
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={cx('review_filter_item', {
                                                                        activeFilter: activeTabFilter === '4sao',
                                                                    })}
                                                                    onClick={() => handleTabClickFilter('4sao')}
                                                                >
                                                                    <span className={cx('filter-review__text')}>
                                                                        4 sao
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={cx('review_filter_item', {
                                                                        activeFilter: activeTabFilter === '3sao',
                                                                    })}
                                                                    onClick={() => handleTabClickFilter('3sao')}
                                                                >
                                                                    <span className={cx('filter-review__text')}>
                                                                        3 sao
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={cx('review_filter_item', {
                                                                        activeFilter: activeTabFilter === '2sao',
                                                                    })}
                                                                    onClick={() => handleTabClickFilter('2sao')}
                                                                >
                                                                    <span className={cx('filter-review__text')}>
                                                                        2 sao
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={cx('review_filter_item', {
                                                                        activeFilter: activeTabFilter === '1sao',
                                                                    })}
                                                                    onClick={() => handleTabClickFilter('1sao')}
                                                                >
                                                                    <span className={cx('filter-review__text')}>
                                                                        1 sao
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
                                                <div className={cx('right_user')}>
                                                    <div>
                                                        <img
                                                            alt=""
                                                            style={{ borderRadius: '50%' }}
                                                            src={logoshop}
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                    <div className={cx('shop')}>
                                                        <div
                                                            className={cx('title_right')}
                                                            style={{ lineHeight: '1.5', fontWeight: '600' }}
                                                        >
                                                            MD
                                                        </div>
                                                        <div className={cx('wrap_shop')}>
                                                            <div className={cx('item')}>
                                                                <img alt="" src={offical} width={72} height={20} />
                                                            </div>
                                                            <div className={cx('content')}>
                                                                4.7{' '}
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    style={{ color: 'rgb(255,203,33)' }}
                                                                />{' '}
                                                                |{' '}
                                                                <span style={{ color: 'rgb(128, 128, 137)' }}>
                                                                    (5.4tr+ đánh giá)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
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
