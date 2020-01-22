import api from '../apis'

export const FOLLOW_GET_LIST = Symbol()
export const FOLLOW_SET_LOADING = Symbol()

const initState = {
  list: [],
  pageIndex: 0,
  pageSize: 20,
  total: 0,
  loading: false
}

export function reducer(state = { ...initState }, action: any) {
  switch (action.type) {
    case FOLLOW_GET_LIST:
      return {
        ...state,
        ...action.payload
      }
    case FOLLOW_SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state;
  }
}

export function showLoading() {
  return {
    type: FOLLOW_SET_LOADING,
    payload: {
      loading: true
    }
  }
}

export function hideLoading() {
  return {
    type: FOLLOW_SET_LOADING,
    payload: {
      loading: false
    }
  }
}

export function getFollowList() {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const res: any = await api.getFollowList()
    if (res && res.success) {
      dispatch({
        type: FOLLOW_GET_LIST,
        payload: res.data
      })
    }
    dispatch(hideLoading())
  }
}