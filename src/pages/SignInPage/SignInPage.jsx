import React from 'react';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import img_background from '~/assets/img_Global/img_background.jpg';
import { Input } from 'antd';

const cx = classNames.bind(styles);

const SignInPage = () => {
    return (
        <div className={cx('container_wrapper')}>
            {/* <img src={img_background} style={{ maxWidth: '100%' }} /> */}
            <header class="header">
                <nav class="nav">
                    <a href="#"> Home </a>
                    <a href="#"> About </a>
                    <a href="#"> Service </a>
                    <a href="#"> Contact </a>
                </nav>
                <div class="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <i class="fa-solid fa-user"></i>
                </div>
            </header>
            <div class="background"></div>
            <section class="home">
                <div class="content">
                    <a href="#" class="logo">
                        {' '}
                        <i class="fa-solid fa-paper-plane"></i>Ddoans
                    </a>
                    <h2> Welcome!</h2>
                    <h3> To Our Nem Website </h3>
                    <pre> Lorem ipsum, dolor sit amen consenter adipisicing elit. Beatae,asperiores </pre>
                    <div class="icon">
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-github"></i>
                    </div>
                </div>
                <div class="login">
                    <h2> Login </h2>
                    <div class="input">
                        <Input placeholder="Nhập email" />
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="input">
                        <Input placeholder="Nhập password" />
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <div class="check">
                        <label>
                            {' '}
                            <Input />
                            Remember me{' '}
                        </label>
                        <a href="#"> Forgot Password?</a>
                    </div>
                    <div class="button">
                        <button class="btn"> Login </button>
                    </div>
                    <div class="sign-up">
                        <p> Don't have an account?</p>
                        <a href="#"> Sign up</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignInPage;
