import React from 'react';

import styles from './NotFoundPage.module.scss';
import classNames from 'classnames/bind';

import not_page from '~/assets/gif/notfoundpage.gif';

const cx = classNames.bind(styles);

const NotFoundPage = () => {
    return (
        <div className={cx('container_found-page')}>
            <div
                className={cx('wrapper_page')}
                style={{
                    backgroundImage: `url(${not_page})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <h1>404</h1>
            </div>
            <div className={cx('footer')}>
                <div>
                    <h2>Có vẻ như bạn đang bị lạc</h2>
                    <p>Trang bạn đang tìm kiếm không có sẵn!</p>
                    <a href="/">Trang chủ</a>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
