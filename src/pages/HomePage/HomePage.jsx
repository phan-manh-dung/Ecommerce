import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useDebounce } from '~/hooks/useDebounce';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Col, message, Row } from 'antd';

import find_pay from '~/assets/img_Global/find_pay.png';

import SliderComponent from '~/component/SliderComponent/SliderComponent';
import TypeProductComponent from '~/component/TypeProductComponent/TypeProductComponent';
import CardComponent from '~/component/CardComponent/CardComponent';
import AssistantComponent from '~/component/AssistantComponent/AssistantComponent';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import Loading from '~/component/LoadingComponent/Loading';

import * as ProductService from '~/service/ProductService';
import SliderCardComponent from '~/component/SliderCardComponent/SliderCardComponent';

const cx = classNames.bind(styles);

const arrImageWeb = {
  slider1: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722411322/sewan65svafcomdxfjzi.webp',
  slider2: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722411322/a3zv5u7izdkn8gqjxpmu.webp',
  slider3: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722411184/dhob90iumzvrldnrrrrk.webp',
  topdeal: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412424/fcirbx1fdseipbgvl5dd.png',
  check: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/hsleh83irajvnzoschjx.png',
  box: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/bwm2ckqwhnmapogyx8nv.png',
  hoantra: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/owr8bcfrtrwiaey6s1xg.png',
  xetai: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/cnjnrccyo6zef1lbb3qs.png',
  ghim: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/nwtkaxsmpracd5zh6laj.png',
  foryou: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/p56e5ivcymlu6icdyeml.webp',
  storebook: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/lq96gpd8dkwodwknxwzr.webp',
  thethao: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412424/hmqnqqhvyu2vuttsvdyi.webp',
  giadung: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722412423/hlqcpc2nipnjgzjtaeie.webp',
  img1: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/m3wujhjuckxt6wq6d4pc.webp',
  img2: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/ipevdaau4d5ycxxapxoz.webp',
  img3: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/gjyufisfkw7wi00rk8ww.webp',
  img4: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/vrtw20pipghl4ghtrakg.webp',
  img5: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/wtrris6qdt1zepbqkadr.webp',
  img6: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/jbxyjdjqpn50wemkemlo.webp',
  img7: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/jqvau6gn5siao6xdzyyn.webp',
  img8: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/tgvm8aic23i8gjn6tpvj.webp',
  img9: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/rdit5u1qgtidrqvexa8q.webp',
  img10: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413019/mlzrohdp5tjcuxmxnohf.webp',
  img11: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/m8aowzdcgxfxyywnkirw.webp',
  img12: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/gdzshwgv0skmhlft52ti.webp',
  img13: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/m6cslh4fr8gh9x7eq9kj.webp',
  img14: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/jj2nfgdqoguo5cks235b.webp',
  img15: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/w8pwa3vtbokf75gkdqin.webp',
  img16: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/ft95qihvqbzrlciqqupf.webp',
  img17: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/nwyzxrtm41utexhc7jmv.webp',
  img18: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/yhjuql9jqsgmudho75ie.webp',
  img19: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/hmlmsc8iclaizv4ewryg.webp',
  img20: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413192/eqv7nowxppwltjo6zynk.webp',
  img21: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413223/ozhuc8hkxo114ytwvtbq.webp',
  img22: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/yomm6entzstrhuddihls.webp',
  img23: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/ppwbgxyillvzsh9rcs9h.webp',
  img24: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/cmubewzvkuyencara4h0.webp',
  img25: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/cmubewzvkuyencara4h0.webp',
  img26: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/x43udbfakbymrhgb7sw0.webp',
  img27: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413534/x5jlmn58ku6zhvgs1fkg.webp',
  img28: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/nlhl0lrchnwftxdzeq8d.webp',
  img29: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/luyph3jtyqpue4wlrpnh.webp',
  img30: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413534/ipeceuurhnaehseefi1u.webp',
  img31: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413534/ipeceuurhnaehseefi1u.webp',
  img32: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/sp29xtciibx7vov41fep.webp',
  img33: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413534/xeqcbbvvxs23fbejwheb.webp',
  img34: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/dj4fcfyjgw8jnuqqrinh.webp',
  img35: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413534/omg9jv74xmmp0behqipl.webp',
  img36: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/gdlcusvlurouikaigmg5.webp',
  img37: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/ffzpdjjyrtnohixpogee.webp',
  img38: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/sp29xtciibx7vov41fep.webp',
  img_store: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722413533/tiahmyxlwff1zdwmsyhe.webp',
};

