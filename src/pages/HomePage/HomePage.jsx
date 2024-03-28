import React, { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

import SliderComponent from '~/component/SliderComponent/SliderComponent';
import slider1 from '~/assets/img_Global/slide1.png';
import slider2 from '~/assets/img_Global/slide2.png';
import slider3 from '~/assets/img_Global/slide3.png';
import { Col, Row } from 'antd';

import TypeProductComponent from '~/component/TypeProductComponent/TypeProductComponent';
import img1 from '../../assets/img_category/img1.png';
import img2 from '../../assets/img_category/img2.png';
import img3 from '../../assets/img_category/img3.png';
import img4 from '../../assets/img_category/img4.png';
import img5 from '../../assets/img_category/img5.png';
import img6 from '../../assets/img_category/tuithoitrangnam.jpg';
import img7 from '../../assets/img_category/donghovatrangsuc.jpg';
import img8 from '../../assets/img_category/giaydepnam.jpg';
import img9 from '../../assets/img_category/giaydepnu.jpg';
import img10 from '../../assets/img_category/hangquocte.jpg';
import img11 from '../../assets/img_category/thoitrangnu.jpg';
import img12 from '../../assets/img_category/ngon.jpg';
import img13 from '../../assets/img_category/nhaccuadoisong.jpg';
import img14 from '../../assets/img_category/phukienthoitrang.jpg';
import img15 from '../../assets/img_category/nhacsach.jpg';
import img16 from '../../assets/img_category/bachhoaonline.jpg';
import img17 from '../../assets/img_category/dientudienlanh.jpg';
import img18 from '../../assets/img_category/mayanhquayphim.jpg';
import img19 from '../../assets/img_category/otoxemay.jpg';
import img20 from '../../assets/img_category/thethaodangoai.jpg';
import img21 from '../../assets/img_category/thietbidientu.jpg';

import img22 from '../../assets/img_category/exchange.jpg';
import img23 from '../../assets/img_category/nowtotvanhanh.jpg';
import img24 from '../../assets/img_category/giaremoingay.jpg';
import img25 from '../../assets/img_category/xakho.jpg';
import img26 from '../../assets/img_category/magiamgia.jpg';
import img27 from '../../assets/img_category/uudaithevi.jpg';
import img28 from '../../assets/img_category/dongtien.jpg';
import img29 from '../../assets/img_category/muatrc.jpg';

import img30 from '../../assets/img_products/product1.jpg';
import img31 from '../../assets/img_products/product2.jpg';
import img32 from '../../assets/img_products/product3.jpg';
import img33 from '../../assets/img_products/product4.jpg';
import img34 from '../../assets/img_products/product5.jpg';
import img35 from '../../assets/img_products/product6.jpg';
import img36 from '../../assets/img_products/product7.jpg';
import img37 from '../../assets/img_products/product8.jpg';
import img38 from '../../assets/img_products/product9.jpg';

import img_store from '../../assets/img_Global/store.png';
import CardComponent from '~/component/CardComponent/CardComponent';
import AssistantComponent from '~/component/AssistantComponent/AssistantComponent';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '~/service/ProductService';
import { useSelector } from 'react-redux';
import Loading from '~/component/LoadingComponent/Loading';
import { useDebounce } from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);
    const [limit, setLimit] = useState(6);
    const [loading, setLoading] = useState(false);
    const [typeProduct, setTypeProduct] = useState([]);
    const arrImg = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18,
        img19,
        img20,
        img21,
    ];
    const arr2 = [
        'Đồ chơi - Mẹ và bé ',
        'Máy tính bảng',
        'Son - Make up',
        'Nồi chiên',
        'Túi xách',
        'Túi thời trang nam',
        'Đồng hồ',
        'Giày dép nam',
        'Giày dép nữ',
        'Đồ quốc tế',
        'Thời trang nữ',
        'NGON',
        'Đời sống sức khỏe',
        'Mắt kính',
        'Nhà sách của Dũng',
        'Bách hóa online',
        'Điện tử - điện lạnh',
        'Máy ảnh - quay phim',
        'Oto - Xe máy - Xe đạp',
        'Thể thao dã ngoại',
        'Tai nghe',
    ];

    const arrDanhMuc = [img22, img23, img24, img25, img26, img27, img28, img29];

    const arrTitleDanhMuc = [
        'Exchange',
        'Tốt & nhanh',
        'Giá rẻ mỗi ngày',
        'Xả kho',
        'Mã giảm giá',
        'Ưu đãi thẻ , ví',
        'Đóng tiền , nạp thẻ',
        'Mua trước trả sau',
    ];

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);

        return res;
    };

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProduct(res?.data);
        }
    };

    const {
        isLoading,
        data: product,
        isPreviousData,
    } = useQuery(['product', limit, searchDebounce], fetchProductAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    return (
        <Loading isLoading={isLoading || loading}>
            <div className={cx('container_home')}>
                <div className={cx('container_main')}>
                    {typeProduct.map((item) => {
                        return <TypeProductComponent name={item} key={item} />;
                    })}
                </div>
                <Row>
                    <Col xs={0} sm={5}>
                        <div className={cx('wrapper_home-left', 'scrollable-content')}>
                            <div className={cx('home-left')}>
                                <div className={cx('wrapper-title')}>
                                    <span className={cx('left-title')}>Danh mục</span>
                                </div>
                                <div>
                                    <div className={cx('wrapper-left_title')}>
                                        {arrImg.map((imgSrc, index) => (
                                            <div key={index} className="wrapper-left_title">
                                                <div className={cx('container-img_title')}>
                                                    <div className="img_left">
                                                        <img src={imgSrc} alt="img" width={32} height={32} />
                                                    </div>
                                                    <div className="title_left" style={{ paddingLeft: '10px' }}>
                                                        {arr2[index]} {/* Hiển thị tiêu đề từ mảng arr2 */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('home-left2')}>
                                <div className={cx('wrapper-title')}>
                                    <span className={cx('left-title')}>Nổi bật</span>
                                </div>
                                <div className={cx('wrapper-left_title')}>
                                    {arrDanhMuc.map((imgSrc, index) => (
                                        <div key={index} className="wrapper-left_title">
                                            <div className={cx('container-img_title')}>
                                                <div className="img_left">
                                                    <img src={imgSrc} alt="img" width={32} height={32} />
                                                </div>
                                                <div className="title_left" style={{ paddingLeft: '10px' }}>
                                                    {arrTitleDanhMuc[index]} {/* Hiển thị tiêu đề từ mảng arr2 */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('home-left2')}>
                                <div className={cx('wrapper-title2')}>
                                    <img alt="store" src={img_store} width={32} height={32} />
                                    <span className={cx('left-title2')}>Bán hàng cùng Dũng</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={19} className={cx('scrollable-content')}>
                        {/* slide component */}
                        <div>
                            <SliderComponent arrImages={[slider1, slider2, slider3]} />
                        </div>
                        {/* assistant */}
                        <div>
                            <AssistantComponent />
                        </div>
                        {/* 2 */}
                        <div className={cx('container_imgs')}>
                            <div className={cx('item1')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img30} width={306} height={306} />
                                </a>
                            </div>
                            <div className={cx('item2')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img31} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item3')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img32} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item4')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img33} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item5')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img34} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item6')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img35} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item7')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img36} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item8')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img37} width={146} height={146} />
                                </a>
                            </div>
                            <div className={cx('item9')}>
                                <a href="/">
                                    <img loading="lazy" alt="" src={img38} width={146} height={146} />
                                </a>
                            </div>
                        </div>

                        {/* wrapper card */}
                        <div className={cx('wrapper_card')}>
                            {product?.data?.map((products) => {
                                return (
                                    <CardComponent
                                        key={products._id}
                                        countInStock={products.countInStock}
                                        description={products.description}
                                        image={products.image}
                                        name={products.name}
                                        price={products.price}
                                        rating={products.rating}
                                        type={products.type}
                                        discount={products.discount}
                                        sold={products.sold}
                                        id={products._id} // id này truyền qua card component để card truyền qua product  detail
                                    />
                                );
                            })}
                        </div>

                        {/* button more */}
                        <div className={cx('see_more')} onClick={() => setLimit((prev) => prev + 1)}>
                            <ButtonComponent color="#fff" backgroundColor="#0099FF" textButton="Xem thêm" />
                        </div>
                    </Col>
                </Row>
            </div>
        </Loading>
    );
};

export default HomePage;
