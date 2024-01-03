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
    },
});

// Action creators are generated for each case reducer function
export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
