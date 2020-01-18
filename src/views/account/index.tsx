import * as React from 'react';
import './index.css';
import { Icon, List, Toast } from 'antd-mobile';
import Tabbar from '../../components/tabbar';
import api from '../../apis/xy';
import { connect } from 'react-redux'
import {
  login,
  getUserAmount,
  getCheckinState,
  doCheckin
} from '../../redux/user.redux'

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: () => {
      dispatch(login({
        mobile: 13249064450,
        password: 123456
      }))
    },
    getCheckinState: () => dispatch(getCheckinState()),
    getAmountInfo: () => dispatch(getUserAmount()),
    doCheckin: () => dispatch(doCheckin()),
  };
}

const Item = List.Item;

class Account extends React.Component {
  state = {
    checkState: false
  }

  public renderProfile () {
    const props: any = this.props;
    const userInfo: any = props.user.userInfo;
    const amountInfo: any = props.user.amountInfo;
    const checkState: boolean = props.user.checkinState;

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
        {
          amountInfo ? (
            <div className="card-menu">
            <div className="" onClick={() => {
              this.switchUrl('/follow')
            }}>
              <i className="icon iconfont icon-guanzhu" />
              <span className="text">关注({amountInfo.followNum})</span>
            </div>
            <div className="" onClick={() => {
              this.switchUrl('/collect')
            }}>
              <i className="icon iconfont icon-shoucang" />
              <span className="text">收藏({amountInfo.collectNum})</span>
            </div>
            <div className="" onClick={() => {
              this.switchUrl('/like')
            }}>
              <i className="icon iconfont icon-zan" />
              <span className="text">点赞({amountInfo.likeNum})</span>
            </div>
            <div className="" onClick={() => {
              this.switchUrl('/point')
            }}>
              <i className="icon iconfont icon-diamond" />
              <span className="text">积分({amountInfo.pointNum})</span>
            </div>
          </div>
          ) : null
        }
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

  switchUrl = (url: string) => {
    const history = (this.props as any).history;
    history.push(url);
  }

  componentDidMount() {
    const props: any = this.props
    if (props.user.userInfo) {
      if (!props.user.accountInfo) { props.getAmountInfo() }
      if(!props.user.checkinState) { props.getCheckinState() }
    }
  }

  doCheckin = async() => {
    const res: any = await api.checkin();
    if (res && res.success) {
      Toast.success('签到成功');
      this.setState({ checkState: true })
    } else {
      Toast.fail(res.errMsg);
    }
  }

  handleClickCheckin = () => {
    const props: any = this.props;
    if (!props.user.checkinState) {
      this.doCheckin();
    } else {
      props.history.push('/point')
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

export default connect(mapStateToProps, mapDispatchToProps)(Account)
