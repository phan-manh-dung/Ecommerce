import React, { useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_pay from '~/assets/img_Global/pay.png';
import img_khien from '~/assets/img_Global/khien.png';
import img1 from '~/assets/img_Global/slide10.jpg';
import User1 from '~/assets/img_products/dongu1.jpg';
import User2 from '~/assets/img_products/dongu2.jpg';
import User3 from '~/assets/img_products/dongu3.jpg';
import User4 from '~/assets/img_products/dongu4.jpg';
import User5 from '~/assets/img_products/dongu5.jpg';
import User6 from '~/assets/img_products/donu6.jpg';
import User7 from '~/assets/img_products/donu7.jpg';
import User8 from '~/assets/img_products/donu8.jpg';

import { Col, InputNumber, Row } from 'antd';
import { CaretLeftOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import * as ProductService from '~/service/ProductService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '~/redux/slide/orderSlide';
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

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productsDetail?.name,
                        amount: numProduct,
                        image: productsDetail?.image,
                        price: productsDetail?.price,
                        product: productsDetail?._id,
                        color: productsDetail?.color,
                        discount: productsDetail?.discount,
                        type: productsDetail?.type,
                    },
                }),
            );
        }
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
                        <span className={cx('type-title')}>{productsDetail?.name}</span>
                    </div>
                    <div className={cx('wrapper_row')}>
                        <Row>
                            <Col xs={0} sm={8}>
                                <div className={cx('user_left')}>
                                    <div className={cx('left')}>
                                        <img alt="donu1" src={User1} width={368} height={368} />
                                    </div>

                                    <div>
                                        <div className={cx('img_list')}>
                                            {visibleImages.map((current, index) => (
                                                <div key={index} className={cx('img')}>
                                                    <img alt="anh" src={current} width={45} height={45} />
                                                </div>
                                            ))}
                                            {startIndex > 0 && (
                                                <div onClick={showPreviousImages} className={cx('button_right')}>
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
                            </Col>
                            <Col xs={0} sm={8}>
                                <div className={cx('container_wrapper-center', 'scrollable-content')}>
                                    <div className={cx('center')}>
                                        <div className={cx('wrapper_center')}>
                                            <div className={cx('center1')}>
                                                <div className={cx('brand')}>
                                                    Thương hiệu: <div style={{ color: 'rgb(13, 92, 182)' }}> OCM</div>{' '}
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
                                                    <span className={cx('sold')}>{productsDetail?.sold}</span>
                                                </div>
                                                <div className={cx('wrapper_price')}>
                                                    <div className={cx('price')}>{productsDetail?.price}</div>
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
                                                    <span className={cx('address')}>{user?.address}</span>
                                                </div>
                                                <div>
                                                    <span className={cx('change')}>Đổi</span>
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
                                                    <span style={{ marginLeft: '10px' }}>Mua trước trả sau</span>
                                                </div>
                                                <div>
                                                    <span>Đổi</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={0} sm={8}>
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
                                                    onClick={() => handleChangeCount('decrease', numProduct === 1)}
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
                                                    <InputNumber readOnly value={numProduct} style={{ width: '90%' }} />
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
                                        <div className={cx('price')}>225.000</div>
                                        <div className={cx('wrapper_button')}>
                                            <div className={cx('button')}>
                                                <div style={{ paddingBottom: '10px' }} onClick={handleAddOrderProduct}>
                                                    <ButtonComponent
                                                        color="#fff"
                                                        backgroundColor="rgb(255, 66, 78)"
                                                        width="90%"
                                                        textButton="Mua ngay"
                                                        height="40px"
                                                    />
                                                </div>
                                                <div>
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
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Loading>
    );
};

export default ProductDetailComponent;
