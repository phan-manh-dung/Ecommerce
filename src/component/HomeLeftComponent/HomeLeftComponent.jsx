import React from 'react';
import styles from '~/pages/HomePage/HomePage.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
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

const HomeLeftComponent = ({ isTrue }) => {
  const navigate = useNavigate();

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

  const handleClick = (name) => {
    const productName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_');
    navigate(`/product/${productName}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className={cx('wrapper_home-left', 'scrollable-content', { display_none: !isTrue })}>
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
                  <div className="title_left" style={{ paddingLeft: '10px', fontSize: '1em' }}>
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
  );
};

export default HomeLeftComponent;
