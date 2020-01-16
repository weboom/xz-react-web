import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';
import { InputItem } from 'antd-mobile';

interface MState {
  list: any[],
  key: string
}

export default class extends React.Component<{}, MState> {
  state = {
    list: [],
    key: ''
  }

  doSearch = async (key: string) => {
    const res: any = await xzApi.getXzProductByKey({ key: key || this.state.key })
    if (res && res.success) {
      this.setState({ list: res.data.list })
    }
  }

  _handleKeyChange = (v: string) => {
    this.setState({ key: v })
    if (v) {
      this.doSearch(v);
    } else {
      this.setState({ list: [] })
    }    
  }

  _goBack = () => {
    const props: any = this.props
    props.history.goBack();
  }

  _toProduct = (product: any) => {
    const props: any = this.props
    props.history.push(`/item/${product.id}`);
  }

  render () {
    return (
      <div className="page-search">
        <div className="search-wrap">
          <div className="search-box">
            <InputItem placeholder="输入关键词(比如：IPhone)" onChange={this._handleKeyChange}/>
          </div>
          <span className="btn-back" onClick={this._goBack}>取消</span>
        </div>
        {
          this.state.list.map((item: any, index) => {
            return (
              <div className="g-item" key={index} onClick={() => this._toProduct(item)}>
                <div className="g-name">{item.title}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}