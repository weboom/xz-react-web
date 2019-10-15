import * as React from 'react';
import './index.css';
import InputItem from 'antd-mobile/lib/input-item';
import Button from 'antd-mobile/lib/button';
import xzApi from '../../apis/xy';
import store from 'store';
import {connect} from 'react-redux'
import cookie from 'js-cookie';
// import Modal from 'antd-mobile/lib/modal';

const mapStateToProps = (state : any) => state;
const mapDispatchToProps = {}

interface Prop {
  visible?: boolean,
  redirectUrl?: string
}

class Login extends React.Component<Prop> {
  state = {
    tel: '13249064450',
    pwd: '123456',
    visible: true
  }

  public handleLogin = () => {
    const onSuccess = (res : any) => {
      if (res && res.success) {
        this.setState({userInfo: res.data})
        store.set('userInfo', res.data);
        store.set('token', res.data.token);
        cookie.set('token', res.data.token);
        if (this.props.redirectUrl) {
          (this.props as any).history.push(this.props.redirectUrl)
        } else {
          (this.props as any).history.goBack()
        }
      }
    }
    xzApi
      .login({mobile: this.state.tel, password: this.state.pwd})
      .then(onSuccess)
  }

  render() {
    const Form = <div className="login-pop">
      <div className="login-form">
        <InputItem placeholder="登录账户" value={this.state.tel} onChange={v => this.setState({tel: v})}/>
        <InputItem placeholder="登录密码" value={this.state.pwd} onChange={v => this.setState({pwd: v})}/>
        <div className="btn-submit">
          <Button type="primary" onClick={this.handleLogin}>立即登录</Button>
        </div>
        <div className="btm-act">
          <div>取消</div>
          <div>
            <span>没有账户？</span>
            <span>注册</span>
          </div>
        </div>
      </div>
    </div>
    return (this.props as any).user.showLogin || this.props.visible
      ? Form
      : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);