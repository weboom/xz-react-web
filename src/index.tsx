import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/style/reset.css';
import 'antd-mobile/dist/antd-mobile.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import LoginPop from './components/loginPop';

import routes from './router.config';
import reducers from './redux/reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'

const store = createStore(reducers, compose(
  applyMiddleware(thunk), (window as any).devToolsExtension
  ? (window as any).devToolsExtension()
  : (f: any) => f));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoginPop />
      <Switch>
        <Route path="/login" exact component={(props: any) => {
          return <LoginPop visible={true} {...props} />
        }} />
        {
          routes.map((item: any, index: any) => {
            return (
              <Route key={index} path={item.path} exact render={(props: any) => {
                return <item.component {...props} />
              }} />
            )
          })
        }
      </Switch>
      {/* <Route path="/" exact component={Welcome} />
      <Route path="/item/:xzProductId" exact component={Item} />
      <Route path="/account" exact component={Account} />
      <Route path="/category" exact component={Category} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/chat/:chatId" exact component={ChatItem} />
      <Route path="/point" exact component={Point} />
      <Route path="/collect" exact component={Collect} />
      <Route path="/like" exact component={Like} />
      <Route path="/follow" exact component={Follow} />
      <Route path="/addItem" exact component={AddItem} />
      <Route path="/myXzProduct" exact component={MyXzProduct} />
      <Route path="/search" exact component={Search} />
      <Route path="/app" exact component={App} /> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
