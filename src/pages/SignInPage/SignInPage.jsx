import React, { useEffect, useState } from 'react';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { Checkbox, message } from 'antd';
import * as UserService from '~/service/UserService';
import jwt_decoded from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHook } from '~/hook/useMutationHook';
import Loading from '~/component/LoadingComponent/Loading';
import { updateUser } from '~/redux/slide/userSlide';
import google from '~/assets/img_Global/google.png';
import facebook from '~/assets/img_Global/facebook.png';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleNavigate = () => {
    navigate('/sign-up');
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (data.status === 'ERR') {
        message.error(data.message);
      } else {
        if (location?.state) {
          navigate(location?.state);
        } else {
          navigate('/');
        }
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('access_token', JSON.stringify(data?.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token)); // lưu token vào local storage
        if (data?.access_token) {
          const decoded = jwt_decoded(data?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, data?.access_token);
          }
        }
      }
    } else {
      if (isError) {
      }
    }
  }, [isSuccess, data, location, navigate, isError]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleLogin = () => {
    if (mutation) {
      mutation.mutate({
        name,
        password,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    } else {
      return null;
    }
  };

  if (!mutation) {
    return null;
  }

  const handleSignInSocial = (type) => {
    window.open(`http://localhost:4000/api/auth/${type}`, '_self');
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
                <p className={cx('heading')}>Login</p>
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
                    onChange={handleEmailChange}
                    value={name}
                    type="text"
                    placeholder="Username"
                    onKeyPress={handleKeyPress}
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
                    onChange={handlePasswordChange}
                    value={password}
                    onKeyPress={handleKeyPress}
                    autoComplete="current-password"
                  />
                  <span
                    style={{ position: 'absolute', left: '85%' }}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </span>
                </div>

                <div className={cx('wrapper_check')}>
                  <label>
                    <Checkbox />
                    <span style={{ paddingLeft: '6px', color: '#eee', fontSize: '1.3rem' }}> Remember me</span>
                  </label>
                </div>
                <div className={cx('btn')}>
                  <button type="button" className={cx('button1')} onClick={handleLogin}>
                    Login
                  </button>
                  <button type="button" className={cx('button2')} onClick={handleNavigate}>
                    Sign Up
                  </button>
                </div>
                <button className={cx('button3')}>Forgot Password</button>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ color: '#fff' }}>Hoặc</span>
                </div>
                <div className={cx('wrapper_button-social')}>
                  <button type="button" className={cx('button_social')} onClick={() => handleSignInSocial('google')}>
                    <img alt="google" src={google} width={22} height={22} />
                    <span className={cx('title_button')}>Google</span>
                  </button>
                </div>
                <div className={cx('wrapper_button-social')}>
                  <button type="button" className={cx('button_social')} onClick={() => handleSignInSocial('facebook')}>
                    <img alt="facebook" src={facebook} width={24} height={24} />
                    <span className={cx('title_button')}> Facebook</span>
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
