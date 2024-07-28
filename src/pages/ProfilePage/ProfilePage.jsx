import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Col, Radio, Row, Upload } from 'antd';
import {
  faBell,
  faBox,
  faClipboard,
  faComment,
  faCreditCard,
  faEnvelope,
  faEye,
  faHeartCirclePlus,
  faKey,
  faLocationDot,
  faPhone,
  faShieldVirus,
  faStarHalfStroke,
  faUser,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import ListProfileComponent from '~/component/ListProfileComponent/ListProfileComponent';

import img_user from '~/assets/img_Global/user_profile.png';
import img_facebook from '~/assets/img_Global/facebook.png';
import img_google from '~/assets/img_Global/google.png';
import astra_reward from '~/assets/img_Global/astra_reward.png';
import astra from '~/assets/img_Global/astra_red.png';
import img_right_arrow from '~/assets/img_Global/right_arrow.png';
import avatar_blue from '~/assets/img_Global/avatar_blue.png';
import img_pen from '~/assets/img_Global/pen.png';

import Input from 'antd/es/input/Input';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import * as UserService from '~/service/UserService';
import * as message from '~/component/Message/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHook } from '~/hook/useMutationHook';
import Loading from '~/component/LoadingComponent/Loading';
import { updateUser, updateUserSlice } from '~/redux/slide/userSlide';
import { getBase64 } from '~/utils';
import AddressComponent from '~/component/AddressComponent/AddressComponent';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState('');
  const [sex, setSex] = useState('');
  const [country, setCountry] = useState('');
  const [nickname, setNickName] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [dataPhone, setDataPhone] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  });

  const mutationUpdate = useMutationHook(
    (data) => {
      const { id, access_token, ...rests } = data;
      return UserService.updateUser(id, rests, access_token);
    },
    {
      onSuccess: () => {
        setIsSubmit(true); // Khi mutation hoàn tất, cập nhật isSubmit thành true
      },
    },
  );

  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  useEffect(() => {
    if (isSuccessUpdated) {
      message.successUpdate();
    } else if (isErrorUpdated) {
      message.errorUpdate();
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  const handleOnchangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleOnchangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleOnchangePhone = (event) => {
    const value = event.target.value;
    if (value.length < 0) {
      setDataPhone(false);
    } else if (value.length > 0) {
      setPhone(value);
      setDataPhone(true);
    }
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleOnChangeDate = (e, type) => {
    const value = e.target.value;

    setDateOfBirth((prevDate) => {
      return {
        ...prevDate,
        [type]: value,
      };
    });
  };

  const handleOnchangeSex = (value) => {
    setSex(value);
  };
  const handleOnchangeCountry = (e) => {
    const value = e.target.value;
    if (value) {
      setCountry(value);
    }
  };
  const handleOnchangeNickName = (event) => {
    const value = event.target.value;
    setNickName(value);
  };

  const handleSubmit = async () => {
    const convertDate = new Date(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day);
    await mutationUpdate.mutate({
      id: user?.id,
      name,
      nickname,
      dateOfBirth: convertDate,
      sex,
      avatar,
      country,
      email,
      access_token: user?.access_token,
    });
    dispatch(
      updateUserSlice({
        id: user?.id,
        token: user?.access_token,
        name,
        nickname,
        dateOfBirth: convertDate,
        sex,
        avatar,
        country,
      }),
    );
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
    setSex(user?.sex);
    setCountry(user?.country);
    setNickName(user?.nickname);
    if (user?.dateOfBirth) {
      const date = new Date(user?.dateOfBirth);
      const day = Number(date.getDate());
      const month = Number(date.getMonth());
      const year = Number(date.getUTCFullYear());
      // Gán giá trị vào các select box
      setDateOfBirth({
        day,
        month,
        year,
      });
    }
  }, [user]);

  const handleSubmitPhone = async () => {
    try {
      if (dataPhone === false) {
        alert('Bạn hãy nhập phone.');
      } else {
        await mutationUpdate.mutate({
          id: user?.id,
          phone,
          access_token: user?.access_token,
        });
      }
    } catch (err) {}
  };

  const handleSubmitEmail = async () => {
    if (email === false) {
      alert('Bạn hãy nhập email');
    } else {
      await mutationUpdate.mutate({
        id: user?.id,
        email,
        access_token: user?.access_token,
      });
    }
  };

  const arrImage = [
    faUser,
    faBell,
    faClipboard,
    faBox,
    faLocationDot,
    faCreditCard,
    faComment,
    faEye,
    faHeartCirclePlus,
    faStarHalfStroke,
    faHeadset,
  ];
  const arrTitleLeft = [
    'Thông tin tài khoản',
    'Thông báo của tôi',
    'Quản lý đơn hàng',
    'Quản lý đổi trả',
    'Sổ địa chỉ',
    'Thông tin thanh toán',
    'Đánh giá sản phẩm',
    'Sản phẩm bạn đã xem',
    'Sản phẩm yêu thích',
    'Nhận xét của tôi',
    'Hỗ trợ khách hàng',
  ];
  const arrCounstry = ['VietNamese', 'Japan', 'Franch', 'Italy', 'Egypt', 'India'];
  const phoneCode = ['+84', '+81', '+33', '+39', '+20', '+91'];

  function getPhoneCode(country) {
    let phoneCode = '';
    switch (country) {
      case 'VietNamese':
        phoneCode = '+84';
        break;
      case 'Japan':
        phoneCode = '+81';
        break;
      case 'Franch':
        phoneCode = '+33';
        break;
      case 'Italy':
        phoneCode = '+39';
        break;
      case 'Egypt':
        phoneCode = '+20';
        break;
      case 'India':
        phoneCode = '+91';
        break;
      default:
        phoneCode = 'Country not found';
    }
    return phoneCode;
  }

  return (
    <div className={cx('container_profile')}>
      <Helmet>
        <title>Tài khoản của bạn</title>
      </Helmet>
      <Loading isLoading={isLoadingUpdated}>
        <div className={cx('wrapper_profile')}>
          <div className={cx('wrapper-type')}>
            <div className={cx('type-home')}>Trang chủ</div>
            <img alt="right_arrow" src={img_right_arrow} width={18} height={18} />
            <span className={cx('type-title')}>Thông tin tài khoản</span>
          </div>
          <Row>
            <Col xs={0} sm={5}>
              <div className={cx('container_left')}>
                <div className={cx('wrapper_left')}>
                  <div className={cx('user')}>
                    <div className={cx('img')}>
                      {avatar ? (
                        <div>
                          <img className={cx('wrapper_form')} alt="img" src={avatar} width={50} height={50} />
                        </div>
                      ) : (
                        <div>
                          <img className={cx('wrapper_form')} alt="" src={img_user} style={{ width: '52px' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ paddingLeft: '12px' }}>
                      <p>Tài khoản của</p>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: '1.6rem',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user?.name || 'Chưa có'}
                      </p>
                    </div>
                  </div>
                  {/* list left */}
                  {arrTitleLeft.map((current, index) => {
                    const icon = arrImage[index % arrImage.length];
                    return <ListProfileComponent key={index} src={icon} name={current} />;
                  })}
                  {/* list left 2 */}
                  <div className={cx('left_list')}>
                    <a href="/" className={cx('wrapper_list')}>
                      <div style={{ marginRight: '16px' }}>
                        <img alt="" src={astra_reward} width={24} height={24} />
                      </div>
                      <span style={{ color: 'rgb(0,0,0)', fontSize: '13px' }}>Astra Reward</span>
                    </a>
                  </div>

                  <div className={cx('left_list')}>
                    <a href="/" className={cx('wrapper_list')}>
                      <div style={{ marginRight: '16px' }}>
                        <img alt="" src={astra} width={24} height={24} />
                      </div>
                      <span style={{ color: 'rgb(0,0,0)', fontSize: '13px' }}>Astra của bạn</span>
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={0} sm={19}>
              <div className={cx('information')}>Thông tin tài khoản</div>
              <div className={cx('container_right')}>
                <div className={cx('wrapper_right')}>
                  <div className={cx('wrapper_content')}>
                    <Row>
                      <Col xs={0} sm={12}>
                        <div className={cx('wrapper_right-left')}>
                          <div className={cx('right-left')}>
                            <span className={cx('info-title')}>Thông tin cá nhân</span>
                          </div>
                          <div className={cx('form-info')}>
                            <div className={cx('wrapper_form')}>
                              {avatar ? (
                                <div>
                                  <img className={cx('wrapper_form')} alt="img" src={avatar} width={50} height={50} />
                                </div>
                              ) : (
                                <img alt="img" src={avatar_blue} width={50} height={50} />
                              )}
                              {/* avatar */}

                              <Upload
                                maxCount={1}
                                showUploadList={false}
                                className={cx('pen')}
                                onChange={handleOnchangeAvatar}
                              >
                                <img alt="pen" width={10} height={10} src={img_pen} />
                              </Upload>
                            </div>
                            <div className={cx('wrapper_input')}>
                              {/* name */}
                              <div
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                }}
                              >
                                <div>
                                  <label style={{ paddingRight: '40px' }}>Họ & tên</label>
                                </div>
                                <div>
                                  <Input onInput={handleOnchangeName} value={name} style={{ width: '100%' }} />
                                </div>
                              </div>
                              {/* nickname */}
                              <div
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                }}
                              >
                                <div>
                                  <label style={{ paddingRight: '40px' }}>Nickname</label>
                                </div>
                                <div>
                                  <Input style={{ width: '100%' }} onInput={handleOnchangeNickName} value={nickname} />
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </div>
                          {/* date */}
                          <div className={cx('wrapper-date')}>
                            <label className={cx('title-date')}>Ngày sinh</label>
                            <div className={cx('input-date')}>
                              <select
                                value={dateOfBirth.day}
                                name="day"
                                className={cx('select-day')}
                                onChange={(e) => handleOnChangeDate(e, 'day')}
                              >
                                <option value="0">Ngày</option>
                                {Array.from({ length: 30 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={dateOfBirth.month}
                                name="month"
                                className={cx('select-day')}
                                onChange={(e) => handleOnChangeDate(e, 'month')}
                              >
                                <option value="0">Tháng</option>
                                {Array.from({ length: 12 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={dateOfBirth.year}
                                name="year"
                                className={cx('select-day')}
                                onChange={(e) => handleOnChangeDate(e, 'year')}
                              >
                                <option value="0">Năm</option>
                                {Array.from({ length: 200 }, (_, index) => (
                                  <option key={index + 1} value={index + 1900}>
                                    {index + 1900}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* gioi tinh */}
                          <div className={cx('wrapper-date')}>
                            <label className={cx('title-date')}>Giới tính</label>
                            <Radio value="Nam" checked={sex === 'Nam'} onChange={() => handleOnchangeSex('Nam')}>
                              Nam
                            </Radio>

                            <Radio value="Nữ" checked={sex === 'Nữ'} onChange={() => handleOnchangeSex('Nữ')}>
                              Nữ
                            </Radio>

                            <Radio value="Khác" checked={sex === 'Khác'} onChange={() => handleOnchangeSex('Khác')}>
                              Khác
                            </Radio>
                          </div>
                          {/* component address */}
                          <div>
                            <AddressComponent />
                          </div>
                          {/* quoc tich */}
                          <div className={cx('wrapper-date')}>
                            <label className={cx('title-date')}>Quốc tịch</label>
                            <select
                              name="country"
                              className={cx('country')}
                              value={country}
                              onChange={handleOnchangeCountry}
                            >
                              <option value=""></option>
                              {arrCounstry.map((current, index) => {
                                const value = arrCounstry[index % arrCounstry.length];
                                return (
                                  <option key={index} value={value}>
                                    {value}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          {/* button luu */}
                          <div className={cx('save')} onClick={handleSubmit}>
                            <ButtonComponent
                              className={cx('button-save')}
                              textButton="Lưu thay đổi"
                              width="38%"
                              color="#fff"
                              backgroundColor="rgb(11, 116, 229)"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={0} sm={12}>
                        <div className={cx('wrapper_right-right')}>
                          <div className={cx('right-right')}>
                            <div className={cx('right-left')}>
                              <span className={cx('info-title')}>Số điện thoại & Email</span>
                            </div>
                            {/* so dien thoai */}
                            <div className={cx('sdt')}>
                              <div className={cx('wrapper-sdt')}>
                                <FontAwesomeIcon
                                  style={{ width: '18px', height: '18px' }}
                                  icon={faPhone}
                                  color="#999"
                                />
                                <div className={cx('detail')}>
                                  <span style={{ padding: '4px 11px' }}>Số điện thoại</span>
                                  <div>
                                    <div style={{ padding: '0px 11px' }}>
                                      <div className={cx('style-flex')}>
                                        <span style={{ fontSize: '12px' }}>{getPhoneCode(user?.country)}</span>
                                        <Input
                                          placeholder="Nhập phone..."
                                          onInput={handleOnchangePhone}
                                          value={phone}
                                          style={{
                                            width: '100%',
                                            border: 'none',
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div onClick={handleSubmitPhone}>
                                <ButtonComponent
                                  className={cx('status-button')}
                                  textButton="Cập nhật"
                                  width="100%"
                                  height={28}
                                />
                              </div>
                            </div>
                            {/* Email */}
                            <div className={cx('sdt')}>
                              <div className={cx('wrapper-sdt')}>
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  style={{ width: '18px', height: '18px' }}
                                  color="#999"
                                />
                                <div className={cx('detail')}>
                                  <span style={{ padding: '4px 11px' }}>Địa chỉ Email</span>
                                  <div style={{ maxWidth: '100%', width: '300px' }}>
                                    <Input
                                      onInput={handleOnchangeEmail}
                                      value={user?.email}
                                      placeholder="Nhập email..."
                                      style={{ width: '100%', border: 'none' }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className={cx('status')} onClick={handleSubmitEmail}>
                                <ButtonComponent
                                  className={cx('status-button')}
                                  textButton="Cập nhật"
                                  width="100%"
                                  height={28}
                                />
                              </div>
                            </div>
                            {/* bao mat */}
                            <div className={cx('right-left')}>
                              <span className={cx('info-title')}>Bảo mật</span>
                            </div>
                            {/* Mật khẩu */}
                            <div className={cx('sdt')}>
                              <div className={cx('wrapper-sdt')}>
                                <FontAwesomeIcon icon={faKey} style={{ width: '18px', height: '18px' }} color="#999" />
                                <div className={cx('detail')}>
                                  <span>Thiết lập bảo mật</span>
                                </div>
                              </div>
                              <div className={cx('status')}>
                                <ButtonComponent
                                  className={cx('status-button')}
                                  textButton="Thiết lập"
                                  width="100%"
                                  height={28}
                                />
                              </div>
                            </div>
                            {/* Mã pin */}
                            <div className={cx('sdt')}>
                              <div className={cx('wrapper-sdt')}>
                                <FontAwesomeIcon
                                  icon={faShieldVirus}
                                  style={{ width: '18px', height: '18px' }}
                                  color="#999"
                                />
                                <div className={cx('detail')}>
                                  <span>Tạo mã pin</span>
                                </div>
                              </div>
                              <div className={cx('status')}>
                                <ButtonComponent
                                  className={cx('status-button')}
                                  textButton="Thiết lập"
                                  width="100%"
                                  height={28}
                                />
                              </div>
                            </div>
                            {/* Liên kết mạng xh */}
                            <div className={cx('right-left')}>
                              <span className={cx('info-title')}>Liên kết mạng xã hội</span>
                            </div>
                            {/* facebook */}
                            {user?.loginType !== 'facebook' ? (
                              <div className={cx('sdt')}>
                                <div className={cx('wrapper-sdt')}>
                                  <img alt="facebook" src={img_google} width={24} height={24} />
                                  <div className={cx('detail')}>
                                    <span>Google</span>
                                  </div>
                                </div>
                                <div className={cx('status')}>
                                  <ButtonComponent
                                    className={cx('status-button')}
                                    textButton="Đã thiết lập"
                                    width="100%"
                                    height={28}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className={cx('sdt')}>
                                <div className={cx('wrapper-sdt')}>
                                  <img alt="facebook" src={img_facebook} width={24} height={24} />
                                  <div className={cx('detail')}>
                                    <span>Facebook</span>
                                  </div>
                                </div>
                                <div className={cx('status')}>
                                  <ButtonComponent
                                    disabled={true}
                                    className={cx('status-button')}
                                    textButton="Đã thiết lập"
                                    width="100%"
                                    height={28}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Loading>
    </div>
  );
};

export default ProfilePage;
