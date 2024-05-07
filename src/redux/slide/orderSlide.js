import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    fullName: '',
    phone: 0,
    moreAddress: '',
    district: '',
    city: '',
    country: '',
    paymentMethod: '',
    shippingPrice: '',
    totalPrice: '',
    user: '',
    product: '',
    isPaid: false,
    isDelivered: false,
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrder: (state, action) => {
            const {
                orderItems = [],
                fullName = '',
                phone = 0,
                moreAddress = '',
                district = '',
                city = '',
                country = '',
                paymentMethod = '',
                shippingPrice = '',
                totalPrice = '',
                user = '',
                product = '',
                isPaid = false,
                isDelivered = false,
            } = action.payload;

            // Cập nhật state với dữ liệu từ action.payload
            state.orderItems = orderItems;
            state.fullName = fullName;
            state.phone = phone;
            state.moreAddress = moreAddress;
            state.district = district;
            state.city = city;
            state.country = country;
            state.paymentMethod = paymentMethod;
            state.shippingPrice = shippingPrice;
            state.totalPrice = totalPrice;
            state.user = user;
            state.product = product;
            state.isPaid = isPaid;
            state.isDelivered = isDelivered;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateOrder } = orderSlide.actions;

export default orderSlide.reducer;
