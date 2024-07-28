import { axiosJWT } from './UserService';
import axios from 'axios';

export const createOrder = async (data, access_token, userId) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res;
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

export const deleteOrderDatabaseByAdmin = async (id, access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-order/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteOrderToCancelled = async (id, access_token) => {
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

// tìm id của cart để xóa
export const findCart = async (id, productId, access_token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/find-cart/${id}`, {
      params: { productId },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data.cartId;
  } catch (error) {
    console.error('Error finding cart:', error);
    throw error;
  }
};

export const findManyCart = async (id, productIds, access_token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/find-carts/${id}`,
      {
        productIds,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return response.data.carts; // Giả sử response trả về mảng carts
  } catch (error) {
    console.error('Error finding carts:', error);
    throw error;
  }
};

export const checkIfUserPurchasedProduct = async (id, productId, access_token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/check-purchased/${id}`, {
      params: { productId: productId },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data.purchased;
  } catch (error) {
    console.error('Error finding order:', error);
    throw error;
  }
};

export const deleteManyCart = async (data, access_token) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/delete-many-cart`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`, // Chỉnh sửa header thành Authorization
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error deleting carts:', error);
    throw error;
  }
};

export const getAllOrderDetail = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
