import store from 'store';
import api from '../apis/xy';

const ERROR = Symbol();
const LOAD_USER_DATA = Symbol();

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
  ...userInfo
};

// reducer
export function user(state = initState, action: any) {
  switch (action.type) {
    case LOAD_USER_DATA:
      const data = {
        ...state,
        ...action.payload.userInfo
      };
      store.set('userInfo', data);
      return {
        ...data
      };
    default:
      return state
  }
}

// gen action
export function login(params: any) {
  return async (dispatch: any) => {
    const ret: any = await api.login(params);
    if (ret.code === '0') {
      dispatch({type: LOAD_USER_DATA, payload: ret.data})
    } else {
      dispatch({type: ERROR, payload: ret.msg})
    }
  }
}