import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './components/App/App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter basename="/todos-react">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
