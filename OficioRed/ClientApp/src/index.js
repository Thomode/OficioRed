import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './custom.css';

import { SnackbarProvider } from 'notistack';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>);
serviceWorkerRegistration.unregister();
reportWebVitals();