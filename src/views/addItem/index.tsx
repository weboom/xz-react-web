import * as React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import InputItem from 'antd-mobile/lib/input-item';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import Button from 'antd-mobile/lib/button';
import xzApi from '../../apis/xy';

const imgs = [
  '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/80508/18/1341/199520/5cfa03efEd42687a0/d30c2b410ec597d3.jpg!q70.dpg',
  '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/79793/39/7550/244656/5d577b80E85fb7def/6542dd2356d00619.jpg!q70.dpg'
]

/**
 * @description 发布宝贝
 * @author Gaollard
 */

export default class extends React.Component {
  state = {
    title: '二手IPhone11',
    price: '10000',
    desc: '二手IPhone11快来买',
    category: '手机数码',
    address: '北京市东城区',
    imgs: JSON.stringify(imgs),
    depreciation: 99
  }

  public handleSave = () => {
    console.log(this.state)
    this.doAddItem();
  }

  public doAddItem = () => {
    xzApi.addXzProduct({
      ...this.state,
      city: this.state.address,
      description: this.state.desc,
      categoryId: 1,
      tradeWayId: 1
    }).then(res => {
      console.log(res);
    })
  }

  render () {
    return (
      <div className="page-addItem">
        <Navbar title="发布宝贝" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        <div>
        <InputItem
            clear
            placeholder="标题(品牌型号都是买家喜欢搜索的关键词)"
            value={this.state.title}
            onChange={(val) => {
              this.setState({
                title: val
              })
            }}
          />
          <InputItem
            clear
            placeholder="价格(单位为元)"
            value={this.state.price}
            onChange={(val) => {
              this.setState({
                price: val
              })
            }}
          />
          <TextareaItem
            clear
            placeholder="描述(入手渠道使用感受等)"
            value={this.state.desc}
            onChange={(val) => {
              this.setState({
                desc: val
              })
            }}
          />
          <InputItem
            clear
            placeholder="分类(有助于买家快速筛选)"
            value={this.state.category}
            onChange={(val) => {
              this.setState({
                category: val
              })
            }}
          />
          <InputItem
            clear
            placeholder="宝贝所在城市"
            value={this.state.address}
            onChange={(val) => {
              this.setState({
                address: val
              })
            }}
          />
        </div>
        <div className="u-footer">
          <Button type="primary" onClick={ this.handleSave }>提交</Button>
        </div>
      </div>
    )
  }
}