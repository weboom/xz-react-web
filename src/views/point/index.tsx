import * as React from 'react';
import './index.css';
import xzApi from '../../apis';
import Navbar from '../../components/navbar';
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  history: any
}

export default class extends React.Component<Props> {
  public state = {
    list: [],
    pageIndex: 0,
    pageSize: 20,
    hasMore: true,
    loading: false
  }

  _getDataList = async (isInit: boolean = true) => {
    const pageIndex = isInit ? this.state.pageIndex : ++this.state.pageIndex
    const res: any = await xzApi.getPointList({
      pageIndex,
      pageSize: this.state.pageSize,
    })
    if (res && res.success) {
      const list = isInit ? res.data.list : this.state.list.concat(res.data.list);
      this.setState({
        list,
        pageIndex,
        hasMore: list.length < res.data.total
      })
    }
  }

  _loadMore = () => {
    this._getDataList(false)
  }

  componentWillMount () {
    this._getDataList();
  }

  renderList = () => {
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

  _renderLoading = () => {
    return (
      <div className="loading">
        <ReactLoading height={24} width={24} className="svg" type="spin" color="#333"/>
        <span>加载中...</span>
      </div>
    )
  }

  render () {
    return (
      <div className="page-point">
        <Navbar title="我的积分" onLeftClick={this.props.history.goBack}/>
        <div className="page-body">
          <InfiniteScroll
            dataLength={this.state.list.length}
            next={this._loadMore}
            hasMore={this.state.hasMore}
            loader={this._renderLoading()}
          >
            { this.renderList() }
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}