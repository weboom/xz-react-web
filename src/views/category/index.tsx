import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';
import xzApi from '../../apis/xy';

export default class extends React.Component {
  state = {
    cMenu: []
  }

  componentDidMount () {
    xzApi.getXzCategorytList().then(res => {
      this.setState({
        cMenu: res.data.list
      })
    })
  }

  public renderMenu = () => {
    const cMenu: any[] = this.state.cMenu;
    return (
      <div className="menu">
        {
          cMenu.map(item => {
            return (
              <div className="menu-item" key={item.id}>
                { item.name }
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
          { this.renderMenu() }
        </div>
        <Tabbar { ...this.props } activeKey="category" />
      </div>
    )
  }
}