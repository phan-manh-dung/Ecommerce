/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import styles from './TypeProduct.module.scss';
import classNames from 'classnames/bind';

import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import { Checkbox, Col, InputNumber, Radio, Row } from 'antd';

import img_location from '~/assets/img_Global/location.png';
import img_now from '~/assets/img_Global/now.png';
import img_astra from '~/assets/img_Global/title_astra.png';
import img_durex from '~/assets/img_Global/durex.jpg';
import slide6 from '~/assets/img_Global/slide6.png';
import slide7 from '~/assets/img_Global/slide7.png';
import slide8 from '~/assets/img_Global/slide8.png';
import slide9 from '~/assets/img_Global/slide9.png';
import slide10 from '~/assets/img_Global/slide10.jpg';
import slide11 from '~/assets/img_Global/slide11.png';
import img_tulanh from '~/assets/img_Global/tulanh.png';
import img_tulanh2 from '~/assets/img_Global/tulanh2.jpg';
import img_now_red from '~/assets/img_Global/now_red.png';

import { CaretDownOutlined, CaretUpOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import CardComponent from '~/component/CardComponent/CardComponent';
import * as ProductService from '~/service/ProductService';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const TypeProductPage = () => {
    const { state } = useLocation();
    const [typeProduct, setTypeProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });
    const fetchProductType = async (type, page, limit) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status == 'OK') {
            setLoading(false);
            setTypeProduct(res?.data);
            setPanigate({ ...panigate, total: res?.totalPage });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);

    const [visibleCheckboxes, setVisibleCheckboxes] = useState(4);
    const [showMore, setShowMore] = useState(false);
    const dataShip = ['Hàng nội địa', 'Hàng quốc tế'];

    const supplierDataSupplier = [
        'Shop Mạnh Dũng',
        'Ingnot',
        'MinkStore',
        'Tiki Trading',
        'Lotte',
        'CircleK',
        'Landmask',
        'HomeMarst',
    ];

    const supplierBrands = ['DHC', 'Eucerin', 'Charme', 'PRETASA', 'Sagimi', 'Beurer', 'Vacosi'];

    const toggleMoreCheckboxes = () => {
        setVisibleCheckboxes(visibleCheckboxes + 4);
        setShowMore(true);
    };

    const toggleBackCheckboxes = () => {
        setVisibleCheckboxes(visibleCheckboxes - 4);
        setShowMore(false);
    };

    const arr = [
        'Chăm sóc da mặt',
        'Trang điểm ',
        'Chăm sóc cá nhân',
        'Chăm sóc cơ thể',
        'Dược mỹ phẩm',
        'Sản phẩm thiên nhiên & Khác',
    ];
    return (
        <div className={cx('container_type-User')}>
            <div className={cx('wrapper-type')}>
                <div className={cx('type-home')}>Trang chủ</div>
                <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
                <span className={cx('type-title')}>Làm Đẹp - Sức Khỏe</span>
            </div>
            <Row>
                <Col xs={0} sm={5}>
                    <div className={cx('wrapper_left')}>
                        <div className={cx('wrapper-category', 'scrollable-content')}>
                            <div className={cx('category')}>Danh mục sản phẩm</div>
                            <div className={cx('list_category')}>
                                {arr.map((item, index) => {
                                    return (
                                        <div className={cx('link')} key={index}>
                                            {item}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={cx('wrapper_address')}>
                                <img alt="location" src={img_location} height={20} width={20} />
                                <div className={cx('ship')}>Giao đến: </div>
                                <span className={cx('address')}>Tô ký, Quận 12 , Hồ Chí Minh</span>
                                <span></span>
                            </div>
                            <div className={cx('wrapper_service')}>
                                <span className={cx('title')}>Dịch vụ</span>
                                <div className={cx('wrapper_ship')}>
                                    <Checkbox defaultChecked={false}>Giao siêu tốc</Checkbox>
                                    <img alt="now" src={img_now} width={26} height={12} />
                                </div>
                                <div className={cx('wrapper_ship')}>
                                    <Checkbox defaultChecked={false}>Thưởng thêm Astra</Checkbox>
                                    <img alt="now" src={img_astra} width={26} height={12} />
                                </div>
                                <div className={cx('wrapper_ship')}>
                                    <Checkbox defaultChecked={false}>Trả góp 0%</Checkbox>
                                </div>
                                <div className={cx('wrapper_ship')}>
                                    <Checkbox defaultChecked={false}>Giảm sâu</Checkbox>
                                </div>
                            </div>
                            <div className={cx('wrapper_vote')}>
                                <span className={cx('title')}>Đánh giá</span>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, index) => (
                                            <StarFilled
                                                className={cx('star')}
                                                key={index}
                                                style={{ fontSize: '10px', color: '#ffce3d', width: 20, height: 20 }}
                                            />
                                        ))}
                                    <span>từ 5 sao</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, index) => (
                                            <StarFilled
                                                className={cx('star')}
                                                key={index}
                                                style={{
                                                    fontSize: '10px',
                                                    width: 20,
                                                    height: 20,
                                                    color: index >= 4 ? '#999' : '#ffce3d',
                                                }}
                                            />
                                        ))}
                                    <span>từ 4 sao</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, index) => (
                                            <StarFilled
                                                className={cx('star')}
                                                key={index}
                                                style={{
                                                    fontSize: '10px',

                                                    width: 20,
                                                    height: 20,
                                                    color: index >= 3 ? '#999' : '#ffce3d',
                                                }}
                                            />
                                        ))}
                                    <span>từ 3 sao</span>
                                </div>
                            </div>
                            <div className={cx('wrapper_brand')}>
                                <span className={cx('title')}>Thương hiệu</span>
                                {supplierBrands.slice(0, visibleCheckboxes).map((current, index) => (
                                    <div key={index} className={cx('wrapper_ship')}>
                                        <Checkbox defaultChecked={false}>{current}</Checkbox>
                                    </div>
                                ))}
                                {visibleCheckboxes < supplierBrands.length && (
                                    <div className={cx('button')} onClick={toggleMoreCheckboxes}>
                                        <span style={{ color: 'rgb(0,96,255)' }}>Xem thêm</span>
                                        <div style={{ paddingLeft: '4px' }}>
                                            <CaretDownOutlined style={{ color: 'rgb(0,96,255)' }} />
                                        </div>
                                    </div>
                                )}
                                {showMore && (
                                    <div className={cx('button')} onClick={toggleBackCheckboxes}>
                                        <span style={{ color: 'rgb(0,96,255)' }}>Thu gọn</span>
                                        <div style={{ paddingLeft: '4px' }}>
                                            <CaretUpOutlined style={{ color: 'rgb(0,96,255)' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={cx('wrapper_price')}>
                                <span className={cx('title')}>Giá</span>
                                <div className={cx('price_default')}>
                                    <div className={cx('price')}>Dưới 250.000</div>
                                </div>
                                <div className={cx('price_default')}>
                                    <div className={cx('price')}>250.000 đến 950.000</div>
                                </div>
                                <div className={cx('price_default')}>
                                    <div className={cx('price')}>Trên 950.000</div>
                                </div>
                                <div>
                                    <span className={cx('price_choose')}>Chọn khoảng giá</span>
                                    <div>
                                        <div className={cx('input')}>
                                            <InputNumber defaultValue={0} style={{ width: '35%', height: '30px' }} />
                                            <span> - </span>
                                            <InputNumber defaultValue={0} style={{ width: '35%', height: '30px' }} />
                                        </div>
                                        <div style={{ textAlign: 'center', paddingTop: '5px' }}>
                                            <ButtonComponent
                                                width="50%"
                                                color="rgb(11, 116, 229)"
                                                textButton="Áp dụng"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('wrapper_supplier')}>
                                <span className={cx('title')}>Nhà cung cấp</span>
                                {supplierDataSupplier.slice(0, visibleCheckboxes).map((supplier, index) => (
                                    <div className={cx('wrapper_ship')} key={index}>
                                        <Checkbox defaultChecked={false}>{supplier}</Checkbox>
                                    </div>
                                ))}
                                {visibleCheckboxes < supplierDataSupplier.length && (
                                    <div className={cx('button')} onClick={toggleMoreCheckboxes}>
                                        <span style={{ color: 'rgb(0,96,255)' }}>Xem thêm</span>
                                        <div style={{ paddingLeft: '4px' }}>
                                            <CaretDownOutlined style={{ color: 'rgb(0,96,255)' }} />
                                        </div>
                                    </div>
                                )}
                                {showMore && (
                                    <div className={cx('button')} onClick={toggleBackCheckboxes}>
                                        <span style={{ color: 'rgb(0,96,255)' }}>Thu gọn</span>
                                        <div style={{ paddingLeft: '4px' }}>
                                            <CaretUpOutlined style={{ color: 'rgb(0,96,255)' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={cx('wrapper_shipper')}>
                                <span className={cx('title')}>Giao hàng</span>
                                {dataShip.map((supplier, index) => (
                                    <div className={cx('wrapper_ship')} key={index}>
                                        <Radio value={supplier}>{supplier}</Radio>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('wrapper_img-durex')}>
                            <div className={cx('background-filter')}>
                                <div className={cx('durex')}>
                                    <img
                                        style={{ borderRadius: '4px' }}
                                        alt="durex"
                                        src={img_durex}
                                        width={120}
                                        height={120}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('wrapper_see-more')}>
                            <div className={cx('see_more')}>
                                <div className={cx('content')}>Giảm ngay 100K | Giao nhanh 2h</div>
                                <div className={cx('sponsor')}>Tài trợ bởi</div>
                                <div className={cx('durex')}>Gian hàng Durex tài trợ chính hãng</div>
                                <div className={cx('discount')}>Giảm 10%</div>
                                <div style={{ textAlign: 'center' }}>
                                    <a href="/">
                                        <ButtonComponent
                                            textButton="Xem thêm"
                                            backgroundColor="var(--primary-color)"
                                            color="#fff"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={19}>
                    <div className={cx('wrapper_right')}>
                        <div className={cx('right')}>
                            <div className={cx('search')}>
                                <h2 className={cx('search-title')}>Làm Đẹp - Sức Khỏe</h2>
                            </div>
                            <div className="slider_container">
                                <div className={cx('slide')}>
                                    <div className={cx('wrapper_slide')}>
                                        <img
                                            alt="bright"
                                            style={{ borderRadius: '8px' }}
                                            src={img_tulanh}
                                            width={470}
                                            height={165}
                                        />
                                        <img
                                            alt="bright"
                                            style={{ borderRadius: '8px' }}
                                            src={img_tulanh2}
                                            width={470}
                                            height={165}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('sort_list')}>
                                <div className={cx('sort')}>
                                    <div className={cx('sort_div')}>
                                        <a src="/">Phổ biến</a>
                                    </div>
                                    <div className={cx('sort_div')}>
                                        <a src="/">Bán chạy</a>
                                    </div>
                                    <div className={cx('sort_div')}>
                                        <a src="/">Hàng mới</a>
                                    </div>
                                    <div className={cx('sort_div')}>
                                        <a src="/">Giá thấp đến cao</a>
                                    </div>
                                    <div className={cx('sort_div')}>
                                        <a src="/">Giá cao đến thấp</a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('wrapper_now-red')}>
                                <div className={cx('now_red')}>
                                    <div style={{ display: 'flex' }} className="icon">
                                        <img alt="now_red" src={img_now_red} width={24} height={12} />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('container_user1')}>
                                <div className={cx('user1')}>
                                    {typeProduct?.map((products, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <CardComponent
                                                    key={products._id}
                                                    //key={index}
                                                    countInStock={products.countInStock}
                                                    description={products.description}
                                                    image={products.image}
                                                    name={products.name}
                                                    price={products.price}
                                                    rating={products.rating}
                                                    type={products.type}
                                                    discount={products.discount}
                                                    sold={products.sold}
                                                    id={products._id}
                                                />
                                                ;
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TypeProductPage;
