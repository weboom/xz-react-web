import * as React from 'react';
import './index.css';
import { Icon, List, Radio } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

export default class XzProductList extends React.Component {
  state = {
    value: ''
  }

  onChange = (value: any) => {
    this.setState({
      value,
    });
  };

	render() {
		return (
			<div className="page-xzProductList">
				<div className="search-box">
					<div className="back-btn">
            <Icon type="left" size="lg" />
          </div>
          <div className="input-box">
            <span className="icon-search" />
            <input className="input" placeholder="游戏机" />
          </div>
          <div className="menu-btn">
            <Icon type="ellipsis" />
          </div>
				</div>

        <div className="filter-list">
          <div className="filter-item">
            <span>综合</span>
          </div>
          <div className="filter-item">
            <span>销量</span>
          </div>
          <div className="filter-item">
            <span>区域</span>
          </div>
          <div className="filter-item">
            <span>筛选</span>
          </div>
        </div>
        {this._renderList()}
			</div>
		)
  }
  
  _renderList() {
    const value: any = this.state.value;
    const data = [
      { value: 0, label: '综合排序' },
      { value: 1, label: '最新发布' },
      { value: 2, label: '价格升序' },
      { value: 3, label: '价格降序' },
      { value: 4, label: '点赞数' },
      { value: 5, label: '浏览数' },
    ];
    return (<div>
      <List renderHeader={() => '选择排序方式'}>
        {data.map(i => (
          <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>
    </div>);
  }

  _renderList2() {
    const value: any = this.state.value;
    const data = [
      { value: 0, label: '综合排序' },
      { value: 1, label: '最新发布' },
      { value: 2, label: '价格从低到高' },
      { value: 3, label: '价格从高到低' },
      { value: 4, label: '点赞数' },
      { value: 5, label: '浏览数量'},
    ];
    return (<div>
      <List renderHeader={() => '选择排序方式'}>
        {data.map(i => (
          <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>
    </div>);
  }
}
