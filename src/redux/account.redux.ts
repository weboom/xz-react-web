
import api from '../apis/xy'

export const ACCOUNT_GET_MY_ADDRESS = Symbol()

const initState = {
  address: {
    list: [],
    pageSize: 10,
    pageIndex: 0
  }
}
export function reducer(state = { ...initState }, action: any) {
  switch(action.type) {
    case ACCOUNT_GET_MY_ADDRESS:
      return {
        ...state,
        address: action.payload
      }
    default:
      return state
  }
}

export function getCollectList() {
  return;
}

export function getMyProductList() {
  return;
}

export function getMyAddress() {
  return async (dispatch: any) => {
    const res: any = await api.getdeliveryAddressList()
    if (res && res.success) {
      dispatch({
        payload: res.data,
        type: ACCOUNT_GET_MY_ADDRESS
      })
    }
  }
}