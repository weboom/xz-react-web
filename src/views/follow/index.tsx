import * as React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import xzApi from '../../apis';
import { Toast } from 'antd-mobile';

/**
 * @description 我的积分
 * @author Gaollard
 */
export default class extends React.Component {
  public state = {
    list: []
  }

  public getFollowList = async() => {
    Toast.loading('加载中', 0);
    const callback = (res: any) => {
      if (res && res.success) {
        setTimeout(() => {
          Toast.hide();
          this.setState({
            list: res.data.list
          })
        }, 300)
      }
    }
    xzApi.getFollowList().then(callback)
  }

  public renderList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="list-wrap">
        <div className="list">
          {
            list.map(item => {
              const obj: any = item.userInfo;
              return (
                <div className="item" key={item.id}>
                  <img className="avatar" src={obj.avatar} alt=""/>
                  <div>
                    <div className="nickname">{obj.nickname}</div>
                    <div className="item-desc">现居{obj.residence}</div>
                  </div>
                  <div className="btn-follow">已关注</div>
                  {/* <div className="item-date">{item.createTime}</div> */}
                  {/* <div className="item-value">+{item.value}</div> */}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.getFollowList();
  }

  render () {
    return (
      <div className="page-follow">
        <Navbar title="我的关注" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        <div className="page-body">
          { this.renderList() }
        </div>
      </div>
    )
  }
}