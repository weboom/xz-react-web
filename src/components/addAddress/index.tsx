import * as React from 'react';
import './index.css';
import InputItem from 'antd-mobile/lib/input-item';
import Button from 'antd-mobile/lib/button';
import Navbar from '../../components/navbar';

interface Prop {
  close(): void
}

export default class extends React.Component<Prop, {}> {
  render () {
    return (
      <div className="add-address">
         <Navbar title="新增地址" onLeftClick={this.props.close}/>
        <InputItem placeholder="收件人姓名(2位以上字符)" />
        <InputItem placeholder="收件人手机号码(11位)" />
        <InputItem placeholder="详细地址(5位及以上字符)" />
        <div className="footer">
          <Button type="primary">提交</Button>
        </div>
      </div>
    )
  }
}