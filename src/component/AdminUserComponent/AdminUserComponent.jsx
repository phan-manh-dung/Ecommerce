import React from 'react';
import styles from './AdminUser.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import TableComponent from '~/component/TableComponent/TableComponent';

const cx = classNames.bind(styles);

const AdminUserComponent = () => {
    return (
        <div className={cx('container_user')}>
            <div className={cx('wrapper_user')}>
                <div style={{ textAlign: 'center', marginBottom: '2%' }}>
                    <span className={cx('title')}>Quản lý người dùng</span>
                </div>
                <div>
                    <Button className={cx('button')}>
                        <PlusCircleFilled style={{ fontSize: '20px' }} />
                    </Button>
                </div>
                <div className={cx('wrapper-table')}>
                    <TableComponent />
                </div>
            </div>
        </div>
    );
};

export default AdminUserComponent;
