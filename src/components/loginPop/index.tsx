import * as React from 'react';
import './index.css';
import InputItem from 'antd-mobile/lib/input-item';
import Button from 'antd-mobile/lib/button';
import xzApi from '../../apis/xy';
import store from 'store';

export default class extends React.Component {
  state = {
    tel: '',
    pwd: ''
  }

  public handleLogin = () => {
    const onSuccess = (res: any) => {
      if (res && res.success) {
        this.setState({
          userInfo: res.data
        })
        store.set('userInfo', res.data);
        store.set('token', res.data.token);
      }
    }
    xzApi.login({
      mobile: this.state.tel,
      password: this.state.pwd,
    }).then(onSuccess)
  }

  render () {
    return (
      <div className="page-login">
        <InputItem
          placeholder="登录账户"
          onChange={v => this.setState({
            tel: v
          })}
        />
        <InputItem
          placeholder="登录密码"
          onChange={v => this.setState({
            pwd: v
          })}
        />
        <Button onClick={this.handleLogin}>立即登录</Button>
      </div>
    )
  }
}