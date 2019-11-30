import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';
import Tabbar from '../../components/tabbar';
import ZeroBox from '../../components/zero-box';

export default class extends React.Component {
  state = {
    cMenu: [],
    curCategory: ''
  }

  componentDidMount () {
    xzApi.getXzCategorytList().then(res => {
      const categoryList: any[] = res.data.list;
      this.setState({
        cMenu: categoryList,
        curCategory: categoryList[0].id
      })
    })
  }

  public renderMenu = () => {
    const cMenu: any[] = this.state.cMenu;
    return (
      <div className="menu">
        {
          cMenu.map(item => {
            let cls = 'menu-item';
            if (item.id === this.state.curCategory) {
              cls += ' is-active';
            }
            return (
              <div className={cls} key={item.id} onClick={()=> {
                this.setState({
                  curCategory: item.id
                })
              }}>
                { item.name }
              </div>
            )
          })
        }
      </div>
    )
  }

  public renderChildList = () => {
    const cMenu: any[] = this.state.cMenu
    const findIndex = cMenu.findIndex((element: any) => element.id === this.state.curCategory);
    if (findIndex === -1 || !cMenu[findIndex].children.length) {
      return <div className="body">
        <ZeroBox />
      </div>
    }
    const children = cMenu[findIndex].children;
    return (
      <div className="body">
        { 
          children.map((element: any) => {
            return (
              <div className="brand-item" key={element.id}>
                {
                  element.logo ? <img className="brand-logo" src={element.logo} alt=""/> : (
                    <span className="brand-logo">{element.name}</span>
                  )
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  render () {
    return (
      <div className="page-category">
        <div className="main">
          {this.renderMenu()}
          { this.renderChildList() }
        </div>
        <Tabbar { ...this.props } activeKey="category" />
      </div>
    )
  }
}