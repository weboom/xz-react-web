import * as React from 'react';
import './index.css';
import apis from '../../apis';
import Button from 'antd-mobile/lib/button';
import Navbar from '../../components/navbar';
import AddShipping from '../../components/addAddress';
import Toast from 'antd-mobile/lib/toast';
import Modal from 'antd-mobile/lib/modal';

export default class Shipping extends React.Component {
  state = {
    list: [],
    curAddress: {},
    editVisible: false
  }

  componentDidMount () {
    this.doGetAddress();
  }

  render () {
		return (
			<div className="page-shipping">
        <Navbar title="我的地址" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        { this.renderList() }
        {
          this.state.editVisible ? (
            <div className="edit-address-pop">
              <AddShipping
                address={this.state.curAddress}
                close={() => {
                  this.setState({
                    curAddress: null,
                    editVisible: false
                  })
                  this.doGetAddress();
                }}
              />
            </div>
          ) : null
        }
        <div className="footer u-footer" onClick={()=> {
          this.setState({
            editVisible: true
          })
        }}>
          <span>新建收货地址</span>
        </div>
			</div>
		)
	}

  doGetAddress = () => {
    apis.getdeliveryAddressList().then((res: any) => {
      this.setState({
        list: res.data.list
      })
    })
  }

  handleRemove = (id: number) => {
    const fn = () => {
      apis.removeAddress({ id }).then((res: any) => {
        if (res.success) {
          Toast.success('删除成功');
          const list = this.state.list.filter((element: any) => {
            return element.id !== id
          })
          this.setState({
            list
          })
        }
      })
    }
    Modal.alert('系统提示', '真的要删除地址吗？', [{
      text: '取消',
      onPress: () => {
        console.log('cancel');
      }
    }, {
      text: '确认',
      onPress: () => {
        fn();
      }
    }])
  }

  handleAdd = () => {
    console.log(5)
  }

  handleEdit = (curAddress: any) => {
    this.setState({
      curAddress,
      curEditAddress: true
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
                  <Button type="primary" onClick={() => { 
                      this.handleRemove(item.id);
                    }} size="small">删除</Button>
                </div>
                <div className="act">
                  <Button type="primary" size="small" onClick={() => {
                    this.setState({
                      curAddress: item,
                      editVisible: true
                    })
                  }}>编辑</Button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
    )
  }
}