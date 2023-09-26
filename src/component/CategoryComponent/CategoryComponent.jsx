import React from 'react';
import styles from './Category.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CategoryComponent = ({ name, src, width, height }) => {
    return (
        <div className={cx('wrapper-category')}>
            <div className={cx('category-name')}>{name}</div>
            <div className={cx('category-img')}>
                <img alt="" src={src} width={width} height={height} />
            </div>
        </div>
    );
};

export default CategoryComponent;
