import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { reduxFirebaseprops } from './store/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...reduxFirebaseprops} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
