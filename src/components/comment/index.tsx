import * as React from 'react';
import './index.css';

interface Prop {
  commentInfo: any,
  parent?: any,
  onClickReply(commentInfo: any, parentId: number): void
}

export default class extends React.Component<Prop> {
  handleReply = () => {
    console.log(this.props.parent);
    this.props.onClickReply(
      this.props.commentInfo, 
      this.props.parent ? this.props.parent.id : this.props.commentInfo.id
    )
  }

  render () {
    const commentInfo = this.props.commentInfo;
    const author = commentInfo.userInfo;
    return (
      <div className="comment">
        <div className="comment-header">
          <img src={author.avatar} alt=""/>
          <div>
            <div className="nickname">{author.nickname}</div>
            <div className="date">{commentInfo.create_time}</div>
          </div>
          <div className="btn-reply" onClick={this.handleReply}>回复</div>
        </div>
        <div className="comment-body">
          {
            this.props.parent ? (
              <span>
                <span className="sign-replay" onClick={this.handleReply}>回复</span>
                <span className="sign-quote">@</span>
                <span className="sign-name">{ this.props.parent.userInfo.nickname }</span>
                <span className="sign-text">:{ commentInfo.content }</span>
              </span>
            ) : (
              <span>{commentInfo.content}</span>
            )
          }
        </div>
      </div>
    )
  }
}