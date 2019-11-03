import * as React from 'react';
import xzApi from '../../apis/xy';

const classNames = require('classnames');

interface Prop {
  categoryId?: string|number
  onClickItem(categoryId: string): any
}

export default class extends React.Component<Prop> {
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
            const cls = classNames('cate-item', {
              'cate-item-active': this.props.categoryId === item.id
            });
            return (
              <div className={cls} key={item.id} onClick={() => this.props.onClickItem(item.id)}>
                { item.name }
              </div>
            )
          })
        }
      </div>
    )
  }
}