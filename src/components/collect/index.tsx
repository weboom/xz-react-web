import { Icon, NavBar } from 'antd-mobile';
import * as React from 'react'
import './index.css';

interface Props {
  title: string,
  onLeftClick?: () => void,
  rightContent?: React.Component[],
}

export default class extends React.Component<Props> {
  render() {
    return (
      <div className="navbar">
        <NavBar
          mode="light"
          icon={<Icon type="left" size="md" />}
          onLeftClick={this.props.onLeftClick}
          rightContent={this.props.rightContent}
        >
          <span>{this.props.title}</span>
        </NavBar>
      </div>
    )
  }
}