import React, { Component } from 'react';
import './index.css';

export default class EmptyBox extends Component {
  render() {
    return (
      <div className="zero-box">
        <img className="zero-icon" src={require('./img/zero.png')} alt=""/>
        <p className="zero-desc"></p>
      </div>
    )
  }
}