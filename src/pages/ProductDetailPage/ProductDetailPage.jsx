import React, { useState } from 'react';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import img_pay from '~/assets/img_Global/pay.png';
import img_khien from '~/assets/img_Global/khien.png';
import img1 from '~/assets/img_Global/slide10.jpg';
import product1 from '~/assets/img_products/dongu1.jpg';
import product2 from '~/assets/img_products/dongu2.jpg';
import product3 from '~/assets/img_products/dongu3.jpg';
import product4 from '~/assets/img_products/dongu4.jpg';
import product5 from '~/assets/img_products/dongu5.jpg';
import product6 from '~/assets/img_products/donu6.jpg';
import product7 from '~/assets/img_products/donu7.jpg';
import product8 from '~/assets/img_products/donu8.jpg';

import { Col, InputNumber, Row } from 'antd';
import { CaretLeftOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';

const cx = classNames.bind(styles);

const ProductDetailPage = () => {
    const [addState, setAddState] = useState(1);
    const arrImageProducts = [product2, product3, product4, product5, product6, product7, product8];
    const [startIndex, setStartIndex] = useState(0);
    const imagesToShow = 6;
    const visibleImages = arrImageProducts.slice(startIndex, startIndex + imagesToShow);

    const addValueProduct = () => {
        setAddState(addState + 1);
    };
    const backValueProduct = () => {
        if (addState > 1) {
            setAddState(addState - 1);
        }
    };

    const showNextImages = () => {
        const nextIndex = startIndex + imagesToShow;
        if (nextIndex < arrImageProducts.length) {
            setStartIndex(nextIndex);
        }
    };
    const showPreviousImages = () => {
        const previousIndex = startIndex - imagesToShow;
        if (previousIndex >= 0) {
            setStartIndex(previousIndex);
        }
    };

    return (
        <div className={cx('container_product')}>
            <div className={cx('wrapper_product')}>
                <div className={cx('wrapper-type')}>
                    <div className={cx('type-home')}>Trang chủ</div>
                    <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                    <span className={cx('type-title')}>Làm Đẹp - Sức Khỏe</span>
                </div>
                <div className={cx('wrapper_row')}>
                    <Row>
                        <Col xs={0} sm={8}>
                            <div className={cx('product_left')}>
                                <div className={cx('left')}>
                                    <img alt="donu1" src={product1} width={368} height={368} />
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
                                        {startIndex + imagesToShow < arrImageProducts.length && (
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
                                            <div className={cx('name')}>
                                                Đồ Ngủ Sexy Nữ | Váy Ngủ Dễ Thương️ Chất Liệu Ren Mềm Mịn Quyến Rũ
                                            </div>
                                            <div className={cx('star')}>
                                                <div className={cx('vote')}>4</div>
                                                {Array(5)
                                                    .fill(null)
                                                    .map((_, index) => (
                                                        <StarFilled
                                                            className={cx('star_icon')}
                                                            key={index}
                                                            style={{
                                                                fontSize: '10px',
                                                                color: '#ffce3d',
                                                                width: 20,
                                                                height: 20,
                                                            }}
                                                        />
                                                    ))}
                                                <span className={cx('comment')}>(14)</span>
                                                <span className={cx('sold')}>| 150</span>
                                            </div>
                                            <div className={cx('wrapper_price')}>
                                                <div className={cx('price')}>115.000</div>
                                            </div>
                                            <div className={cx('color')}>Màu sắc</div>
                                            <div className={cx('choose_color')}>
                                                <div className={cx('choose')}>
                                                    <img alt="img" src={product1} width={38} height={38} />
                                                </div>
                                                <div className={cx('choose_name')}>Hồng N85</div>
                                            </div>
                                            <div className={cx('choose_color')}>
                                                <div className={cx('choose')}>
                                                    <img alt="img" src={product1} width={38} height={38} />
                                                </div>
                                                <div className={cx('choose_name')}>Hồng N85</div>
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
                                                <span className={cx('address')}>Quận 12, Hồ Chí Minh</span>
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
                                    <div className={cx('right_product')}>
                                        <div>
                                            <img alt="" src={product1} width={40} height={40} />
                                        </div>
                                        <div className={cx('title_right')}>Đỏ 89 free size</div>
                                    </div>
                                    <div className={cx('quantity')}>
                                        <div>
                                            <span style={{ fontWeight: '500' }}>Số lượng</span>
                                        </div>
                                        <div className={cx('wrapper_add')}>
                                            <div className={cx('add')} onClick={backValueProduct}>
                                                <MinusOutlined />
                                            </div>
                                            <div className={cx('input')}>
                                                <InputNumber readOnly value={addState} style={{ width: '90%' }} />
                                            </div>
                                            <div className={cx('add')} onClick={addValueProduct}>
                                                <PlusOutlined />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('provisional')}>Tạm tính</div>
                                    <div className={cx('price')}>225.000</div>
                                    <div className={cx('wrapper_button')}>
                                        <div className={cx('button')}>
                                            <div style={{ paddingBottom: '10px' }}>
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
    );
};

export default ProductDetailPage;
