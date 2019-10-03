import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';
import Navbar from '../../components/navbar';
import XzProdustList from '../../components/xzProductList';

export default class extends React.Component {
  state = {
    list: []
  }

  componentDidMount () {
    const onFinish = (res: any) => {
      if (res && res.success) {
        this.setState({
          list: res.data.list
        })
      }
    }
    xzApi.getXzProductList().then(onFinish)
  }

  public renderXzProductList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="g-list">
        {
          list.map(item => {
            return (
              <div className="g-item" key={item.id}>
                <div className="g-logo-wrap">
                    <img src={item.imgs[0]} alt=""/>
                  </div>
                  <div className="g-item-name">
                    <div>{ item.title + item.description }</div>
                  </div>
                  <div className="g-item-price">¥{+item.price / 100}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render () {
    return (
      <div className="page-myXzProduct">
        <Navbar title="我的闲置" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        <XzProdustList />
      </div>
    )
  }
}