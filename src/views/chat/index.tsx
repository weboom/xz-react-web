import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';

export default class extends React.Component {
  render () {
    return (
      <div className="page-chat">
        <div>chat</div>
        <Tabbar {...this.props} activeKey="chat"/>
      </div>
    )
  }
}