import authReducer from './authReducer';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'; // merce redux persist
import persistReducer from 'redux-persist/es/persistReducer';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
});

export default rootReducer;
