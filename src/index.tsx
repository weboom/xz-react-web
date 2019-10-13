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
import Category from './views/category';
import Chat from './views/chat';
import Point from './views/point';
import Collect from './views/collect';
import Like from './views/like';
import Follow from './views/follow';
import AddItem from './views/addItem';
import MyXzProduct from './views/myXzProduct';
import Search from './views/search';
import ChatItem from './views/chatItem'
// import UpdateItem from './views/updateItem';
// import MyItems from './views/myItems';
// import Shipping from './views/shipping';

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
      <Route path="/" exact component={Welcome} />
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
      <Route path="/app" exact component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
