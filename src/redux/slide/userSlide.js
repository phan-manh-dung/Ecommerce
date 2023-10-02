import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    isLoading: false,
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // khi login thì nó sẽ lấy thông tin
        updateUser: (state, action) => {
            const { name, email, access_token } = action.payload;
            state.name = name || email;
            state.email = email;
            state.access_token = access_token;
        },
        // xóa thông tin reset lại
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.refreshToken = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
