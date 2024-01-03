import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    access_token: '',
    phone: '',
    district: '',
    avatar: '',
    city: '',
    country: '',
    moreAddress: '',
    dateOfBirth: '',
    sex: '',
    nickname: '',
    isLoading: false,
    id: '',
    isAdmin: false,
    refresh_token: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // khi login thì nó sẽ lấy thông tin
        updateUser: (state, action) => {
            const {
                name = '',
                access_token = '',
                phone = '',
                district = '',
                avatar = '',
                city = '',
                country = '',
                moreAddress = '',
                dateOfBirth = '',
                sex = '',
                nickname = '',
                _id = '',
                isAdmin,
                refresh_token = '',
            } = action.payload;
            state.name = name;
            state.phone = phone;
            state.district = district;
            state.avatar = avatar;
            state.city = city;
            state.moreAddress = moreAddress;
            state.dateOfBirth = dateOfBirth;
            state.sex = sex;
            state.country = country;
            state.nickname = nickname;
            state.id = _id;
            state.access_token = access_token || '';
            state.isAdmin = isAdmin;
            state.refresh_token = refresh_token;
        },

        // xóa thông tin reset lại
        resetUser: (state) => {
            state.name = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.city = '';
            state.moreAddress = '';
            state.dateOfBirth = '';
            state.sex = '';
            state.country = '';
            state.nickname = '';
            state.id = '';
            state.access_token = '';
            state.refresh_token = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;
export default userSlide.reducer;
