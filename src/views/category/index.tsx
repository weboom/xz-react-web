import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';

export default class extends React.Component {
  render () {
    return (
      <div className="page-category">
        <div>category</div>
        <Tabbar { ...this.props } activeKey="category" />
      </div>
    )
  }
}