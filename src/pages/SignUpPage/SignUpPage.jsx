import React, { useState } from 'react';
import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';
import logo_shop from '../../assets/img_Global/logoshop.png';

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

const cx = classNames.bind(styles);

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/sign-in');
    };
    return (
        <div className={cx('container_wrapper')}>
            <header className={cx('header')}>
                {/* <div className={cx('logo_home')}>
                    <HomeOutlined />
                </div> */}
            </header>
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
                        <Input placeholder="Nhập email" />
                    </div>
                    <div
                        className={cx('input')}
                        style={{
                            display: 'flex',
                            position: 'relative',
                            alignItems: 'center',
                        }}
                    >
                        <Input placeholder="Nhập password" type={isShowPassword ? 'text' : 'password'} />
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
                        <Input placeholder="Nhập lại password" type={isShowConfirmPassword ? 'text' : 'password'} />
                        <span
                            style={{ position: 'absolute', left: '90%' }}
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        >
                            {isShowConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>
                    <div className={cx('button')}>
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
