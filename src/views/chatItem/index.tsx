import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';
import { connect } from 'react-redux'
import { initSocket, getChatList } from "../../redux/chat.redux"

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  initSocket,
  getChatList
}

class Chat extends React.Component {
  state = {
    cMenu: []
  }

  componentDidMount () {
    (this.props as any).initSocket();
    (this.props as any).getChatList();
  }

  componentDidUpdate () {
    const props: any = this.props;
    console.log(props.chat);
  }

  renderUserList = () => {
    const props: any = this.props;
    const talkId: string = props.match.params.chatId;
    const list: any[] = Object.keys(props.chat.msgGroup).length ? props.chat.msgGroup[talkId] : [];
    const userList = props.chat.userList;
    const uIndex = userList.findIndex((item: any) => +item.id === +talkId);
    const partner = userList[uIndex];
    console.log(partner);

    return (
      <div className="chat-list">
          {
            list.map((item: any) => {
              return (
                <div className="chat-item" key={item.id}>
                  {item.content}
                  {/* <img className="avatar" src={item.avatar} />
                  <div>
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

  render () {
    return (
      <div className="page-chat">
        { this.renderUserList() }
        <Tabbar {...this.props} activeKey="chat"/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);