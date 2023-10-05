
import { Routes, Route, Router, Switch } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { Container } from '@mui/material';
import { ResponsiveDrawer } from './layouts/ResponsiveDrawer';

function App() {
    return (
        <Container>
            <ResponsiveDrawer>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />
                    })}
                </Routes>
            </ResponsiveDrawer>
        </Container>
    );
}

export default App;