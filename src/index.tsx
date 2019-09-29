import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './assets/style/reset.css';

import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Welcome from './views/welcome';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Welcome} />
    <Route path="/app" component={App} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
