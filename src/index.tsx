import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './assets/style/reset.css';
import 'antd-mobile/dist/antd-mobile.css';

import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Welcome from './views/welcome';
import Account from './views/account';
import Item from './views/item';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" exact component={Welcome} />
    <Route path="/item" exact component={Item} />
    <Route path="/account" exact component={Account} />
    <Route path="/app" exact component={App} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
