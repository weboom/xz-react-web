import * as React from 'react';
import apis from '../../apis';
import './index.css';
import { menuList } from './menu.config';

export default class Welcome extends React.Component {
  public state = {
    list: []
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
      </div>
    )
  }

  public render () {
    return (
      <div className="page-welcome">
        {this.renderHeader()}
        {this.renderMainSlider()}
        {this.renderMenu()}
        {this.renderList()}
      </div>
    )
  }
}