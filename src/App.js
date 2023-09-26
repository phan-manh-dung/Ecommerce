import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './GlobalStyle.css';
import { routes } from './routes/index';
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
function App() {
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
