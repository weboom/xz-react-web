import * as React from 'react';
import xzApi from '../../apis/xy';

export default class extends React.Component {
  state = {
    cMenu: []
  }

  public getXzCategorytList = () => {
    xzApi.getXzCategorytList().then(res => {
      this.setState({
        cMenu: res.data.list
      })
    })
  }

  componentDidMount () {
    this.getXzCategorytList();
  }

  public render = () => {
    const cMenu: any[] = this.state.cMenu;
    return (
      <div className="cate-list">
        {
          cMenu.map(item => {
            return (
              <div className="cate-item" key={item.id}>
                { item.name }
              </div>
            )
          })
        }
      </div>
    )
  }
}