import axios from 'axios';
import { axiosJWT } from './UserService';

export const getAllProduct = async (search, limit) => {
  let res = {};
  if (search?.length) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`,
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`); // phải truyền data
  }
  return res.data;
};

export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`,
    );
    return res.data;
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
  return res.data;
};

export const updateProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
  return res.data;
};

export const getAllColorProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-color`);
  return res.data;
};

export const filterByPriceLowToHeight = async (type) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/filter-price-low-to-height`, {
    params: { type },
  });
  return res.data;
};

export const filterByPriceHeightToLow = async (type) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/filter-price-height-to-low`, {
    params: { type },
  });
  return res.data;
};

export const getNewProduct = async (type) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/new-products`, {
    params: { type },
  });
  return res.data;
};

export const getSellingProduct = async (type) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/selling`, {
    params: { type },
  });
  return res.data;
};

export const createVote = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create-vote`, data);
  return res.data;
};

export const getAllVotes = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-votes`);
  return res.data;
};
