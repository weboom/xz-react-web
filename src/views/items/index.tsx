import * as React from 'react';
import { Component } from 'react';
import './index.css'

export default class ItemsPage extends Component {
  render() {
    return (
      <div className="page-items">
        {/* <div className="search"></div> */}
        <div className="f-list">
            <div className="f-item">综合</div>
            <div className="f-item">销量</div>
            <div className="f-item">诱惑</div>
            <div className="f-item">筛选</div>
        </div>
      </div>
    )
  }
}