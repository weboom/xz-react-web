import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
// import utils from './utils';
// import apis from './apis';
import Welcome from './views/welcome';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Welcome} />
    <Route path="/app" component={App} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
