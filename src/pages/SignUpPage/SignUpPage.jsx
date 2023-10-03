import React, { useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';

import { Input } from 'antd';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    FacebookOutlined,
    GithubOutlined,
    HomeOutlined,
    InstagramOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '~/service/UserService';
import * as message from '~/component/Message/Message';
import { useMutationHook } from '~/hook/useMutationHook';

const cx = classNames.bind(styles);

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/sign-in');
    };
    const onChangeEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
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

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleSignIn();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
        });
    };

    const handleSignIn = () => {
        navigate('/sign-in');
    };

    return (
        <div className={cx('container_wrapper')}>
            <header className={cx('header')}></header>
            <div className={cx('background')}></div>
            <section className={cx('home')}>
                <div className={cx('content')}>
                    <div>
                        <h2> Welcome!</h2>
                        <h3> To Our Manh Dung Website </h3>
                        <pre>Wishing you a pleasant visit to the website</pre>
                    </div>
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
                    <h2> Sign Up </h2>
                    <div className={cx('input')}>
                        <Input placeholder="Nhập email" onChange={onChangeEmail} value={email} />
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
                            onChange={onChangePassword}
                            value={password}
                        />
                        <span
                            style={{ position: 'absolute', left: '90%' }}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
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
                            placeholder="Nhập lại password"
                            type={isShowConfirmPassword ? 'text' : 'password'}
                            onChange={onchangeConfirmPassword}
                            value={confirmPassword}
                        />
                        <span
                            style={{ position: 'absolute', left: '90%' }}
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        >
                            {isShowConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <div className={cx('button')} onClick={handleSignUp}>
                        <ButtonComponent className={cx('btn')} textButton={'Login'} backgroundColor="rgb(254,67,79)" />
                    </div>
                    <div className={cx('sign-up')} onClick={handleNavigate}>
                        <p> Already have an account?</p>
                        <span> Sign in</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignInPage;
