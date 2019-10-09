import * as React from 'react';
import xzApi from '../../apis/xy';
import Picker from 'antd-mobile/lib/picker';
import List from 'antd-mobile/lib/list';
// const classNames = require('classnames');

interface Prop {
  categoryId?: string|number
  onClickItem(categoryId: string): any
}

export default class extends React.Component<Prop> {
  state = {
    cMenu: [],
    colorValue: []
  }

  public getXzCategorytList = () => {
    const colorValue: any[] = this.state.colorValue;
    xzApi.getXzCategorytList().then((res: any) => {
      const cMenu = res.data.list;
      cMenu.forEach((item: any) => {
        item.label = item.name
        item.value = item.id
      })
      colorValue[0] = cMenu[0].id
      this.setState({
        cMenu,
        colorValue
      })
      this.emitValue();
    })
  }

  emitValue = () => {
    this.props.onClickItem(this.state.colorValue[0]);
  }

  componentDidMount () {
    this.getXzCategorytList();
  }

  onChangeColor = (color: any) => {
    this.setState({
      colorValue: color,
    }, this.emitValue);
  };

  public render = () => {
    const cMenu: any[] = this.state.cMenu;
    return (
      <div className="cate-list">
        <Picker
          data={cMenu}
          value={this.state.colorValue}
          cols={1}
          onChange={this.onChangeColor}
        >
          <List.Item arrow="horizontal">
            <span style={{
              color: '#999'
            }}>选择分类(有助于买家快速筛选)</span>
          </List.Item>
        </Picker>
      </div>
    )
  }
}