import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slide/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
