import * as React from 'react';
// import { itemInfo } from './data';
import Carousel from 'antd-mobile/lib/carousel';
import xzApi from '../../apis/xy';
import './index.css';

export default class extends React.Component {
  state = {
    itemInfo: null
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
            style={{
              backgroundImage: `url(${val})`
            }}
          />
        ))}
    </Carousel>
    )
  }

  componentDidMount () {
    const xzProductId = (this.props as any).match.params.xzProductId
    xzApi.getXzProductItem(xzProductId).then(res => {
      this.setState({
        itemInfo: res.data
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
    return (
      <div className="footer">
        <div className="act-list">
          <div className="act-item">
            <span>喜欢</span>
          </div>
          <div className="act-item">
            <span>收藏</span>
          </div>
          <div className="act-item">
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
