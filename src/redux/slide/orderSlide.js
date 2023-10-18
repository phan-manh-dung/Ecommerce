import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += orderItem?.amount;
                    state.isSucessOrder = true;
                    state.isErrorOrder = false;
                }
            } else {
                state.orderItems.push(orderItem);
            }

            // Lưu trạng thái giỏ hàng sau khi thay đổi
            localStorage.setItem('cartItems', JSON.stringify(state.orderItems));
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct);
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct);
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct);
            itemOrder.orderItems = itemOrder;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, removeOrderProduct } = orderSlide.actions;

export default orderSlide.reducer;
