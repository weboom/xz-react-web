import io from 'socket.io-client';
import { wsHost } from '../config';
import store from 'store';
import xzApi from '../apis/xy';

// browser
const LOAD_USER_DATA = Symbol();
const GET_ALL_MSG = Symbol();
let socketInstance: any = null;

// 排序
function sortUserList({ userList, msgGroup }: any) {
  const values = Object.values(msgGroup);
  function chatCompare(chatA: any, chatB: any) {
    if (chatB.create_time > chatA.create_time) {
      return 1;
    } else if (chatB.create_time === chatA.create_time) {
      return 0;
    } else {
      return -1;
    }
  }
  values.forEach(element => {
    (element as any).sort(chatCompare);
  });
  userList.sort((userA: any, userB: any) => {
    return chatCompare(msgGroup[userA.id][0], msgGroup[userB.id][0]);
  });
  return [].concat(userList);
}

// 消息分组
function makeMsgGroup({ userInfo, msgList }: any) {
  const group = {};
  msgList.forEach((msg: any) => {
    if (!msg) {
      return;
    }
    let talkId;
    if (+msg.f_from === +userInfo.id) {
      talkId = `${msg.f_to}`;
    } else {
      talkId = `${msg.f_from}`;
    }
    const key = `${userInfo.id}_${talkId}`;
    const key1 = `${msg.f_from}_${msg.f_to}`;
    const key2 = `${msg.f_to}_${msg.f_from}`;
    if (key === key1 || key === key2) {
      if (!group[talkId]) {
        group[talkId] = [];
      }
      if (group[talkId]) {
        group[talkId].push(msg);
      }
    }
  });
  return group;
}

const initState = {
  msgList: [],
  userList: [],
  msgGroup: {}
};

// reducer
export function chat(state = initState, action: any) {
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
    case GET_ALL_MSG:
      const { msgObj, msgList, userList } = action.payload
      return {
        ...state,
        msgList,
        userList,
        msgGroup: msgObj
      }
    default:
      return state
  }
}

/**
 * @description 初始化socket连接
 */
export function initSocket() {
  return (dispatch: any) => {
    const userInfo = store.get('userInfo');
    const token = store.get('token');
    const socket = io(wsHost, {
      query: {
        room: 'demo',
        token: token || Math.random()
      },
      transports: ['websocket']
    });
    // 连接成功
    socket.on('res', (msg: any) => {
      console.log(msg);
    })
    // 监听消息
    socket.on(`sendMsg_${userInfo.id}`, (msg: any) => {
      handleNewMsg({ msg })
    });
    socketInstance = socket;
  }
}

export function handleNewMsg({ msg }: any) {
  return (dispatch: any) => {
    const userInfo = store.get('userInfo');
    const { payload } = msg.data;
    console.log(userInfo);
    console.log(payload);
    console.log(sortUserList);
    console.log(makeMsgGroup)
    console.log(socketInstance);

    // let userList = [].concat((state).userList);
    // let msgList = [].concat(state.msgList);

    // // 判断发消息的人是否在userList中
    // let index = userList.findIndex(element => +element.id === +payload.from);
    // if (index === -1 && (+payload.from !== +userInfo.id)) {
    //   userList.push(payload.userInfo);
    // }
    // msgList.push(payload);

    // let group = makeMsgGroup({
    //   userInfo,
    //   msgList
    // });

    // userList = sortUserList({
    //   userList,
    //   msgGroup: group
    // });

    // dispatch('scrollToLast');
    // commit('getAllMsg', {
    //   msgObj: group,
    //   msgList,
    //   userList
    // });
  }
}

/**
 * @description 获取所有消息
 */
export function getChatList() {
  return async (dispatch: any) => {
    const userInfo = store.get('userInfo');
    const res: any = await xzApi.getChatList();
    if (!res || !res.success) {
      return;
    }
    let userList = res.data.userList;
    const msgList = res.data.msgList;
    const group = makeMsgGroup({
      userInfo,
      msgList
    });
    userList = sortUserList({
      userList,
      msgGroup: group
    });
    dispatch({
      type: GET_ALL_MSG,
      payload: {
        msgObj: group,
        msgList,
        userList
      }
    })
  }  
}