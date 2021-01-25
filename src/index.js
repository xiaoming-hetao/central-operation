import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App'
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appData from './store/reducers';

// 创建store
let store = createStore(appData);
console.log(store.getState());
// Prodiver组件可以让所有容器组件都可以访问store
ReactDOM.render(
  
    <Provider store={store}>
      <Router>
      <App />
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
