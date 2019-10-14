import * as React from 'react';
import './index.css';
import { connect } from 'react-redux'
import store from 'store';
import { initSocket, getChatList, sendMsg } from "../../redux/chat.redux"
import classnames from 'classnames';
import Navbar from '../../components/navbar';
import TalkForm from '../../components/chatForm';

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  initSocket,
  getChatList,
  sendMsg
}

class Chat extends React.Component {
  state = {
    cMenu: [],
    userInfo: {
      id: "",
      avatar: ''
    },
    partner: {},
    list: []
  }

  componentDidMount () {
    (this.props as any).initSocket();
    (this.props as any).getChatList();
    this.setState({
      userInfo: store.get('userInfo')
    })
  }

  componentDidUpdate () {
    // console.log(222);
    // const { userInfo } = this.state;
    // const props: any = this.props;
    // const talkId: string = props.match.params.chatId;
    // const list: any[] = Object.keys(props.chat.msgGroup).length ? props.chat.msgGroup[talkId] : [];
    // const userList = props.chat.userList;
    // const uIndex = userList.findIndex((item: any) => +item.id === +talkId);
    // const partner = userList[uIndex];
    // this.setState({
    //   partner,
    //   userInfo,
    //   list
    // })
  }

  renderUserList = () => {
    // const { list, userInfo, partner } = this.state;
    const { userInfo } = this.state;
    const props: any = this.props;
    const talkId: string = props.match.params.chatId;
    const list: any[] = Object.keys(props.chat.msgGroup).length ? props.chat.msgGroup[talkId] : [];
    const userList = props.chat.userList;
    const uIndex = userList.findIndex((item: any) => +item.id === +talkId);
    const partner = userList[uIndex];

    function chatCompare(chatA: any, chatB: any) {
      if (chatB.create_time < chatA.create_time) {
        return 1;
      } else if (chatB.create_time === chatA.create_time) {
        return 0;
      } else {
        return -1;
      }
    }

    list.sort(chatCompare);

    return (
      <div className="chat-list">
        {
          list.map((item: any) => {
            const isLeft = +item.f_from === +userInfo.id
            const avatar = isLeft ? userInfo.avatar : (partner as any).avatar;
            const cls = classnames('chat-item', {
              'chat-item-left': isLeft
            })
            return (
              <div className={cls} key={item.id}>
                <img className="avatar" src={avatar} />
                <div className="msg-content">
                {item.content}
                </div>
                {/* <div>
                  <div className="name">{item.nickname}</div>
                  <div className="msg">晚上来我家啊</div>
                </div> */}
              </div>
            )
          })
        }
      </div>
    )
  }

  sendMessage = (msg: string) => {
    const props: any = this.props;
    const talkId: string = props.match.params.chatId;
    (this.props as any).sendMsg({
      to: talkId,
      content: msg
    })
  }

  render () {
    return (
      <div className="page-chat-item">
        <Navbar title="聊天详情" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        { this.renderUserList() }
        <TalkForm send={this.sendMessage}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);