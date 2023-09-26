import React from 'react';
import styles from './TypeProduct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TypeProductComponent = ({ name }) => {
    return <div className={cx('wrapper_type')}>{name}</div>;
};

export default TypeProductComponent;
