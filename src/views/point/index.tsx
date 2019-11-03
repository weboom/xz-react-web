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

  public getPointList = async() => {
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
    xzApi.getPointList().then(callback)
  }

  public renderList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="list-wrap">
        <div className="list">
          {
            list.map(item => {
              return (
                <div className="item" key={item.id}>
                  <div className="item-date">{item.createTime}</div>
                  <div className="item-value">+{item.value}</div>
                  <div className="item-desc">{item.description}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.getPointList();
  }

  render () {
    return (
      <div className="page-point">
        <Navbar title="我的积分" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        <div className="page-body">
          { this.renderList() }
        </div>
      </div>
    )
  }
}