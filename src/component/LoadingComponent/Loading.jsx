import React, { useState, useEffect } from 'react';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Loading = ({ children, isLoading }) => {
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
        <div className={cx('loader')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 66 66"
            height="100px"
            width="100px"
            className={cx('spinner')}
          >
            <defs>
              <linearGradient id="gradient">
                <stop stopOpacity="1" stopColor="#fe0000" offset="0%"></stop>
                <stop stopOpacity="0" stopColor="#af3dff" offset="100%"></stop>
              </linearGradient>
            </defs>
            <circle
              stroke="url(#gradient)"
              r="20"
              cy="33"
              cx="33"
              strokeWidth="1"
              fill="transparent"
              className={cx('path')}
            ></circle>
          </svg>
        </div>
      ) : (
        <div className={cx({ content: showLoader })}>{children}</div>
      )}
    </>
  );
};

export default Loading;
