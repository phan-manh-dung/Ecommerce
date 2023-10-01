import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './GlobalStyle.css';
import { routes } from './routes/index';
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);
    const fetchApi = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res.data;
    };

    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
    console.log('query', query);

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const isShowHeader = route.isShowHeader;
                        const isShowFooter = route.isShowFooter;
                        const Layout = isShowHeader && isShowFooter ? DefaultComponent : Fragment;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <>
                                        <Layout>
                                            {' '}
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
    );
}

export default App;
