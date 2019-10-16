import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';
import InputItem from 'antd-mobile/lib/input-item';

interface MState {
  list: any[],
  key: string
}

export default class extends React.Component<{}, MState> {
  state = {
    list: [],
    key: ''
  }

  doSearch = (key: string) => {
    xzApi.getXzProductByKey({ key: key || this.state.key }).then((res: any) => {
      if (res && res.success) {
        this.setState({
          list: res.data.list
        })
      }
    })
  }

  render () {
    return (
      <div className="page-search">
        <div className="search-wrap">
          <div className="search-box">
            <InputItem placeholder="输入关键词(比如：IPhone)" onChange={(v) => {
              this.setState({
                key: v
              })
              if (v) {
                this.doSearch(v);
              } else {
                this.setState({
                  list: []
                })
              }
            }}/>
          </div>
          <span className="btn-back" onClick={() => {
          (this.props as any).history.goBack();
        }}>取消</span>
        </div>
        {
          this.state.list.map((item: any, index) => {
            return (
              <div className="g-item" key={index} onClick={() => {
                (this.props as any).history.push(`/item/${item.id}`);
              }}>
                <div className="g-name">{item.title}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}