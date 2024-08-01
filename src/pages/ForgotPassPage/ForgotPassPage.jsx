import React, { useCallback, useEffect, useState } from 'react';
import firebase from '../../firebase';
import styles from './ForgotPassPage.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ForgotPassPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const setupRecaptcha = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Khởi tạo RecaptchaVerifier
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'normal', // Hoặc 'invisible' nếu bạn không muốn hiển thị reCAPTCHA
        defaultCountry: 'VN',
      });
      console.log(window.recaptchaVerifier); // Kiểm tra cấu hình
    }
  }, []);

  useEffect(() => {
    setupRecaptcha();
  }, [setupRecaptcha]);

  const handleSendOTP = async () => {
    const appVerifier = window.recaptchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert('Mã xác nhận đã được gửi');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleVerify = async () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        alert('Xác thực thành công', result);
        navigate('/reset-pass');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={cx('container_forgot')}>
      <div className={cx('wrapper_forgot')}>
        <div className={cx('form_title')}>
          <span className={cx('content')}>Khôi phục mật khẩu</span>
        </div>
      </div>
      <div className={cx('wrapper_input')}>
        <div className={cx('input')}>
          <span>Số điện thoại</span>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            maxLength={100}
            placeholder="Số điện thoại của bạn"
            className={cx('input-field')}
          />
        </div>
        <div className={cx('note')}>
          <span>Nhập đúng số điện thoại bạn đăng kí</span>
        </div>
        <div className={cx('wrapper_btn')}>
          <button value={otp} onChange={(e) => setOtp(e.target.value)} onClick={handleSendOTP} className={cx('btn')}>
            Lấy mã xác nhận
          </button>
        </div>
        <div className={cx('wrapper_btn')}>
          <button onClick={handleVerify} className={cx('btn')}>
            Xác thực mã
          </button>
        </div>
        <div className={cx('wrapper_home')}>
          <span onClick={() => navigate('/sign-in')}>Trở lại đăng nhập</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
