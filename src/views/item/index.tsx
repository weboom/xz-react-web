import * as React from 'react';
import { Carousel } from 'antd-mobile';
import xzApi from '../../apis/xy';
import './index.css';
import TalkForm from '../../components/talkForm';
import Comment from '../../components/comment';
const classnames = require('classnames')

const XZ_PRODUCT_OBJECT_TYPE = 1;
const COLLECT_TYPE = 1;
const LIKE_TYPE = 2;

export default class extends React.Component {
  state = {
    itemInfo: null, // 商品信息
    likeState: false,
    collectState: false,
    likeData: {},
    collectData: {},
    talkVisible: false,
    commentList: [],
    talkInfo: null,
    parentId: null
  }

  public renderBanner = () => {
    const itemInfo: any = this.state.itemInfo;
    const imgs: any[] = itemInfo.imgs;
    console.log(imgs)
    if (imgs.length === 1) {
      return <div
      className="banner-slide"
      style={{ backgroundImage: `url(${imgs[0]})`}}
    />
    }
    return (
      <Carousel autoplay={false} infinite>
        {imgs.map(val => (
          <div
            className="banner-slide"
            key={val}
            style={{ backgroundImage: `url(${val})`}}
          />
        ))}
    </Carousel>
    )
  }

  showTalk = () => {
    this.setState({
      talkVisible: true
    })
  }

  hideTalk = () => {
    this.setState({
      talkVisible: false
    })
  }

  addProductComment = (msg: string) => {
    console.log(this.state.talkInfo);
    // const talkInfo: any = this.state.talkInfo;
    const xzProductId = (this.props as any).match.params.xzProductId
    xzApi.addComment({
      itemId: xzProductId,
      content: msg,
      // talkTo: talkInfo.uid,
      typeId: 1,
      talkTo: null,
      parentId: null
    }).then((res: any) => {
      if (res && res.success) {
        this.hideTalk();
        this.getComment();
      }
    })
  }

  sendMessage = (msg: string) => {
    if (!this.state.talkInfo) {
      this.addProductComment(msg);
      return;
    }
    console.log(this.state.talkInfo);
    const talkInfo: any = this.state.talkInfo;
    // const xzProductId = (this.props as any).match.params.xzProductId
    xzApi.addComment({
      // itemId: xzProductId,
      content: msg,
      talkTo: talkInfo.uid,
      typeId: 1,
      parentId: this.state.parentId
    }).then((res: any) => {
      if (res && res.success) {
        this.hideTalk();
        this.getComment();
      }
    })
  }

  componentDidMount () {
    const xzProductId = (this.props as any).match.params.xzProductId
    if (xzProductId) {
      xzApi.getXzProductItem(xzProductId).then(res => {
        this.setState({
          itemInfo: res.data
        })
      })
      this.getLikeState();
      this.getCollectState();
      this.getComment();
    }
  }

  getComment = () => {
    const xzProductId = (this.props as any).match.params.xzProductId
    xzApi.getComment({
      itemId: xzProductId,
      typeId: XZ_PRODUCT_OBJECT_TYPE
    }).then((res: any) => {
      console.log(res);
      this.setState({
        commentList: res.data.list
      })
    })
  }

  handleClickLike = () => {
    if (this.state.likeState) {
      xzApi.removeCollect({
        recordId: (this.state.likeData as any).id
      }).then(res => {
        this.getLikeState()
      })
    } else {
      const { xzProductId } = (this.props as any).match.params;
      xzApi.addCollect({
        itemId: xzProductId,
        typeId: LIKE_TYPE,
        objectId: XZ_PRODUCT_OBJECT_TYPE
      }).then((res: any) => {
        this.getLikeState()
      })
    }
  }

  handleClickCollect = () => {
    if (this.state.collectState) {
      xzApi.removeCollect({
        recordId: (this.state.collectData as any).id
      }).then(res => {
        this.getCollectState()
      })
    } else {
      const { xzProductId } = (this.props as any).match.params;
      xzApi.addCollect({
        itemId: xzProductId,
        typeId: COLLECT_TYPE,
        objectId: XZ_PRODUCT_OBJECT_TYPE
      }).then((res: any) => {
        this.getCollectState()
      })
    }
  }

