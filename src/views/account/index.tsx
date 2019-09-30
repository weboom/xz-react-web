import * as React from 'react';
import './index.css';

export default class extends React.Component {
  public renderProfile () {
    return (
      <div className="mod-banner">
        <img src={require('../../assets/img/avatar.png')} alt=""/>
      </div>
    )
  }

  render () {
    return (
      <div className="page-account">
        { this.renderProfile() }
      </div>
    )
  }
}