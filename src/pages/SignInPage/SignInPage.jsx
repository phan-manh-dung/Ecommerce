import React, { useEffect, useState } from 'react';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { Checkbox, Input } from 'antd';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import * as UserService from '~/service/UserService';
import jwt_decoded from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    FacebookOutlined,
    GithubOutlined,
    HomeOutlined,
    InstagramOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHook } from '~/hook/useMutationHook';
import Loading from '~/component/LoadingComponent/Loading';
import { updateUser } from '~/redux/slide/userSlide';

const cx = classNames.bind(styles);

const SignInPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    // Trạng thái đăng nhập
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleNavigate = () => {
        navigate('/sign-up');
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        // Kiểm tra giá trị password ở đây nếu cần
        setPassword(value);
    };

    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            if (location?.state) {
                // state này đang dùng từ trang product detail
                navigate(location?.state);
            } else {
                navigate('/');
            }
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token)); // lưu token vào local storage
            if (data?.access_token) {
                const decoded = jwt_decoded(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

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
            setIsLoggedIn(true); // Cập nhật trạng thái đã đăng nhập thành công
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    if (!mutation) {
        return null;
    }

    const signInFacebook = () => {
        window.location.href = 'http://localhost:4000/facebook/redirect';
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
                        <div className={cx('icon')}>
                            <a className={cx('icon_brand')} href="https://www.facebook.com/jas.murad.353">
                                <FacebookOutlined style={{ width: '20px', height: '20px' }} />
                            </a>

                            <a href="/" className={cx('icon_brand')}>
                                <GithubOutlined style={{ width: '20px', height: '20px' }} />
                            </a>

                            <a href="/" className={cx('icon_brand')}>
                                <InstagramOutlined style={{ width: '20px', height: '20px' }} />
                            </a>

                            <a href="/" className={cx('icon_brand')}>
                                <LinkedinOutlined style={{ width: '20px', height: '20px' }} />
                            </a>
                        </div>
                        <div className={cx('home_back')}>
                            <a href="/">
                                <HomeOutlined style={{ color: '#fff', fontSize: '30px' }} />
                            </a>
                        </div>
                    </div>
                    <div className={cx('login')}>
                        <h2> Login </h2>
                        <div className={cx('input')}>
                            <Input
                                placeholder="Nhập email"
                                onChange={handleEmailChange}
                                value={name}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div
                            className={cx('input')}
                            style={{
                                display: 'flex',
                                position: 'relative',
                                alignItems: 'center',
                            }}
                        >
                            <Input
                                placeholder="Nhập password"
                                type={isShowPassword ? 'text' : 'password'}
                                onChange={handlePasswordChange}
                                value={password}
                                onKeyPress={handleKeyPress}
                            />
                            <span
                                style={{ position: 'absolute', left: '90%' }}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>
                        {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                        <div className={cx('check')}>
                            <label>
                                <Checkbox />
                                <span> Remember me</span>
                            </label>
                            <a href="#"> Forgot Password?</a>
                        </div>

                        <div className={cx('button')} onClick={handleLogin}>
                            <ButtonComponent
                                disabled={!name.length || !password.length}
                                className={cx('btn')}
                                textButton={'Đăng nhập'}
                                backgroundColor="rgb(254,67,79)"
                            />
                        </div>
                        <button onClick={signInFacebook}>Fb</button>
                        <div className={cx('sign-up')}>
                            <p> Don't have an account?</p>
                            <div onClick={handleNavigate}>
                                <span className={cx('')}> Sign up</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Loading>
    );
};

export default SignInPage;
