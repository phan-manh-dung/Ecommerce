import React, { useCallback, useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '~/service/UserService';
import * as message from '~/component/Message/Message';
import { useMutationHook } from '~/hook/useMutationHook';
import Loading from '~/component/LoadingComponent/Loading';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // regex  password
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleNavigate = () => {
    navigate('/sign-in');
  };
  const onChangeEmail = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const onchangeConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const mutation = useMutationHook((data) => UserService.signUpUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  const handleSignIn = useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  useEffect(() => {
    if (isSuccess) {
      message.success('Tạo tài khoản thành công');
      handleSignIn();
    } else if (isError) {
      message.error(data?.message);
    }
  }, [isSuccess, isError, data, handleSignIn]);

  // check chuỗi có dấu
  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };
  // kiểm tra password có dấu
  const passwordWithoutTones = removeVietnameseTones(password);
  // tạo tài khoản
  const handleSignUp = () => {
    if (name === '' || name === null || name === undefined || name.length < 6) {
      message.error('Tên người dùng trên 6 kí tự !');
    } else if (!passwordRegex.test(passwordWithoutTones)) {
      message.error('Mật khẩu không được có dấu');
    } else if (password === '' || password === null || password === undefined || password.length < 6) {
      message.error('Mật khẩu 6 kí tự chữ và số !');
    } else if (confirmPassword !== password) {
      message.error('Mật khẩu không khớp !');
    } else {
      mutation.mutate({
        name,
        password,
        confirmPassword,
      });
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <div className={cx('container_wrapper')}>
        <header className={cx('header')}></header>
        <div className={cx('background')}></div>
        <section className={cx('home')}>
          <div className={cx('content')}>
            <h2> Welcome!</h2>
            <h3> To Our Manh Dung Website </h3>
            <pre>Wishing you a pleasant visit to the website</pre>
            <div className={cx('wrapper_icon')}>
              <div>
                <a href="/">
                  <FacebookOutlined className={cx('icon')} />
                </a>
              </div>
              <div>
                <a href="/">
                  <GithubOutlined className={cx('icon')} />
                </a>
              </div>
              <div>
                <a href="/">
                  {' '}
                  <LinkedinOutlined className={cx('icon')} />
                </a>
              </div>
              <div>
                <a href="/">
                  <YoutubeOutlined className={cx('icon')} />
                </a>
              </div>
            </div>
          </div>
          <div className={cx('card')}>
            <div className={cx('card2')}>
              <form className={cx('form')}>
                <p className={cx('heading')}>Sign up</p>
                <div className={cx('field')}>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cx('input-icon')}
                  >
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                  </svg>
                  <input
                    className={cx('input-field')}
                    value={name}
                    type="text"
                    placeholder="Username"
                    onChange={onChangeEmail}
                  />
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
                    className={cx('input-field')}
                    placeholder="Password"
                    type={isShowPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onChangePassword}
                  />
                  <span
                    style={{ position: 'absolute', left: '85%' }}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
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
                    className={cx('input-field')}
                    placeholder="Confirm password"
                    type={isShowPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={onchangeConfirmPassword}
                  />
                  <span
                    style={{ position: 'absolute', left: '85%' }}
                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                  >
                    {isShowConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </span>
                </div>
                <div className={cx('btn')} onClick={handleSignUp}>
                  <button type="button" className={cx('button1')}>
                    Tạo tài khoản
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Loading>
  );
};

export default SignInPage;
