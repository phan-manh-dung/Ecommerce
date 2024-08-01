import AdminPage from '~/pages/AdminPage/AdminPage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage';
import ProductDetailPage from '~/pages/ProductDetailPage/ProductDetailPage';

import ProfilePage from '~/pages/ProfilePage/ProfilePage';
import SignInPage from '~/pages/SignInPage/SignInPage';
import SignUpPage from '~/pages/SignUpPage/SignUpPage';
import PaymentPage from '~/pages/PaymentPage/PaymentPage';
import OrderSuccess from '~/pages/OrderSuccess/OrderSuccess';
import LoginSuccess from '~/pages/LoginSuccess/LoginSuccess';
import MyOfOrder from '~/pages/MyOfOrder/MyOfOrder';
import No_Notification from '~/pages/No_Notification/No_Notification';
import ManagerLie from '~/pages/ManagerLie/ManagerLie';
import AddressPage from '~/pages/AddressPage/AddressPage';
import PayInformation from '~/pages/PayInformation/PayInformation';
import ReviewProduct from '~/pages/ReviewProduct/ReviewProduct';
import FavoriteProduct from '~/pages/FavoriteProduct/FavoriteProduct';
import MyComment from '~/pages/MyComment/MyCommnet';
import CartPage from '~/pages/CartPage/CartPage';
import WatchProduct from '~/pages/WatchProduct/WatchProduct';
import HelpCustomer from '~/pages/HelpCustomer/HelpCustomer';
import ForgotPassPage from '~/pages/ForgotPassPage/ForgotPassPage';

const { default: HomePage } = require('~/pages/HomePage/HomePage');

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/cart',
    page: CartPage,
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
    path: '/payment',
    page: PaymentPage,
    isShowHeader: false,
    isShowFooter: false,
    isPrivate: true,
  },
  {
    path: '/orderSuccess',
    page: OrderSuccess,
    isShowHeader: false,
    isShowFooter: false,
    isPrivate: true,
  },
  {
    path: '/login-success/:id',
    page: LoginSuccess,
    isShowHeader: false,
    isShowFooter: false,
    isPrivate: true,
  },
  {
    path: '/my-order',
    page: MyOfOrder,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my-notification',
    page: No_Notification,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/lie-manager',
    page: ManagerLie,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my-address',
    page: AddressPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my/pay-information',
    page: PayInformation,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my-review',
    page: ReviewProduct,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my-watched',
    page: WatchProduct,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my/favorite-product',
    page: FavoriteProduct,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/my-comment',
    page: MyComment,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/customer/help',
    page: HelpCustomer,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/user/reset',
    page: ForgotPassPage,
    isShowHeader: false,
    isShowFooter: false,
  },

  {
    path: '*',
    page: NotFoundPage,
    isShowHeader: true,
    isShowFooter: true,
  },
];
