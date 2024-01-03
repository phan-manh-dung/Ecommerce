import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSuccessOrder: false,
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
                    state.isSuccessOrder = true;
                    state.isErrorOrder = false;
                }
            } else {
                state.orderItems.push(orderItem);
            }
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload; // muốn cos id thì phải truy cập được id từ order page
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct);

            state.orderItems = itemOrder;
            state.orderItemsSelected = itemOrderSelected;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            state.orderItems = itemOrders;
            state.orderItemsSelected = itemOrdersSelected;
        },
        RESET_ORDER_DATA: (state) => {
            // Reset tất cả dữ liệu order về trạng thái ban đầu
            state.orderItems = [];
            state.orderItemsSelected = [];
            state.shippingAddress = {};
            state.paymentMethod = '';
            state.itemsPrice = 0;
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;
            state.user = '';
            state.isPaid = false;
            state.paidAt = '';
            state.isDelivered = false;
            state.deliveredAt = '';
            state.isSuccessOrder = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, removeOrderProduct, removeAllOrderProduct, RESET_ORDER_DATA } = orderSlide.actions;

export default orderSlide.reducer;