  getLikeState = () => {
    const { xzProductId } = (this.props as any).match.params
    xzApi.getCollectState({
      itemId: xzProductId,
      typeId: LIKE_TYPE,
      objectId: XZ_PRODUCT_OBJECT_TYPE
    }).then((res: any) => {
      if (!res || !res.success) {
        return;
      }
      this.setState({
        likeState: !!res.data.status,
        likeData: res.data
      })
    })
  }

  getCollectState = () => {
    const { xzProductId } = (this.props as any).match.params
    xzApi.getCollectState({
      itemId: xzProductId,
      typeId: COLLECT_TYPE,
      objectId: XZ_PRODUCT_OBJECT_TYPE
    }).then((res: any) => {
      if (!res || !res.success) {
        return;
      }
      this.setState({
        collectState: !!res.data.status,
        collectData: res.data
      })
    })
  }

  public renderGInfo () {
    const itemInfo: any = this.state.itemInfo;
    return (
      <div className="mod-ginfo">
        <div className="col-point">
          <span>500</span>
          <img className="icon-point" src={require('../../assets/img/point.png')} alt=""/>
        </div>
        <div className="g-name">{itemInfo.title}</div>
        <div className="g-desc">{itemInfo.description}</div>
      </div>
    )
  }

  public renderUserInfo() {
    const itemInfo: any = this.state.itemInfo;
    const author = itemInfo.user;
    return (
      <div className="mod-author">
        <img className="author-avatar" src={author.avatar} alt="" />
        <div>
          <div className="author-name">{author.nickname}</div>
          <div className="author-desc">{author.residence}</div>
        </div>
      </div>
    )
  }

  public renderFooter() {
    const cls1 = classnames('act-item', {
      'act-item-active': this.state.likeState
    })
    const cls2 = classnames('act-item', {
      'act-item-active': this.state.collectState
    })
    return (
      <div className="footer">
        <div className="act-list">
          <div className={cls1} onClick={this.handleClickLike}>
            <i className="icon iconfont icon-zan" />
            <span>喜欢</span>
          </div>
          <div className={cls2} onClick={this.handleClickCollect}>
            <i className="icon iconfont icon-shoucang" />
            <span>收藏</span>
          </div>
          <div className="act-item" onClick={() => {
            this.setState({
              talkVisible: !this.state.talkVisible
            })
          }}>
            <i className="icon iconfont icon-comment" />
            <span>留言</span>
          </div>
        </div>
        <div className="btn-chat">我想要</div>
      </div>
    )
  }

  confirmTalkInfo = (obj: any, parentId: number) => {
    this.setState({
      talkInfo: obj,
      parentId
    })
    this.showTalk();
  }

  public renderComment() {
    return (
      <div className="mod-comment">
        <div className="mod__head">
          <span>留言</span>
        </div>
        <div className="mod__body">
          {
            this.state.commentList.length ? (
              this.state.commentList.map((item: any) => {
                return (
                  <div key={item.id}>
                    <Comment key={item.id} commentInfo={item} onClickReply={this.confirmTalkInfo}/>
                    <div className="comment-child">
                      {
                        item.children.map((citem: any) => {
                          return (
                            <Comment key={citem.id} parent={item} onClickReply={this.confirmTalkInfo} commentInfo={citem} />
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            ) : (
              <span className="zero-text">暂无留言</span>
            )
          }
        </div>
      </div>
    )
  }
  
  public render () {
    if (this.state.itemInfo) {
      return (
        <div className="page-product">
          <i
            onClick={() => {
              console.log(this.props);
              (this.props as any).history.goBack();
            }}
          className="arrow-back icon iconfont icon-arrow-back" />
          { this.renderBanner() }
          { this.renderGInfo() }
          { this.renderUserInfo() }
          { this.renderFooter() }
          { this.renderComment() }
          { this.state.talkVisible ? (
            <TalkForm hide={this.hideTalk} show={this.showTalk} send={this.sendMessage}/>
          ) : null }
        </div>
      );
    } else {
      return null;
    }
  }
}
