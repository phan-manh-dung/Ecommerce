import React, { useState, useEffect } from 'react';
import styles from './SmallLoading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SmallLoadingComponent = ({ children, isLoading }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowLoader(true));
    } else {
      setShowLoader(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      {showLoader ? (
        <div id="wifi-loader" className={cx('wifi-loader')}>
          <svg className={cx('circle-outer')} viewBox="0 0 86 86">
            <circle className={cx('back')} cx="43" cy="43" r="40"></circle>
            <circle className={cx('front')} cx="43" cy="43" r="40"></circle>
            <circle className={cx('new')} cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className={cx('circle-middle')} viewBox="0 0 60 60">
            <circle className={cx('back')} cx="30" cy="30" r="27"></circle>
            <circle className={cx('front')} cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className={cx('circle-inner')} viewBox="0 0 34 34">
            <circle className={cx('back')} cx="17" cy="17" r="14"></circle>
            <circle className={cx('front')} cx="17" cy="17" r="14"></circle>
          </svg>
          <div className={cx('text')} data-text="Searching"></div>
        </div>
      ) : (
        <div className={cx('content')}>{children}</div>
      )}
    </>
  );
};

export default SmallLoadingComponent;
