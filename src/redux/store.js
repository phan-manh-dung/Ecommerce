import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slide/productSlide';
import userReducer from './slide/userSlide';
import orderReducer from './slide/orderSlide';

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
    },
});
