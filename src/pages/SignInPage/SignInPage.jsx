import React from 'react';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { Checkbox, Input } from 'antd';
import ButtonComponent from '~/component/ButtonComponent/Buttoncomponent';
import { FacebookOutlined, GithubOutlined, HomeOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const SignInPage = () => {
    return (
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
                        <Input placeholder="Nhập email" />
                    </div>
                    <div className={cx('input')}>
                        <Input placeholder="Nhập password" />
                    </div>
                    <div className={cx('check')}>
                        <label>
                            <Checkbox />
                            <span> Remember me</span>
                        </label>
                        <a href="#"> Forgot Password?</a>
                    </div>
                    <div className={cx('button')}>
                        <ButtonComponent className={cx('btn')} textButton={'Login'} backgroundColor="rgb(254,67,79)" />
                    </div>
                    <div className={cx('sign-up')}>
                        <p> Don't have an account?</p>
                        <a href="#"> Sign up</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignInPage;
