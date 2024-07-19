import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
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
                _id = '',
                cartItems = [], // Cập nhật toàn bộ cartItems
            } = action.payload;

            // Cập nhật _id và cartItems
            state._id = _id;
            state.cartItems = cartItems;
        },

        addProductInCart: (state, action) => {
            const { cartItem, _id } = action.payload;
            // dùng toString để chuyển kiểu cho objectId
            const itemOrder = state.cartItems.find((item) => item.product.toString() === cartItem.product.toString());
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += cartItem.amount;
                    state.isSuccessOrder = true;
                    state.isErrorOrder = false;
                }
            } else {
                state.cartItems.push(cartItem);
            }
            if (_id) {
                state._id = _id; // Cập nhật _id nếu có
            }
        },
        // đây là remove 1 sản phẩm trong giỏ hàng cart
        removeProductInCart: (state, action) => {
            const { idProduct } = action.payload;
            console.log('Removing product with ID redux:', idProduct);
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
        RESET_CART_DATA: (state) => {
            // Reset tất cả dữ liệu order về trạng thái ban đầu
            state._id = '';
            state.cartItems = [];
            state.name = '';
            state.amount = 0;
            state.image = '';
            state.price = 0;
            state.product = '';
            state.color = '';
            state.discount = 0;
            state.type = '';
            state.isPaid = false;
            state.isDelivered = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateCart, addProductInCart, removeProductInCart, removeAllProductInCart, RESET_CART_DATA } =
    cartSlice.actions;
export default cartSlice.reducer;
