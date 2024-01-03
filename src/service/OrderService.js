import { axiosJWT } from './UserService';
import axios from 'axios';

export const createOrder = async (data, access_token) => {
    console.log('access_token', { access_token, data });
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const createCart = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/create-cart`, data);
    return res.data;
};

export const getCartByUserId = async (userId, access_token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };

    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-cart?userId=${userId}`, config);
        return res.data;
    } catch (error) {
        // Xử lý lỗi nếu cần
        console.error(error);
        throw error;
    }
};

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteOrder = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteCart = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-cart/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/delete-many-order`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
