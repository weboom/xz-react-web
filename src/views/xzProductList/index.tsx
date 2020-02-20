import * as React from 'react';
import './index.css';
import {Icon, List, Radio} from 'antd-mobile';
import api from '../../apis/xy'
import parser from 'url-parse'
import LazyLoad from 'react-lazyload';
import ZeroBox from '../../components/zero-box';
import InlineLoading from '../../components/inline-loading'

const RadioItem = Radio.RadioItem;

export default class XzProductList extends React.Component {
  state = {
    list: [],
    value: '',
    loading: false,
    filterVisible: false
  }

  onChange = (value : any) => {
    this.setState({value});
  };

  componentDidMount() {
    this.doSearch()
  }

  doSearch = async() => {
    const url : any = parser((window as any).location, true)
    const {skuId} = url.query
    if (this.state.loading) {
      return
    }
    this.setState({
      loading: true
    })
    const res : any = await api.getXzProductByKey({skuId})
    if (res && res.success) {
      setTimeout(() => {
        this.setState({
          loading: false,
          list: res.data.list
        })
      }, 500)
    }
  }

  render() {
    return (
      <div className="page-xzProductList">
        <div className="search-box">
          <div className="back-btn" onClick={() => {
            (this.props as any).history.goBack()
          }}>
            <Icon type="left" size="lg"/>
          </div>
          <div className="input-box">
            <span className="icon-search"/>
            <input className="input" placeholder="这里可以搜索"/>
          </div>
          <div className="menu-btn">
            <Icon type="ellipsis"/>
          </div>
        </div>

        <div className="filter-list">
          <div className="filter-item">
            <span>综合</span>
          </div>
          <div className="filter-item">
            <span>销量</span>
          </div>
          <div className="filter-item">
            <span>区域</span>
          </div>
          <div className="filter-item" onClick={() => {
            this.setState({
              filterVisible: !this.state.filterVisible
            })
          }}>
            <span>筛选</span>
          </div>
        </div>
        {this.state.filterVisible ? this._renderList() : null}
        {this.renderXzProductList()}
      </div>
    )
  }

  renderXzProductList = () => {
    const list : any[] = this.state.list;
    const pImg = <img
      className="g-logo-wrap g-logo-placeholder"
      src="https://img10.360buyimg.com/wq/jfs/t24601/190/890984006/4559/731564fc/5b7f9b7bN3ccd29ab.png"/>
    if (this.state.loading) {
      return <InlineLoading />
    }
    if (!this.state.list.length) {
      return <ZeroBox />
    }
    return (
      <div className="p-list">
        {list.map((item : any) => {
          const uInfo : any = item.userInfo
          return (
            <div
              className="p-item"
              key={item.id}
              onClick={() => {
              const history : any = (this.props as any).history;
              history.push(`/item/${item.id}`);
            }}>
              <div className="p-logo">
                <LazyLoad debounce={true} placeholder={pImg}>
                  <img src={item.imgs[0]} alt=""/>
                </LazyLoad>
              </div>
              <div className="p-main">
                <div className="p-item-name">
                  <img className="p-icon" src={require('../../assets/img/tag.png')} alt=""/>
                  <span>{item.title + item.description}</span>
                </div>
                <div className="p-item-price">¥{+ item.price / 100}</div>
                <div className="p-uinfo">
                  <img className="u-avatar" src={uInfo.avatar} alt=""/>
                  <span className="u-name">{uInfo.nickname}</span>
                </div>
              </div>
            </div>
          )
        })
}
      </div>
    )
  }

  _renderList() {
    const value : any = this.state.value;
    const data = [
      {
        value: 0,
        label: '综合排序'
      }, {
        value: 1,
        label: '最新发布'
      }, {
        value: 2,
        label: '价格升序'
      }, {
        value: 3,
        label: '价格降序'
      }, {
        value: 4,
        label: '点赞数'
      }, {
        value: 5,
        label: '浏览数'
      }
    ];
    return (
      <div className="filter-pop">
        <List renderHeader={() => '选择排序方式'}>
          {data.map(i => (
            <RadioItem
              key={i.value}
              checked={value === i.value}
              onChange={() => this.onChange(i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }

  _renderList2() {
    const value : any = this.state.value;
    const data = [
      {
        value: 0,
        label: '综合排序'
      }, {
        value: 1,
        label: '最新发布'
      }, {
        value: 2,
        label: '价格从低到高'
      }, {
        value: 3,
        label: '价格从高到低'
      }, {
        value: 4,
        label: '点赞数'
      }, {
        value: 5,
        label: '浏览数量'
      }
    ];
    return (
      <div className="filter-pop">
        <List renderHeader={() => '选择排序方式'}>
          {data.map(i => (
            <RadioItem
              key={i.value}
              checked={value === i.value}
              onChange={() => this.onChange(i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }
}
