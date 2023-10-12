import React, { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

import SliderComponent from '~/component/SliderComponent/SliderComponent';
import slider1 from '~/assets/img_Global/slide1.png';
import slider2 from '~/assets/img_Global/slide2.png';
import slider3 from '~/assets/img_Global/slide3.png';
import { Col, Row } from 'antd';
import CategoryComponent from '~/component/CategoryComponent/CategoryComponent';
import TypeProductComponent from '~/component/TypeProductComponent/TypeProductComponent';
import img1 from '../../assets/img_category/img1.png';
import img2 from '../../assets/img_category/img2.png';
import img3 from '../../assets/img_category/img3.png';
import img4 from '../../assets/img_category/img4.png';
import img5 from '../../assets/img_category/img5.png';
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
    const arr = ['TV', 'Laptop', 'Điện thoại', 'Cái khác'];
    const arrImg = [img1, img2, img3, img4, img5];
    const arr2 = ['Đồ chơi trẻ em ', 'Máy tính bảng', 'Laptop', 'Thời trang nam', 'Túi xách'];

    const fetchUserAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);

        return res;
    };
    const {
        isLoading,
        data: product,
        isPreviousData,
    } = useQuery(['product', limit, searchDebounce], fetchUserAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    return (
        <Loading isLoading={isLoading || loading}>
            <div className={cx('container_home')}>
                <div className={cx('container_main')}>
                    {arr.map((item) => {
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
                                        <div>
                                            {arrImg.map((img) => {
                                                return <CategoryComponent width={32} height={32} src={img} key={img} />;
                                            })}
                                        </div>
                                        <div>
                                            {arr2.map((max) => {
                                                return <CategoryComponent name={max} key={max} />;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('home-left2')}>
                                <div className={cx('wrapper-title')}>
                                    <span className={cx('left-title')}>Nổi bật</span>
                                </div>
                                <div>
                                    <div className={cx('wrapper-left_title')}>
                                        <div>
                                            {arrImg.map((img) => {
                                                return <CategoryComponent width={32} height={32} src={img} key={img} />;
                                            })}
                                        </div>
                                        <div>
                                            {arr2.map((max) => {
                                                return <CategoryComponent name={max} key={max} />;
                                            })}
                                        </div>
                                    </div>
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
                    <Col xs={0} sm={19}>
                        <div>
                            <SliderComponent arrImages={[slider1, slider2, slider3]} />
                        </div>
                        <div>
                            <AssistantComponent />
                        </div>

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
