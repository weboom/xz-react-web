import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';

export default class extends React.Component {
  public renderProfile () {
    return (
      <div className="mod-banner">
        <div className="user-cover-wrap">
          <div className="user-cover" />
        </div>
        <div className="user-box">
          <img className="user-avatar" src={require('../../assets/img/avatar.png')} alt=""/>
          <div className="avatar-right">
            <div className="nickname">厉害了我的国</div>
            <div className="btn-checkin">签到</div>
          </div>
        </div>
        <div className="card-menu">
          <div className="">收藏</div>
          <div className="">评价</div>
          <div className="">卡劵</div>
          <div className="">消息</div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="page-account">
        { this.renderProfile() }
        <Tabbar { ...this.props }/>
      </div>
    )
  }
}