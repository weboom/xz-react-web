import * as React from 'react';
import api from '../../apis/xy';
import './index.css';
import { Carousel } from 'antd-mobile';
import Tabbar from '../../components/tabbar';
import XzProductList from '../../components/xzProductList';
import XzCategoryList from '../../components/xzCategoryList';

export default class Welcome extends React.Component {
  public state = {
    list: [],
    imgHeight: 176,
    cMenu: [],
    curCategoryId: 1,
    slideList: [],
    menuList: []
  };

  public componentDidMount () {
    api.getXzCategorytList().then(res => {
      this.setState({
        cMenu: res.data.list
      })
    })
    api.getMainAdvert().then((res: any) => {
      if (res && res.success) {
        this.setState({
          slideList: res.data.list
        })
      }
    })
    api.getMainMenu().then((res: any) => {
      if (res && res.success) {
        this.setState({
          menuList: res.data.list
        })
      }
    })
  }

  handleClickXzProduct = (xzProductId: string) => {
    const history: any = (this.props as any).history;
    history.push(`/item/${xzProductId}`);
  };

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
  };

  public renderMenu = () => {
    return (
      <div className="mod-menu">
        <div className="menu">
          {
            this.state.menuList.map((item: any, index) => {
              return (
                <div className="menu-item" key={index} onClick={() => {
                  if (item.url) {
                    if (item.url.indexOf('http') !== -1) {
                      window.location.href = item.url
                    }
                  }
                }}>
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
          <span className="search-text" onClick={this.navigateToSearch}>输入关键词</span>
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
            {this.state.slideList.map((val: any) => (
              <a key={val.img} href={val.url}>
                <img className="slide-img" src={val.img}/>
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

  public navigateToSearch = () => {
    const history: any = (this.props as any).history;
    history.push('/search');
  }

  public render () {
    return (
      <div className="page-welcome page-has-tabbar">
        {this.renderHeader()}
        {this.renderMainSlider()}
        {this.renderMenu()}
        <div className="mod-cate">
          <XzCategoryList categoryId={this.state.curCategoryId} onClickItem={(categoryId) => {
            this.setState({
              curCategoryId: categoryId
            })
          }}/>
        </div>
        <XzProductList {...this.props} categoryId={this.state.curCategoryId}/>
        <Tabbar {...this.props} activeKey="welcome" />
      </div>
    )
  }
}