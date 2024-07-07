import axiosDefault from 'axios';

export const apiGetPublicProvinces = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: 'https://vapi.vnappmob.com/api/province/',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetPublicDistrict = (provinceId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

// api momo
export const apiMomoService = (amount, orderId, orderInfo) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'post',
                url: 'http://localhost:4000/api/momo/create-payment',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    amount,
                    orderId,
                    orderInfo,
                },
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });

// callback momo
export const callBackDataMomo = async (orderId) => {
    try {
        const response = await axiosDefault({
            method: 'post',
            url: 'http://localhost:4000/api/momo/callback',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { orderId },
        });
        return response.data;
    } catch (error) {
        console.error('Error checking transaction status:', error);
        throw error;
    }
};

export const checkTransactionStatus = async (orderId) => {
    try {
        const response = await axiosDefault({
            method: 'post',
            url: 'http://localhost:4000/api/momo/transaction-status',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { orderId },
        });
        return response.data;
    } catch (error) {
        console.error('Error checking transaction status:', error);
        throw error;
    }
};
