import React from 'react';
import { Input } from 'antd';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const InputSearch = ({ size, width, height, ...props }) => {
  return <Input className={cx('style_input')} {...props} placeholder="Giao hàng nhanh chóng tiết kiệm" />;
};

export default InputSearch;
