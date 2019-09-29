import * as React from 'react';
import { itemInfo } from './data';
import Carousel from 'antd-mobile/lib/carousel';
import './index.css';

export default class extends React.Component {

  public renderBanner = () => {
    return (
      <Carousel autoplay={false} infinite>
        {itemInfo.imgs.map(val => (
          <div className="banner-slide" key={val} style={{
            backgroundImage: `url(${val})`
          }}>
            {/* <img
              src={val}
              style={{ width: '100%', verticalAlign: 'top' }}
            /> */}
          </div>
        ))}
    </Carousel>
    )
  }

  public renderGInfo () {
    return (
      <div className="mod-ginfo">
        <div className="col-point">
          <span>500</span>
          <img className="icon-point" src={require('../../assets/img/point.png')} alt=""/>
        </div>
        <div className="g-name">{itemInfo.name}</div>
        <div className="g-desc">{itemInfo.desc}</div>
      </div>
    )
  }

  public renderUserInfo() {
    const author = itemInfo.author;
    return (
      <div className="mod-author">
        <img className="author-avatar" src={author.avatar} alt="" />
        <div>
          <div className="author-name">{author.nickname}</div>
          <div className="author-desc">{author.desc}</div>
        </div>
      </div>
    )
  }

  public renderFooter() {
    return (
      <div className="footer">
        <div>等待</div>
      </div>
    )
  }
  
  public render () {
    return (
      <div className="page-product">
        {this.renderBanner()}
        {this.renderGInfo()}
        {this.renderUserInfo()}
      </div>
    )
  }
}
