import custom from './custom.css';

import { Routes, Route } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';

function App() {
    return (
        <div className="App">
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>             
        </div>    
    );
}

export default App;