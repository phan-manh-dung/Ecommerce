import React from 'react';
import styles from './ListProfile.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const ListProfileComponent = ({ name, width, height, src }) => {
    return (
        <div className={cx('left_list')}>
            <a href="/" className={cx('wrapper_list')}>
                <div style={{ marginRight: '22px' }}>
                    <FontAwesomeIcon icon={src} style={{ width: '18px', height: '18px', color: 'rgb(155,155,155)' }} />
                </div>
                <span style={{ color: 'rgb(155,155,155)' }}>{name}</span>
            </a>
        </div>
    );
};

export default ListProfileComponent;