const HomePage = () => {
  const navigate = useNavigate();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [limit, setLimit] = useState(20);
  const [typeProduct, setTypeProduct] = useState([]);
  const [activeTab, setActiveTab] = useState('Túi thời trang');
  const [activeTabImport, setActiveTabImport] = useState('Bánh kẹo');
  const [activeTabSuggestDay, setActiveTabSuggestDay] = useState('for_you');

  const arrImg = [
    arrImageWeb.img1,
    arrImageWeb.img2,
    arrImageWeb.img3,
    arrImageWeb.img4,
    arrImageWeb.img5,
    arrImageWeb.img6,
    arrImageWeb.img7,
    arrImageWeb.img8,
    arrImageWeb.img9,
    arrImageWeb.img10,
    arrImageWeb.img11,
    arrImageWeb.img12,
    arrImageWeb.img13,
    arrImageWeb.img14,
    arrImageWeb.img15,
    arrImageWeb.img16,
    arrImageWeb.img17,
    arrImageWeb.img18,
    arrImageWeb.img19,
    arrImageWeb.img20,
    arrImageWeb.img21,
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

  const arrDanhMuc = [
    arrImageWeb.img22,
    arrImageWeb.img23,
    arrImageWeb.img24,
    arrImageWeb.img25,
    arrImageWeb.img26,
    arrImageWeb.img27,
    arrImageWeb.img28,
    arrImageWeb.img29,
  ];

  const arrCamKet = ['100 % hàng thật', 'Hoàn 200% nếu hàng giả', '30 ngày đổi trả ', 'Giao nhanh 2h', 'Giá siêu rẻ'];

  const arrImgCamKet = [arrImageWeb.check, arrImageWeb.hoantra, arrImageWeb.box, arrImageWeb.xetai, arrImageWeb.ghim];

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

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật trạng thái của tab khi người dùng click vào
  };

  const handleTabClickImport = (tabImport) => {
    setActiveTabImport(tabImport);
  };

  const handleTabSuggestDay = (tabSuggest) => {
    setActiveTabSuggestDay(tabSuggest);
  };

  // button lood hết sản phẩm
  const handleLoadMore = () => {
    setLimit(product?.length);
  };

  // type
  const handleClick = (name) => {
    const productName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_');
    navigate(`/product/${productName}?name=${encodeURIComponent(name)}`);
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProduct(res?.data);
    }
  };

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const {
    isLoading,
    data: product,
    isPreviousData,
  } = useQuery(['product', limit, searchDebounce], fetchProductAll, {
    retry: 2,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  // lọc sản phẩm theo loại cho đề xuất
  const filterProducts = () => {
    if (activeTabSuggestDay === 'for_you') {
      return product?.data;
    } else {
      return product?.data?.filter((products) => products.type === activeTabSuggestDay);
    }
  };
  const filteredProducts = filterProducts();
  // điều kiện cho top deal
  const filterProductTopDeal = () => {
    return product?.data?.filter((products) => products.type === activeTab && products.discount >= 40);
  };
  const filteredProductTopDeal = filterProductTopDeal();
  // điều kiện cho nhập khẩu chính hãng
  const filterProductImport = () => {
    return product?.data?.filter(
      (products) => products.type === activeTabImport && products.originOfCountry !== 'vietnamese',
    );
  };
  const filteredProductImport = filterProductImport();

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  // check login
  const checkLogin1 = localStorage.getItem('isLoggedIn');
  useEffect(() => {
    if (checkLogin1 === 'true' && !isLoading) {
      message.success('Đăng nhập thành công');
      setTimeout(() => {
        localStorage.removeItem('isLoggedIn');
      }, 2000);
    }
  }, [checkLogin1, isLoading]);

  return (
    <Loading isLoading={isLoading}>
      <Helmet>
        <title>MD - Mua hàng nhanh chóng</title>
      </Helmet>
      <div>
        <div className={cx('container_main')}>
          {typeProduct.map((item) => {
            return <TypeProductComponent name={item} key={item} />;
          })}
        </div>
        <div className={cx('container_main2')}>
          <a alt="r" href="https://tiki.vn/thong-tin/tiki-doi-tra-de-dang-an-tam-mua-sam" target="blank">
            <div>Cam kết</div>
            <div className={cx('list')}>
              <div className={cx('child_list')}>
                {arrCamKet.map((item, index) => (
                  <div key={index} className={cx('item')}>
                    <img loading="lazy" src={arrImgCamKet[index]} alt={item} width={20} height={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className={cx('container_home')}>
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
                      <div key={index} className="wrapper-left_title" onClick={() => handleClick(arr2[index])}>
                        <div className={cx('container-img_title')}>
                          <div className="img_left">
                            <img loading="lazy" src={imgSrc} alt="img" width={32} height={32} />
                          </div>
                          <div className="title_left" style={{ paddingLeft: '10px' }}>
                            {arr2[index]}
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
                          <img loading="lazy" src={imgSrc} alt="img" width={32} height={32} />
                        </div>
                        <div className="title_left" style={{ paddingLeft: '10px' }}>
                          {arrTitleDanhMuc[index]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx('home-left2')}>
                <div className={cx('wrapper-title2')}>
                  <img loading="lazy" alt="store" src={arrImageWeb.img_store} width={32} height={32} />
                  <span className={cx('left-title2')}>Bán hàng cùng Dũng</span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} sm={19} className={cx('scrollable-content')}>
            {/* slide component */}
            <div>
              <SliderComponent arrImages={[arrImageWeb.slider1, arrImageWeb.slider2, arrImageWeb.slider3]} />
            </div>
            {/* assistant */}
            <div>
              <AssistantComponent />
            </div>
            {/* 2 */}
            <div className={cx('container_imgs')}>
              <div className={cx('item1')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img30} width={306} height={306} />
                </a>
              </div>
              <div className={cx('item2')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img31} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item3')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img32} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item4')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img33} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item5')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img34} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item6')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img35} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item7')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img36} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item8')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img37} width={146} height={146} />
                </a>
              </div>
              <div className={cx('item9')}>
                <a href="/">
                  <img loading="lazy" alt="" src={arrImageWeb.img38} width={146} height={146} />
                </a>
              </div>
            </div>

            {/* wrapper card top deal */}
            <div className={cx('container_card')}>
              <div className={cx('title_card')}>
                <img loading="lazy" alt="top deal" src={arrImageWeb.topdeal} width={204} height={32} />
              </div>
              <div className={cx('slider')}>
                <div
                  className={cx('category_product', { active: activeTab === 'Túi thời trang' })}
                  onClick={() => handleTabClick('Túi thời trang')}
                >
                  <span>Túi thời trang</span>
                </div>
                <div
                  className={cx('category_product', { active: activeTab === 'Giày - Dép' })}
                  onClick={() => handleTabClick('Giày - Dép')}
                >
                  <span>Giày - Dép </span>
                </div>
                <div
                  className={cx('category_product', { active: activeTab === 'Đồ điện tử' })}
                  onClick={() => handleTabClick('Đồ điện tử')}
                >
                  <span>Đồ điện tử</span>
                </div>
                <div
                  className={cx('category_product', { active: activeTab === 'Làm đẹp sức khỏe' })}
                  onClick={() => handleTabClick('Làm đẹp sức khỏe')}
                >
                  <span>Làm đẹp - sức khỏe</span>
                </div>
              </div>
              {filteredProductTopDeal?.length === 0 ? (
                <div className={cx('wrapper')}>
                  <div>
                    <img alt="find_pay" src={find_pay} width={200} height={200} />
                  </div>
                  <div style={{ fontSize: '16px' }}>Chưa có sản phẩm</div>
                </div>
              ) : (
                <div className={cx('wrapper_card')}>
                  <SliderCardComponent>
                    {filteredProductTopDeal?.map((products) => (
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
                        originOfCountry={products.originOfCountry}
                        id={products._id}
                      />
                    ))}
                  </SliderCardComponent>
                </div>
              )}
            </div>

            {/* wrapper card nhap khau chinh hang */}
            <div className={cx('container_card', 'card_import')}>
              <div className={cx('title_card', 'title_card_import')}>
                <div>Nhập khẩu chính hãng</div>
              </div>
              <div className={cx('slider')}>
                <div
                  className={cx('category_product', 'ct_import', {
                    activeImport: activeTabImport === 'Bánh kẹo',
                  })}
                  onClick={() => handleTabClickImport('Bánh kẹo')}
                >
                  <span>Bánh kẹo</span>
                </div>
                <div
                  className={cx('category_product', 'ct_import', {
                    activeImport: activeTabImport === 'Thực phẩm chức năng',
                  })}
                  onClick={() => handleTabClickImport('Thực phẩm chức năng')}
                >
                  <span>Thực phẩm chức năng</span>
                </div>
                <div
                  className={cx('category_product', 'ct_import', {
                    activeImport: activeTabImport === 'Đồ điện tử',
                  })}
                  onClick={() => handleTabClickImport('Đồ điện tử')}
                >
                  <span>Đồ điện tử</span>
                </div>
                <div
                  className={cx('category_product', 'ct_import', {
                    activeImport: activeTabImport === 'Mỹ phẩm',
                  })}
                  onClick={() => handleTabClickImport('Mỹ phẩm')}
                >
                  <span>Mỹ phẩm</span>
                </div>
              </div>
              {filterProductImport?.length === 0 ? (
                <div className={cx('wrapper')}>
                  <div>
                    <img alt="find_pay" src={find_pay} width={200} height={200} />
                  </div>
                  <div style={{ fontSize: '16px' }}>Chưa có sản phẩm</div>
                </div>
              ) : (
                <div className={cx('wrapper_card')}>
                  <SliderCardComponent rtl={true}>
                    {filteredProductImport?.map((products) => (
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
                        originOfCountry={products.originOfCountry}
                        id={products._id}
                      />
                    ))}
                  </SliderCardComponent>
                </div>
              )}
            </div>

            {/* today's suggestion */}
            <div className={cx('container_card', 'for_you')}>
              <div className={cx('title_card', 'title_for_you')}>
                <div>Gợi ý hôm nay</div>
              </div>
              <div className={cx('wrapper_list')}>
                <div
                  className={cx('child_list', {
                    activeSuggest: activeTabSuggestDay === 'for_you',
                  })}
                  onClick={() => handleTabSuggestDay('for_you')}
                >
                  <img loading="lazy" src={arrImageWeb.foryou} alt="img" width={40} height={40} />
                  <div>Dành cho bạn</div>
                </div>
                <div
                  className={cx('child_list', {
                    activeSuggest: activeTabSuggestDay === 'Sách vở',
                  })}
                  onClick={() => handleTabSuggestDay('Sách vở')}
                >
                  <img
                    loading="lazy"
                    src={arrImageWeb.storebook}
                    alt="img"
                    width={40}
                    height={40}
                    style={{ borderRadius: '4px' }}
                  />
                  <div>Sách xả kho -60%</div>
                </div>
                <div
                  className={cx('child_list', {
                    activeSuggest: activeTabSuggestDay === 'Thể thao',
                  })}
                  onClick={() => handleTabSuggestDay('Thể thao')}
                >
                  <img loading="lazy" src={arrImageWeb.thethao} alt="img" width={40} height={40} />
                  <div>Thể thao -50%</div>
                </div>
                <div
                  className={cx('child_list', {
                    activeSuggest: activeTabSuggestDay === 'Đồ gia dụng',
                  })}
                  onClick={() => handleTabSuggestDay('Đồ gia dụng')}
                >
                  <img loading="lazy" src={arrImageWeb.giadung} alt="img" width={40} height={40} />
                  <div>Gia dụng -50%</div>
                </div>
              </div>
              {filteredProducts?.length === 0 ? (
                <div className={cx('wrapper')}>
                  <div>
                    <img alt="find_pay" src={find_pay} width={200} height={200} />
                  </div>
                  <div style={{ fontSize: '16px' }}>Chưa có sản phẩm</div>
                </div>
              ) : (
                <div className={cx('wrapper_card')}>
                  <SliderCardComponent>
                    {filteredProducts?.map((products) => (
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
                        originOfCountry={products.originOfCountry}
                        id={products._id}
                      />
                    ))}
                  </SliderCardComponent>
                </div>
              )}
            </div>

            {/* button more */}
            <div className={cx('see_more')} onClick={handleLoadMore}>
              <ButtonComponent color="#fff" backgroundColor="#0099FF" textButton="Xem thêm" />
            </div>
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default HomePage;
