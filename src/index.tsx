import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { HistoryRouter } from './app/layout/HistoryRouter';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
//import('./i18n');

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HistoryRouter>
      <Provider store={store}>
        <Suspense fallback='loading'>
          <App />
        </Suspense>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
