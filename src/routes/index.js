import AdminPage from '~/pages/AdminPage/AdminPage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage';
import ProductDetailPage from '~/pages/ProductDetailPage/ProductDetailPage';

import ProfilePage from '~/pages/ProfilePage/ProfilePage';
import SignInPage from '~/pages/SignInPage/SignInPage';
import SignUpPage from '~/pages/SignUpPage/SignUpPage';

const { default: HomePage } = require('~/pages/HomePage/HomePage');
const { default: OrderPage } = require('~/pages/OrderPage/OrderPage');
const { default: ProductPage } = require('~/pages/ProductPage/ProductPage');

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
    },
    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isShowFooter: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
