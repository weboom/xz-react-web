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
import XzProductList from './views/xzProductList';
import ListView from './views/list-view'

export default [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/Shipping',
    name: 'Shipping',
    component: Shipping,
    meta: {
      requireAuth: true
    }
  },
	{
		path: '/xzProduct',
		name: 'XzProductList',
		component: XzProductList,
		meta: {
		  requireAuth: false
		}
	},
  {
    path: '/item/:xzProductId',
    name: 'Item',
    component: Item,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/Category',
    name: 'Category',
    component: Category,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/Point',
    name: 'Point',
    component: Point,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Collect',
    name: 'Collect',
    component: Collect,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Like',
    name: 'Like',
    component: Like,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Follow',
    name: 'Follow',
    component: Follow,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/AddItem',
    name: 'AddItem',
    component: AddItem,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/MyXzProduct',
    name: 'MyXzProduct',
    component: MyXzProduct,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/chat/:chatId',
    name: 'ChatItem',
    component: ChatItem,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/LoginPop',
    name: 'LoginPop',
    component: LoginPop,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/list-view',
    name: 'list-view',
    component: ListView
  }
]