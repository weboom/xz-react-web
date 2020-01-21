import * as React from 'react';
import './index.css';
import apis from '../../apis';
import Navbar from '../../components/navbar';
import AddShipping from '../../components/addAddress';
import { Toast, Modal, Button } from 'antd-mobile';

import { connect } from 'react-redux'
import { getMyAddress } from '../../redux/account.redux'

const mapStateToProps = (state: any) => {
  return {
    list: state.account.address.list,
  }
}

const mapActionToProps = (dispatch: any, props: any) => {
  return {
    getMyAddress: () => dispatch(getMyAddress())
  }
}

interface Props {
  list: any[]
  history: any,
  getMyAddress (): any
}

class Shipping extends React.Component<Props, {}> {
  state = {
    list: [],
    curAddress: {},
    editVisible: false
  }

  _handleAdd = () => {
    this.setState({ editVisible: true })
  }
  
  _onCloseEdit = () => {
    this.setState({
      curAddress: null,
      editVisible: false
    })
    this.props.getMyAddress();    
  }

  // 点击删除
  _handleRemove = (id: number) => {
    Modal.alert('系统提示', '真的要删除地址吗？', [{
      text: '取消'
    }, {
      text: '确认',
      onPress: async () => {
        const res: any = await apis.removeAddress({ id })
        if (res && res.success) {
          Toast.success('删除成功');
          this.setState({
            list: this.state.list.filter((element: any) => element.id !== id)
          })
        }
      }
    }])
  }

  // 点击编辑
  _handleEdit = (item: any) => {
    this.setState({
      curAddress: item,
      editVisible: true
    })    
  }

  componentDidMount () {
    this.props.getMyAddress()
  }

  render () {
		return (
			<div className="page-shipping">
        <Navbar title="我的地址" onLeftClick={() => this.props.history.goBack()}/>
        { this.renderList() }
        {
          this.state.editVisible ? (
            <div className="edit-address-pop">
              <AddShipping address={this.state.curAddress} close={this._onCloseEdit}/>
            </div>
          ) : null
        }
        <div className="footer u-footer" onClick={this._handleAdd}>
          <span>新建收货地址</span>
        </div>
			</div>
		)
  }

  _renderItem = (item: any) => {
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
            <Button type="primary" onClick={() => this._handleRemove(item.id)} size="small">删除</Button>
          </div>
          <div className="act">
            <Button type="primary" size="small" onClick={() => this._handleEdit(item)}>编辑</Button>
          </div>
        </div>
      </div>
    )
  }

  renderList = () => {
    return (
      <div className="list">
        { this.props.list.map((item: any) => this._renderItem(item)) }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(Shipping)