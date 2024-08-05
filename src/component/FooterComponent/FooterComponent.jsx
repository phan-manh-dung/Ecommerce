import React, { useEffect, useState } from 'react';
import styles from './FooterComponent.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { useInView } from 'react-intersection-observer';

const cx = classNames.bind(styles);

const arrImageWeb = {
  khonghanggia: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/aa4unh2dmhc2w145jawv.png',
  dmca: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/rj5yvjwmmu7zx8ue7x7r.png',
  tt1: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/ke87mjuacxre1u6sbsdt.png',
  tt2: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/nicxhfwbbxxqqiseshyk.jpg',
  tt3: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/kqckhbsgidrswi7rymqo.png',
  tt4: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/iw3fujgc2p2zqjwxlhar.png',
  tt5: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426744/disedt28awfjszdwpflr.png',
  fb: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722427288/ooqqg4lisipteeolhkie.png',
  linkedin: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426744/wflizdyxyewajzletuu4.png',
  zalo: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426744/cilzndrxbz3dfyi1v8oe.png',
  chplay: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/wbpsvf0gsfheftsp9kn7.png',
  appstore: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722426743/qeg5o9wm7rck9zasdkg5.png',
};

const FooterComponent = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsFooterVisible(true);
    }
  }, [inView]);
  const arrHelpCustomer = [
    ' Các câu hỏi thường gặp',
    'Gửi yêu cầu hỗ trợ',
    'Hướng dẫn đặt hàng',
    'Phương thức vận chuyển',
    'Chính sách đổi trả',
    'Hướng dẫn trả góp',
    'Chính sách hàng nhập khẩu',
    'Hỗ trợ khách hàng: dungcongnghiep4@gmail.com',
    'Báo lỗi bảo mật: dungcongnghiep4@gmail.com',
  ];

  const arrMyShop = [
    'Giới thiệu Shop MD',
    'ShopMD Blog',
    'Tuyển dụng',
    'Chính sách bảo mật thanh toán',
    'Chính sách bảo mật thông tin cá nhân',
    'Chính sách giải quyết khiếu nại',
    'Điều khoản sử dụng',
    'Giới thiệu MD Xu',
    'Gói hội viên VIP',
    'Tiếp thị liên kết cùng Shop',
    'Bán hàng doanh nghiệp',
    'Điều kiện vận chuyển',
  ];

  const arrCooperate = ['Quy chế hoạt động Sàn GDTMĐT', 'Bán hàng cùng Shop MD'];
  const arrPayment = [arrImageWeb.tt1, arrImageWeb.tt2, arrImageWeb.tt3, arrImageWeb.tt4, arrImageWeb.tt5];
  return (
    <div ref={ref} className={cx('wrapper_footer')}>
      {isFooterVisible && (
        <div className={cx('container_footer')}>
          <Row>
            <Col span={5}>
              <div className={cx('help_customer')}>
                <span className={cx('title')}>Hỗ trợ khách hàng</span>
                <div className={cx('content')}>
                  <a href="tel:0373286662" className={cx('text')}>
                    Hotline: <span style={{ color: 'black', fontSize: '13px' }}>0373286662</span>
                  </a>
                  {arrHelpCustomer.map((item, index) => (
                    <a href="/" className={cx('text')} key={index}>
                      <span className={cx('text1')}>{item}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
            <Col span={5}>
              <div className={cx('help_customer')}>
                <span className={cx('title')}>Shop MD</span>
                <div className={cx('content')}>
                  {arrMyShop.map((item, index) => (
                    <a href="/" className={cx('text')} key={index}>
                      <span className={cx('text1')}>{item}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
            <Col span={5}>
              <div className={cx('help_customer')}>
                <span className={cx('title')}>Hợp tác và liên kết</span>
                <div className={cx('content')}>
                  {arrCooperate.map((item, index) => (
                    <a href="/" className={cx('text')} key={index}>
                      <span className={cx('text1')}>{item}</span>
                    </a>
                  ))}
                </div>
                <div style={{ margin: '16px 0' }}>
                  <span className={cx('title')}>Chứng nhận bởi</span>
                  <div style={{ padding: '10px 0', display: 'flex' }}>
                    <img loading="lazy" alt="logo" src={arrImageWeb.khonghanggia} width={32} height={32} />
                    <div style={{ padding: '0 6px' }}>
                      <img
                        loading="lazy"
                        alt="logo"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                        width={83}
                        height={32}
                      />
                    </div>
                    <img loading="lazy" alt="logo" src={arrImageWeb.dmca} width={32} height={32} />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={5}>
              <div className={cx('help_customer')}>
                <span className={cx('title')}>Phương thức thanh toán</span>
                <div className={cx('payment')}>
                  {arrPayment.map((index, item) => (
                    <span key={item} style={{ padding: '0 4px' }}>
                      <img loading="lazy" alt="" src={index} width={32} height={33} />
                    </span>
                  ))}
                </div>
                <span className={cx('title')}>Dịch vụ giao hàng</span>
              </div>
            </Col>
            <Col span={4}>
              <div className={cx('help_customer')}>
                <span className={cx('title')}>Kết nối với chúng tôi</span>
                <div className={cx('social')}>
                  <div className={cx('icon_social')}>
                    <a href="https://www.facebook.com/jas.murad.353" target="_blank" rel="noopener noreferrer">
                      <img loading="lazy" alt="" src={arrImageWeb.fb} width={32} height={33} />
                    </a>
                  </div>
                  <div className={cx('icon_social')}>
                    <a href="http://zalo.me/0373286662" target="_blank" rel="noopener noreferrer">
                      <img loading="lazy" alt="" src={arrImageWeb.zalo} width={32} height={33} />
                    </a>
                  </div>
                  <div className={cx('icon_social')}>
                    <a href="https://www.linkedin.com/in/phan-manh-dung/" target="_blank" rel="noopener noreferrer">
                      <img loading="lazy" alt="" src={arrImageWeb.linkedin} width={32} height={33} />
                    </a>
                  </div>
                </div>
                <div style={{ padding: '10px 0' }}>
                  <span className={cx('title')}>Tải ứng dụng trên điện thoại</span>
                  <div>
                    <a href="/">
                      <img loading="lazy" src={arrImageWeb.chplay} width={122} height={36} alt="" />
                    </a>
                  </div>
                  <div>
                    <a href="/">
                      <img loading="lazy" src={arrImageWeb.appstore} width={122} height={36} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className={cx('information')}>
            <p>
              Trụ sở chính: Tòa nhà E-Tower, Số 285, đường Cách Mạng Tháng 8, phường 12, quận 10, Thành phố Hồ Chí Minh
            </p>
            <p>
              Shop MD nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn
              phòng hoặc trung tâm xử lý đơn hàng
            </p>
            <p>
              Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp lần
              đầu ngày 06/01/2010 và sửa đổi lần thứ 23 ngày 14/02/2022
            </p>
            <p>© 2022 - Bản quyền của Công ty TNHH Mạnh Dũng</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterComponent;
