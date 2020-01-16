import store from 'store';
import api from '../apis/xy';

const USER_GETINFO = Symbol(); // 获取用户信息
const USER_SHOW_LOGIN = Symbol(); // 显示登录
const USER_CLOSE_LOGIN = Symbol(); // 关闭登录

let userInfo = store.get('userInfo');
try {
  if (userInfo) {
    userInfo = JSON.parse(userInfo)
  }
} catch (e) {
  // console.log(e);
}

// initial state
const initState = {
  ...userInfo,
  showLogin: false
};

// reducer
export function user(state = initState, action: any) {
  switch (action.type) {
    case USER_GETINFO:
      const data = {
        ...state,
        ...action.payload.userInfo
      };
      store.set('userInfo', data);
      return {
        ...data
      };
    case USER_SHOW_LOGIN: 
      return {
        ...state,
        showLogin: true
      }
    case USER_CLOSE_LOGIN:
      return {
        ...state,
        showLogin: false
      }
    default:
      return state
  }
}

// gen action
export function login(params: any) {
  return async (dispatch: any) => {
    const res: any = await api.login(params);
    if (res && res.success) {
      dispatch({type: USER_GETINFO, payload: res.data})
    }
  }
}