import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TypeProduct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TypeProduct = ({ name }) => {
    const navigate = useNavigate();
    const handleNavigateType = (type) => {
        navigate(
            `/product/${type
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                ?.replace(/ /g, '_')}`,
            { state: type },
        );
    };
    return (
        <div className={cx('wrapper_type')} onClick={() => handleNavigateType(name)}>
            {name}
        </div>
    );
};

export default TypeProduct;
