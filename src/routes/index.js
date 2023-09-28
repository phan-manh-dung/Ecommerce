import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import ProductDetailPage from '~/pages/ProductDetailPage/ProductDetailPage';
import SignInPage from '~/pages/SignInPage/SignInPage';
import SignUpPage from '~/pages/SignUpPage/SignUpPage';
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage';

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
        path: '/products',
        page: ProductPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/type',
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
        path: '/product-detail',
        page: ProductDetailPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
