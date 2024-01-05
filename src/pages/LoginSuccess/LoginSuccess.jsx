import React, { useEffect } from 'react';
import { apiServiceGoogle } from '~/service/UserService'; // Điều chỉnh import tới API của bạn
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwt_decoded from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/slide/userSlide';
import * as UserService from '~/service/UserService';
import { useMutationHook } from '~/hook/useMutationHook';
import { Navigate } from 'react-router-dom';

const LoginSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const mutation = useMutationHook((data) => UserService.apiServiceGoogle(id));
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        const fetchToken = async () => {
            try {
                // Gọi API để lấy access_token và refresh_token
                const response = await apiServiceGoogle(id);
                const { access_token, refresh_token } = response.data;

                // Lưu token vào localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('access_token', JSON.stringify(access_token));
                localStorage.setItem('refresh_token', JSON.stringify(refresh_token));

                // Sau khi lưu token, bắt đầu lấy thông tin người dùng
                const decoded = jwt_decoded(access_token);
                await handleGetDetailUser(decoded?.id, access_token);

                navigate('/');
            } catch (error) {
                console.error('Failed to fetch tokens:', error);
            }
        };

        fetchToken();
    }, [id, dispatch, navigate]);

    return <div>{<Navigate to={'/'} replace={true} />} </div>;
};

export default LoginSuccess;
