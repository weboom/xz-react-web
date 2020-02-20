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
                this.setState({ curCategory: item.id })
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
    const childrenView =  children.map((element: any) => {
      return (
        <div key={element.id}>
          <div className="category-name">{element.name}</div>
          <div className="child-list">
          {
            (element.children || []).map((childElement: any) => {
              return (
                <div className="brand-item" key={childElement.id} onClick={() => {
                  (this.props as any).history.push(`/xzProduct?skuId=${childElement.id}`)
                }}>
                  <img className="brand-logo" src={childElement.logo} alt=""/>
                  <span className="brand-name">{childElement.name}</span>
                </div>
              )
            })
          }   
          </div>
        </div>
      )
    })

    return (
      <div className="body">
        { childrenView }
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