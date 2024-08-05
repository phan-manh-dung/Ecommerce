import React, { useState } from 'react';
import styles from './ForgotPassPage.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { message } from 'antd';
import * as UserService from '~/service/UserService';

const cx = classNames.bind(styles);

const ForgotPassPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  // JavaScript
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {},
        'expired-callback': () => {},
      });
    }
  }

  function handleSignUpError(error) {
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-phone-number':
          message.error('Invalid phone number format. Please check and try again.');
          break;
        case 'auth/missing-phone-number':
          message.error('Phone number is missing. Please provide a valid phone number.');
          break;
        case 'auth/quota-exceeded':
          message.error('SMS quota exceeded. Please try again later.');
          break;
        case 'auth/too-many-requests':
          message.error('Too many requests. Please try again later.');
          break;
        default:
          message.error('An unknown error occurred. Please try again.');
          break;
      }
    } else {
      message.error('An unknown error occurred. Please try again.');
    }
  }

  async function onSignUp() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;

    const response = await UserService.findPhoneForUser(ph);
    if (response === null) {
      message.error('Số điện thoại không tồn tại trong hệ thống');
      setLoading(false);
    } else {
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          message.success('OTP sended successfully!');
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        if (res.user) {
          message.success('OTP verified successfully!');
        }
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleSignUpError(err);
      });
  }

  return (
    <div className={cx('container_forgot')}>
      <div id="recaptcha-container"></div>
      <div className={cx('wrapper_forgot')}>
        <div className={cx('form_title')}>
          <span className={cx('content')}>Khôi phục mật khẩu</span>
        </div>
      </div>
      <div className={cx('wrapper_input')}>
        <div className={cx('note')}>
          <span>Nhập đúng số điện thoại bạn đăng kí</span>
        </div>
        {showOTP ? (
          <div className={cx('wrapper_btn')}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              className={cx('otp_container')}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
            ></OtpInput>
            <button onClick={onOTPVerify} className={cx('btn')}>
              {loading && <CgSpinner className={cx('icon')} size={20} />}
              <span>Verify OTP</span>
            </button>
          </div>
        ) : (
          <div className={cx('wrapper_btn')}>
            <PhoneInput country={'in'} value={ph} onChange={setPh} />
            <button className={cx('btn')} onClick={onSignUp}>
              {loading && <CgSpinner className={cx('icon')} size={20} />}
              <span>Send OTP</span>
            </button>
          </div>
        )}
        <div className={cx('wrapper_btn')}></div>
        <div className={cx('wrapper_home')}>
          <span onClick={() => navigate('/sign-in')}>Trở lại đăng nhập</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
