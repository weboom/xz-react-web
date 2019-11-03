import * as React from 'react';
import './index.css';
import { Icon, List, Toast } from 'antd-mobile';
import Tabbar from '../../components/tabbar';
import xzApi from '../../apis/xy';
import * as store from 'store';

const Item = List.Item;

export default class extends React.Component {
  state = {
    userInfo: null,
    checkState: false,
    totalInfo: {
      followNum: 0,
      likeNum: 0,
      collectNum: 0,
      pointNum: 0
    }
  }

  public renderProfile () {
    const userInfo: any = this.state.userInfo;
    const { checkState, totalInfo } = this.state;

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
                <div className="btn-checkin" onClick={this.handleClickCheckin}>
                  <span>{checkState ? '已签到' : '立即签到'}</span>
                </div>
              </div>
            ) : (
              <div onClick={() => {
                (this.props as any).history.push('/login');
              }}>立即登录</div>
            )
          }
        </div>
        <div className="card-menu">
          <div className="" onClick={() => {
            this.switchUrl('/follow')
          }}>
            <i className="icon iconfont icon-guanzhu" />
            <span className="text">关注({totalInfo.followNum})</span>
          </div>
          <div className="" onClick={() => {
            this.switchUrl('/collect')
          }}>
            <i className="icon iconfont icon-shoucang" />
            <span className="text">收藏({totalInfo.collectNum})</span>
          </div>
          <div className="" onClick={() => {
            this.switchUrl('/like')
          }}>
            <i className="icon iconfont icon-zan" />
            <span className="text">点赞({totalInfo.likeNum})</span>
          </div>
          <div className="" onClick={() => {
            this.switchUrl('/point')
          }}>
            <i className="icon iconfont icon-diamond" />
            <span className="text">积分({totalInfo.pointNum})</span>
          </div>
        </div>
      </div>
    )
  }

  renderLink() {
    return (
      <div className="mod-link">
        <List className="my-list">
          <Item arrow="horizontal" onClick={() => {
            this.switchUrl('/addItem');
          }}>发布闲置</Item>
          <Item arrow="horizontal" onClick={() => {
            this.switchUrl('/myXzProduct');
          }}>我的发布</Item>
          <Item arrow="horizontal" onClick={() => {
            this.switchUrl('/shipping');
          }}>地址管理</Item>
          <Item arrow="horizontal" onClick={() => {
            this.switchUrl('/about');
          }}>关于我们</Item>
        </List>
      </div>
    )
  }

  public initUserInfo = () => {
    const userInfo: any = store.get('userInfo');
    this.setState({
      userInfo
    })
  }

  getTotalInfo = () => {
    xzApi.getUserTotalInfo().then((res: any) => {
      if (res && res.success) {
        this.setState({
          totalInfo: res.data
        })
      }
    })
  }

  public switchUrl = (url: string) => {
    const history = (this.props as any).history;
    history.push(url);
  }

  public componentWillMount() {
    this.initUserInfo();
    this.getCheckin();
    this.getTotalInfo();
  }

  public getCheckin = () => {
    const onSuccss = (res: any) => {
      if (res && res.success) {
        this.setState({
          checkState: res.data.status === 1
        })
      }
    }
    xzApi.getCheckinStatus().then(onSuccss)
  }

  public doCheckin = async() => {
    const callback = (res: any) => {
      if (res && res.success) {
        Toast.success('签到成功');
        this.setState({
          checkState: true
        })
        this.getTotalInfo();
      } else {
        Toast.fail(res.errMsg);
      }
    }
    const ret = await xzApi.checkin();
    callback(ret);
  }

  public handleClickCheckin = () => {
    if (!this.state.checkState) {
      this.doCheckin();
    } else {
      (this.props as any).history.push('/point')
    }
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