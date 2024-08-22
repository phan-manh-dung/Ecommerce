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
import { useMutationHook } from '~/hook/useMutationHook';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const ForgotPassPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [checkNewPass, setCheckNewPass] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

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
      setIdUser(response?._id);
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
          setCheckNewPass(true);
          setShowOTP(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleSignUpError(err);
      });
  }

  const handleOnChangeNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleOnChangeConfirmNewPass = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleResetPassword = async (data) => {
    try {
      if (newPass === '' || newPass === null) {
        message.error('Mật khẩu không được để trống !');
      } else if (newPass.length < 6) {
        message.error('Mật khẩu phải lớn hơn 6 kí tự !');
      } else if (newPass !== confirmPass) {
        message.error('Mật khẩu không khớp !');
      } else {
        const response = await UserService.resetPassWordForUser({ userId: idUser, phone: ph, newPassword: newPass });
        if (response.status === 'OK') {
          console.log('response', response);
          message.success('Cập nhật mật khẩu thành công !');
        } else if (response.status === 'ERROR') {
          message.error('Cập nhật mật khẩu thất bại !');
        } else {
          message.error('Có lỗi xảy ra !');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('container_forgot')}>
      <div id="recaptcha-container"></div>
      <div className={cx('wrapper_forgot')}>
        <div className={cx('form_title')}>
          <span className={cx('content')}>Khôi phục mật khẩu</span>
        </div>
      </div>
      <div className={cx('wrapper_input')}>
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
        ) : checkNewPass ? (
          <div className={cx('wrapper_new-password')}>
            <div className={cx('field', 'edit_field')}>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                className={cx('input-icon')}
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                value={newPass}
                onChange={handleOnChangeNewPass}
                className={cx('input-field')}
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Mật khẩu mới"
              />
              <span style={{ position: 'absolute', left: '85%' }} onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </div>
            <div className={cx('field', 'edit_field')}>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                className={cx('input-icon')}
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                value={confirmPass}
                onChange={handleOnChangeConfirmNewPass}
                className={cx('input-field')}
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            <div className={cx('button_update')}>
              <button
                onClick={handleResetPassword}
                className={cx('btn')}
                style={{ fontSize: '1.4rem', background: 'blue' }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        ) : (
          <div className={cx('wrapper_btn')}>
            <div className={cx('note')}>
              <span>Nhập đúng số điện thoại bạn đăng kí !</span>
            </div>
            <PhoneInput country={'in'} value={ph} onChange={setPh} />
            <button className={cx('btn')} onClick={onSignUp}>
              {loading && <CgSpinner className={cx('icon')} size={20} />}
              <span>Send OTP</span>
            </button>
          </div>
        )}
        <div className={cx('wrapper_btn')}></div>
      </div>
      <div className={cx('wrapper_home')}>
        <span onClick={() => navigate('/sign-in')}>Trở lại đăng nhập</span>
      </div>
    </div>
  );
};

export default ForgotPassPage;
