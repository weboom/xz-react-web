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
import ChatItem from './views/chatItem';
import LoginPop from './components/loginPop';
import About from './views/about';
import Shipping from './views/shipping';

export default [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/Shipping',
    name: 'Shipping',
    component: Shipping
  },
  {
    path: '/item/:xzProductId',
    name: 'Item',
    component: Item
  },
  {
    path: '/Category',
    name: 'Category',
    component: Category
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/Point',
    name: 'Point',
    component: Point
  },
  {
    path: '/Collect',
    name: 'Collect',
    component: Collect
  },
  {
    path: '/Like',
    name: 'Like',
    component: Like
  },
  {
    path: '/Follow',
    name: 'Follow',
    component: Follow
  },
  {
    path: '/AddItem',
    name: 'AddItem',
    component: AddItem
  },
  {
    path: '/MyXzProduct',
    name: 'MyXzProduct',
    component: MyXzProduct
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search
  },
  {
    path: '/chat/:chatId',
    name: 'ChatItem',
    component: ChatItem
  },
  {
    path: '/LoginPop',
    name: 'LoginPop',
    component: LoginPop
  },
  {
    path: '/About',
    name: 'About',
    component: About
  }
]