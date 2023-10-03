import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    phone: '',
    address: '',
    avatar: '',
    city: '',
    dateOfBirth: '',
    sex: '',
    country: '',
    nickname: '',
    isLoading: false,
    id: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // khi login thì nó sẽ lấy thông tin
        updateUser: (state, action) => {
            const {
                name = '',
                email = '',
                access_token = '',
                phone = '',
                address = '',
                avatar = '',
                city = '',
                dateOfBirth = '',
                sex = '',
                nickname = '',
                country = '',
                _id = '',
            } = action.payload;
            state.name = name || email;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.city = city;
            state.dateOfBirth = dateOfBirth;
            state.sex = sex;
            state.country = country;
            state.nickname = nickname;
            state.id = _id;
            state.access_token = access_token;
        },
        // xóa thông tin reset lại
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.city = '';
            state.dateOfBirth = '';
            state.sex = '';
            state.country = '';
            state.nickname = '';
            state.id = '';
            state.access_token = '';
            state.refreshToken = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
