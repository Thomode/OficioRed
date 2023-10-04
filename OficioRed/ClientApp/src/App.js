
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { Container } from '@mui/material';

function App() {
    return (
        <Container>
            <Layout />
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </Container>
    );
}

export default App;