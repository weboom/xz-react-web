import store from 'store';
import api from '../apis/xy';

const USER_GETINFO = Symbol(); // 获取用户信息
const USER_GET_AMOUNT = Symbol(); // 用户相关数据
const USER_GET_CHECKIN_STATE = Symbol(); // 获取签到状态
const USER_CHECKIN = Symbol() // 签到

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
  userInfo,
  amountInfo: null,
  checkinState: false
};

// reducer
export function user(state = initState, action: any) {
  switch (action.type) {
    case USER_GETINFO:
      store.set('userInfo', action.payload);
      return {
        ...state,
        userInfo: action.payload
      };
    case USER_GET_AMOUNT:
      return {
        ...state,
        amountInfo: action.payload
      }
    case USER_GET_CHECKIN_STATE:
      return {
        ...state,
        checkinState: +action.payload.status === 1
      }
    case USER_CHECKIN:
      return {
        ...state,
        checkinState: true
      }
    default:
      return state
  }
}

export const login = (params: any) => {
  return async (dispatch: any) => {
    const res: any = await api.login(params);
    if (res && res.success) {
      dispatch({type: USER_GETINFO, payload: res.data})
    }
  }
}

export const getUserAmount = () => {
  return async(dispatch: any) => {
    const res: any = await api.getUserTotalInfo();
    if (res && res.success) {
      dispatch({type: USER_GET_AMOUNT, payload: res.data})
    }
  }
}

export const getCheckinState = () => {
  return async(dispatch: any) => {
    const res: any = await api.getCheckinStatus();
    if (res && res.success) {
      dispatch({
        type: USER_GET_CHECKIN_STATE,
        payload: res.data
      })
    }
  }
}

export const doCheckin = () => {
  return async(dispatch: any) => {
    const res: any = await api.checkin();
    if (res && res.success) {
      dispatch({
        type: USER_CHECKIN,
        payload: res.data
      })
    }
  }
}