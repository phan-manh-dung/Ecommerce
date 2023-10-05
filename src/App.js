import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './GlobalStyle.css';
import { routes } from './routes/index';
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import { Fragment, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import * as UserService from '~/service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { DataRouter } from 'react-router-dom';
import { isJsonString } from './utils';
import { updateUser } from './redux/slide/userSlide';
import Loading from './component/LoadingComponent/Loading';
function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user);
    useEffect(() => {
        setIsLoading(true);
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailUser(decoded?.id, storageData);
        }
        setIsLoading(false);
    }, []);

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    // const handleDecoded = () => {
    //     let storageData = user?.access_token || localStorage.getItem('access_token');
    //     let decoded = {};
    //     if (storageData && isJsonString(storageData) && !user?.access_token) {
    //         storageData = JSON.parse(storageData);
    //         decoded = jwt_decode(storageData);
    //     }
    //     return { decoded, storageData };
    // };

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwt_decode(storageData);
        }
        return { decoded, storageData };
    };

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            // let storageRefreshToken = localStorage.getItem('refresh_token');
            // const refreshToken = JSON.parse(storageRefreshToken);
            // const decodedRefreshToken = jwt_decode(refreshToken);
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                config.headers['token'] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Router>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.page;
                            const isCheckAuth = !route?.isPrivate || user?.isAdmin;
                            const isShowHeader = route.isShowHeader;
                            const isShowFooter = route.isShowFooter;
                            const Layout = isShowHeader && isShowFooter ? DefaultComponent : Fragment;
                            return (
                                <Route
                                    key={route?.path}
                                    path={route?.path}
                                    element={
                                        <>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </div>
        </Loading>
    );
}

export default App;
