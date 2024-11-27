import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './components/App/App';

import './styles/main.scss';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);