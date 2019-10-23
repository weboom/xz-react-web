import * as React from 'react';
import './index.css';
import apis from '../../apis';
import Button from 'antd-mobile/lib/button';
import Navbar from '../../components/navbar';

export default class Shipping extends React.Component {
  state = {
    list: []
  }

  componentDidMount () {
    apis.getdeliveryAddressList().then((res: any) => {
      console.log(res);
      this.setState({
        list: res.data.list
      })
    })
  }

  renderList = () => {
    return (
      <div className="list">
      {
        this.state.list.map((item: any) => {
          return (
            <div className="item" key={item.id}>
              <div className="item__hd">
                <div className="name">{ item.username }</div>
                <div className="tel">{ item.mobile }</div>
                <div className="remark">公司</div>
              </div>
              <div className="item__bd">
                <span>{item.province}</span>
                <span>{item.city}</span>
                <span>{item.district}</span>
                <span>{item.address}</span>
              </div>
              <div className="item__ft">
                <div className="act">
                  <Button type="primary" size="small">删除</Button>
                </div>
                <div className="act">
                  <Button type="primary" size="small">编辑</Button>
                </div>
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
			<div className="page-shipping">
       <Navbar title="我的地址" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        { this.renderList() }
        <div className="footer u-footer">
          <span>新建收货地址</span>
        </div>
			</div>
		)
	}
}