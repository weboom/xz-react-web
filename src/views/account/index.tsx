import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';
import Icon from 'antd-mobile/lib/icon';
import List from 'antd-mobile/lib/list';
import xzApi from '../../apis/xy';

const Item = List.Item;

export default class extends React.Component {
  state = {
    userInfo: null
  }

  public renderProfile () {
    const userInfo: any = this.state.userInfo;

    return (
      <div className="mod-banner">
        <div className="user-cover-wrap">
          <div className="user-cover" />
        </div>
        <div className="user-box">
          <img className="user-avatar" src={
            userInfo ? userInfo.avatar : require('../../assets/img/avatar.png')
          } alt=""/>
          {
            userInfo ? (
              <div className="avatar-right">
                <div>
                  <div className="nickname">{ userInfo.nickname }</div>
                  <div className="btn-profile">
                    <span>个人主页</span>
                    <Icon className="icon" type="right" />
                  </div>
                </div>
                <div className="btn-checkin">签到</div>
              </div>
            ) : (
              <div onClick={this.handleLogin}>请先登录</div>
            )
          }
        </div>
        <div className="card-menu">
          <div className="">
            <i className="icon iconfont icon-guanzhu" />
            <span className="text">关注(0)</span>
          </div>
          <div className="">
            <i className="icon iconfont icon-shoucang" />
            <span className="text">收藏(0)</span>
          </div>
          <div className="">
            <i className="icon iconfont icon-zan" />
            <span className="text">点赞(0)</span>
          </div>
          <div className="">
            <i className="icon iconfont icon-diamond" />
            <span className="text">积分(0)</span>
          </div>
        </div>
      </div>
    )
  }

  renderLink() {
    return (
      <div className="mod-link">
        <List className="my-list">
          <Item arrow="horizontal">发布闲置</Item>
          <Item arrow="horizontal" onClick={() => {
            console.log(2);
          }}>我的发布</Item>
          <Item arrow="horizontal" onClick={() => {
            console.log(2);
          }}>地址管理</Item>
          <Item arrow="horizontal" onClick={() => {
            console.log(2);
          }}>关于我们</Item>
        </List>
      </div>
    )
  }

  public handleLogin = () => {
    const onSuccess = (res: any) => {
      console.log(res);
      if (res && res.success) {
        this.setState({
          userInfo: res.data
        })
      }
    }
    xzApi.login({
      mobile: '13249064450',
      password: '123456'
    }).then(onSuccess)
  }

  render () {
    return (
      <div className="page-account">
        { this.renderProfile() }
        { this.renderLink() }
        <Tabbar { ...this.props } activeKey="account" />
      </div>
    )
  }
}