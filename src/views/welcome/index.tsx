import * as React from 'react';
import apis from '../../apis';
import './index.css';
import Carousel from 'antd-mobile/lib/carousel';
import { menuList, sliderList, itemList } from './menu.config';
import Tabbar from '../../components/tabbar';

export default class Welcome extends React.Component {
  public state = {
    list: [],
    data: ['1', '2', '3', '4'],
    imgHeight: 176,
  }

  public componentDidMount () {
    apis.getDemandList({}).then(ret => {
      const res = ret as any;
      if (res && res.success) {
        this.setState({
          list: res.data.list
        })
      }
    })
    setTimeout(() => {
      this.setState({
        data: sliderList
      });
    }, 100);
  }

  public renderList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="d-list">
        {list.map((item, index) => {
          return (
            <div className="d-item" key={index}>{ item.title }</div>
          )
        })}
      </div>
    )
  }

  public renderMenu = () => {
    return (
      <div className="mod-menu">
        <div className="menu">
          {
            menuList.map((item, index) => {
              return (
                <div className="menu-item" key={index}>
                  <img className="menu-icon" src={item.icon} alt=""/>
                  <span className="menu-name">{ item.name }</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  public renderHeader = () => {
    return (
      <div className="mod-search">
        <div className="search-box">
          <img className="icon-menu" src={require('../../assets/img/menu.png')} alt=""/>
          <span className="search-text">输入关键词</span>
          <span className="search-btn">扫一扫</span>
        </div>
      </div>
    )
  }

  public renderMainSlider = () => {
    return (
      <div className="mod-main-adver">
        <div className="slider-bg" />
        <div className="slider-list">
          <Carousel autoplay={false} infinite cellSpacing={10}>
            {this.state.data.map(val => (
              <a
                key={val}
                style={{
                  display: 'inline-block',
                  width: '100%',
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={val}
                  style={{ width: '100%', verticalAlign: 'top' }}
                />
              </a>
            ))}
          </Carousel>
        </div>
      </div>
    )
  }

  public navigateToItem = () => {
    const history: any = (this.props as any).history;
    history.push('/item');
  }

  public renderItemList = () => {
    return (
      <div className="g-list">
          {
            itemList.map((item, index) => {
              return (
                <div className="g-item" key={index} onClick={this.navigateToItem}>
                  <div className="g-logo-wrap">
                    <img src={item.imgs[0]} alt=""/>
                  </div>
                  <div className="g-item-name">
                    <div>{ item.name }</div>
                  </div>
                  <div className="g-item-price">¥{+item.price / 100}</div>
                </div>
              )
            })
          }
      </div>
    )
  }

  public render () {
    return (
      <div className="page-welcome page-has-tabbar">
        {this.renderHeader()}
        {this.renderMainSlider()}
        {this.renderMenu()}
        <div className="divider" />
        {this.renderItemList()}
        <Tabbar />
      </div>
    )
  }
}