import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';
import { connect } from 'react-redux'
import { initSocket, getChatList } from "../../redux/chat.redux"
import cookie from 'js-cookie';

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  initSocket,
  getChatList
}

class Chat extends React.Component {
  state = {
    cMenu: [],
    token: ''
  }

  componentDidMount () {
    const token = cookie.get('token');
    this.setState({
      token
    })
    if (cookie) {
      (this.props as any).initSocket();
      (this.props as any).getChatList();
    }
  }

  getLastMsg = (user: any) => {
    const key = 'content';
    if ((this.props as any).chat.msgGroup[user.id]) {
      return (this.props as any).chat.msgGroup[user.id][0][key];
    }
    return ''
  }

  renderUserList = () => {
    const props: any = this.props;
    const userList = props.chat.userList;
    return (
      <div className="chat-list">
          {
            userList.map((item: any) => {
              return (
                <div className="chat-item" key={item.id} onClick={() => {
                  (this.props as any).history.push(`/chat/${item.id}`)
                }}>
                  <img className="avatar" src={item.avatar} />
                  <div>
                    <div className="name">{item.nickname || '匿名用户'}</div>
                    <div className="msg">{this.getLastMsg(item)}</div>
                  </div>
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
        {
          this.state.token ? this.renderUserList() : (
            <div className="login-tip" onClick={() => {
              console.log(this.props);
              const props: any = this.props;
              const url = props.location.pathname + props.location.search;
              (this.props as any).history.push(`/login?redirect=${encodeURIComponent(url)}`)
            }}>
              <span>请先登录</span>
            </div>
          )
        }
        <Tabbar {...this.props} activeKey="chat"/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);