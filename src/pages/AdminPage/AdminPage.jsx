import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import AdminOrderComponent from '~/component/AdminOrderComponent/AdminOrderComponent';
import AdminUserComponent from '~/component/AdminUserComponent/AdminUserComponent';
import AdminProductComponent from '~/component/AdminProductComponent/AdminProductComponent';
import HeaderComponent from '~/component/HeaderComponent/HeaderComponent';
import { getItem } from '~/utils';

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'Users', <AppstoreOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    ];
    const rootSubmenuKeys = ['user', 'User'];
    const [keySelected, setKeySelected] = useState('');
    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return <AdminUserComponent />;
            case 'Users':
                return <AdminProductComponent />;
            case 'orders':
                return <AdminOrderComponent />;
            default:
                return <></>;
        }
    };

    const [openKeys, setOpenKeys] = useState(['user']);

    const handleOnCLick = ({ key }) => {
        setKeySelected(key);
    };
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    style={{
                        width: 256,
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px' }}> {renderPage(keySelected)}</div>
            </div>
        </>
    );
};

export default AdminPage;
