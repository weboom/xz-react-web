import * as React from 'react';
import xzApi from '../../apis/xy';
import { Picker, List } from 'antd-mobile';

interface Prop {
  categoryId?: string|number
  onClickItem(categoryId: string): any
}

export default class extends React.Component<Prop> {
  state = {
    cMenu: [],
    value: [],
    options: []
  }

  _getXzCategorytList = async () => {
    const res: any = await xzApi.getXzCategorytList()
    if (res && res.success) {
      const cMenu = res.data.list;
      const rawData = (list: any) => {
        list.forEach((item: any) => {
          item.label = item.name
          item.value = item.id
          if (item.children && item.children.length) {
            rawData(item.children)
          }
        })
      }
      rawData(cMenu)
      this.setState({ cMenu })
    }
  }

  componentDidMount () {
    this._getXzCategorytList();
  }

  onChangeValue = (value: any) => {
    const options: any = this.getOptions(value)
    this.setState({
      value,
      options,
    });
    this.props.onClickItem(options);
  };

  getOption = (value: any, list: any) => {
    let res = null;
    const find = (array: any) => {
      array.forEach((element: any) => {
        if (element.value === value) {
          res = element;
        } else {
          if (element.children && element.children.length) {
            find(element.children)
          }
        }
      });
    }
    find(list)
    return res
  }

  // 通过值获取选择的选项
  getOptions = (value: any) => {
    const options: any[] = [];
    value.forEach((item: any, index: number) => {
      if (index === 0) {
        options[index] = this.getOption(item, this.state.cMenu)
      } else {
        options[index] = this.getOption(item, options[index-1].children)
      }
    })
    return options
  }

  public render = () => {
    const cMenu: any[] = this.state.cMenu;
    return (
      <div className="cate-list">
        <Picker
          data={cMenu}
          value={this.state.value}
          cols={3}
          onChange={this.onChangeValue}
        >
          <List.Item arrow="horizontal">
            <span style={{color: '#999'}}>选择分类(有助于买家快速筛选)</span>
          </List.Item>
        </Picker>
      </div>
    )
  }
}