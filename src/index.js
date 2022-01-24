import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store'
import { Provider } from 'react-redux';
import { AuthProvider } from './components/hoc/AuthProvider';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


