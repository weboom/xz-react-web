import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './assets/style/reset.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import LoginPop from './components/loginPop';

import routes from './router.config';
import reducers from './redux/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

// const store = createStore(reducers, applyMiddleware(thunk))

const store = createStore(reducers, compose(
  applyMiddleware(thunk), (window as any).devToolsExtension
  ? (window as any).devToolsExtension()
  : (f: any) => f));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoginPop />
      <Switch>
        <Route path="/login" exact 
          component={(props: any) => <LoginPop visible={true} {...props} />}
        />
        {
          routes.map((item: any, index: any) => {
            return (
              <Route key={index} path={item.path} exact
                render={(props: any) => <item.component {...props} />}
              />
            )
          })
        }
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
