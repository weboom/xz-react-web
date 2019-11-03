import * as React from 'react';
import { /*Route,*/ Redirect, /*withRouter*/ } from 'react-router-dom';

class AuthLogin extends React.Component {
  state = {
    isLogin: false
  }

  componentDidMount() {
    const isLogin = false;
    if (isLogin) {
      console.log('显示登录组件')
    }
  }

  render() {
    // const { 
    //   path,
    //   component: Component,
    //   exact = false,
    //   strict = false
    // } = (this.props as any);
    return (
      this.state.isLogin ?  (
        this.props.children
        // <Route
        //   path={path}
        //   exact={exact}
        //   strict={strict}
        //   render={(props)=> <Component {...props} /> }
        // />
      ) : <Redirect to={{ pathname: "/login" }}/>
    );
  }
}

export default AuthLogin;