import * as React from 'react';
import './index.css';
import TextareaItem from 'antd-mobile/lib/textarea-item';

interface Prop {
  hide(): any,
  show(): any,
  send(v: string): any
}

export default class extends React.Component<Prop> {
  customFocusInst = null;
  state = {
    content: ''
  }
  render() {
    return (
      <div className="talk-form">
        <div className="input">
          <TextareaItem
            placeholder="输入内容"
            data-seed="logId"
            autoHeight
            onChange={v => this.setState({
              content: v
            })}
            ref={(el: any) => this.customFocusInst = el}
          />
        </div>
        <div className="btn-list">
          <div className="btn-back" onClick={this.props.hide}>取消</div>
          <div className="btn-send" onClick={() => {
            this.props.send(this.state.content)
          }}>发送</div>
        </div>
      </div>
    )
  }
}