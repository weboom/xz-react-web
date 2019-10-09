import * as React from 'react';
import Carousel from 'antd-mobile/lib/carousel';
import xzApi from '../../apis/xy';
import './index.css';
const classnames = require('classnames')

const XZ_PRODUCT_OBJECT_TYPE = 1;
const COLLECT_TYPE = 1;
const LIKE_TYPE = 2;

export default class extends React.Component {
  state = {
    itemInfo: null, // 商品信息
    likeState: false,
    collectState: false,
    likeData: {},
    collectData: {}
  }

  public renderBanner = () => {
    const itemInfo: any = this.state.itemInfo;
    const imgs: any[] = itemInfo.imgs;
    return (
      <Carousel autoplay={false} infinite>
        {imgs.map(val => (
          <div
            className="banner-slide"
            key={val}
            style={{ backgroundImage: `url(${val})`}}
          />
        ))}
    </Carousel>
    )
  }

  componentDidMount () {
    const xzProductId = (this.props as any).match.params.xzProductId
    if (xzProductId) {
      xzApi.getXzProductItem(xzProductId).then(res => {
        this.setState({
          itemInfo: res.data
        })
      })
      this.getLikeState();
      this.getCollectState();
    }
  }

  handleClickLike = () => {
    if (this.state.likeState) {
      xzApi.removeCollect({
        recordId: (this.state.likeData as any).id
      }).then(res => {
        this.getLikeState()
      })
    } else {
      const { xzProductId } = (this.props as any).match.params;
      xzApi.addCollect({
        itemId: xzProductId,
        typeId: LIKE_TYPE,
        objectId: XZ_PRODUCT_OBJECT_TYPE
      }).then((res: any) => {
        this.getLikeState()
      })
    }
  }

  handleClickCollect = () => {
    if (this.state.collectState) {
      xzApi.removeCollect({
        recordId: (this.state.collectData as any).id
      }).then(res => {
        this.getCollectState()
      })
    } else {
      const { xzProductId } = (this.props as any).match.params;
      xzApi.addCollect({
        itemId: xzProductId,
        typeId: COLLECT_TYPE,
        objectId: XZ_PRODUCT_OBJECT_TYPE
      }).then((res: any) => {
        this.getCollectState()
      })
    }
  }

  getLikeState = () => {
    const { xzProductId } = (this.props as any).match.params
    xzApi.getCollectState({
      itemId: xzProductId,
      typeId: LIKE_TYPE,
      objectId: XZ_PRODUCT_OBJECT_TYPE
    }).then((res: any) => {
      if (!res || !res.success) {
        return;
      }
      this.setState({
        likeState: !!res.data.status,
        likeData: res.data
      })
    })
  }

  getCollectState = () => {
    const { xzProductId } = (this.props as any).match.params
    xzApi.getCollectState({
      itemId: xzProductId,
      typeId: COLLECT_TYPE,
      objectId: XZ_PRODUCT_OBJECT_TYPE
    }).then((res: any) => {
      if (!res || !res.success) {
        return;
      }
      this.setState({
        collectState: !!res.data.status,
        collectData: res.data
      })
    })
  }

  public renderGInfo () {
    const itemInfo: any = this.state.itemInfo;
    return (
      <div className="mod-ginfo">
        <div className="col-point">
          <span>500</span>
          <img className="icon-point" src={require('../../assets/img/point.png')} alt=""/>
        </div>
        <div className="g-name">{itemInfo.title}</div>
        <div className="g-desc">{itemInfo.description}</div>
      </div>
    )
  }

  public renderUserInfo() {
    const itemInfo: any = this.state.itemInfo;
    const author = itemInfo.user;
    return (
      <div className="mod-author">
        <img className="author-avatar" src={author.avatar} alt="" />
        <div>
          <div className="author-name">{author.nickname}</div>
          <div className="author-desc">{author.residence}</div>
        </div>
      </div>
    )
  }

  public renderFooter() {
    const cls1 = classnames('act-item', {
      'act-item-active': this.state.likeState
    })
    const cls2 = classnames('act-item', {
      'act-item-active': this.state.collectState
    })
    return (
      <div className="footer">
        <div className="act-list">
          <div className={cls1} onClick={this.handleClickLike}>
            <i className="icon iconfont icon-zan" />
            <span>喜欢</span>
          </div>
          <div className={cls2} onClick={this.handleClickCollect}>
            <i className="icon iconfont icon-shoucang" />
            <span>收藏</span>
          </div>
          <div className="act-item">
            <i className="icon iconfont icon-comment" />
            <span>留言</span>
          </div>
        </div>
        <div className="btn-chat">我想要</div>
      </div>
    )
  }

  public renderComment() {
    return (
      <div className="mod-comment">
        <div className="mod__head">
          <span>留言</span>
        </div>
        <div className="mod__body">
          <span className="zero-text">暂无留言</span>
        </div>
      </div>
    )
  }
  
  public render () {
    if (this.state.itemInfo) {
      return (
        <div className="page-product">
          <div>
            { this.renderBanner() }
            { this.renderGInfo() }
            { this.renderUserInfo() }
            { this.renderFooter() }
            { this.renderComment() }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
