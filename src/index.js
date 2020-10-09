import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less'
import 'ant-design-pro/dist/ant-design-pro.css';
import 'react-quill/dist/quill.snow.css';
import './styles/modify.css'
import './styles/index.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import Router from '../src/router/Router';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
