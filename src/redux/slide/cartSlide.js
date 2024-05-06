import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    name: '',
    amount: 0,
    image: '',
    price: 0,
    product: '',
    color: '',
    discount: 0,
    type: '',
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            const {
                name = '',
                phone = '',
                nameProduct = '',
                amount = '',
                image = '',
                price = '',
                discount = '',
                color = '',
            } = action.payload;

            state.cartItems.push({
                name,
                phone,
                cart: {
                    nameProduct,
                    amount,
                    image,
                    price,
                    discount,
                    color,
                },
            });
        },
        // addProductInCart: (state, action) => {
        //     const { orderItem } = action.payload;
        //     const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
        //     if (itemOrder) {
        //         if (itemOrder.amount <= itemOrder.countInStock) {
        //             itemOrder.amount += orderItem?.amount;
        //             state.isSuccessOrder = true;
        //             state.isErrorOrder = false;
        //         }
        //     } else {
        //         state.orderItems.push(orderItem);
        //     }
        // },

        addProductInCart: (state, action) => {
            const { cartItem } = action.payload;
            const itemOrder = state?.cartItems?.find((item) => item?.product === cartItem.product);
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += cartItem?.amount;
                    state.isSuccessOrder = true;
                    state.isErrorOrder = false;
                }
            } else {
                state.cartItems.push(cartItem);
            }
        },
        // đây là remove 1 sản phẩm trong giỏ hàng cart
        removeProductInCart: (state, action) => {
            const { idProduct } = action.payload; // muốn cos id thì phải truy cập được id từ cart page
            const itemCart = state?.cartItems?.filter((item) => item?.product !== idProduct);
            const itemCartSelected = state?.cartItemsSelected?.filter((item) => item?.product !== idProduct);

            state.cartItems = itemCart;
            state.cartItemsSelected = itemCartSelected;
        },
        // đây là remove nhiều sản phẩm trong giỏ hàng cart
        removeAllProductInCart: (state, action) => {
            const { listChecked } = action.payload;
            const itemCarts = state?.cartItems?.filter((item) => !listChecked.includes(item.product));
            const itemCartsSelected = state?.cartItems?.filter((item) => !listChecked.includes(item.product));
            state.cartItems = itemCarts;
            state.cartItemsSelected = itemCartsSelected;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateCart, addProductInCart, removeProductInCart, removeAllProductInCart } = cartSlice.actions;
export default cartSlice.reducer;
