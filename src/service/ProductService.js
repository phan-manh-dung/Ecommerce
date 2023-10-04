import axios from 'axios';

export const getAllProduct = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`); // phải truyền data
    return res.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};
