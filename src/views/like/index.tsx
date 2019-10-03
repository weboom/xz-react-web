import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';
import Navbar from '../../components/navbar';

/**
 * @description 点赞
 * @author Gaollard
 */

export default class extends React.Component {
  state = {
    list: []
  }

  async componentWillMount () {
    const res: any = await xzApi.getCollect({
      typeId: 2,
      objectId: 1
    })
    if (res && res.success) {
      this.setState({
        list: res.data.list
      })
    }
  }

  public renderDataList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="list">
        {
          list.map(item => {
            const obj: any = item.itemInfo;
            return (
              <div className="item" key={item.id}>
                <div className="item-user">
                  <img className="avatar" src="//img.alicdn.com/bao/uploaded/i3/1905882464/TB2CXh1l5CYBuNkSnaVXXcMsVXa_!!1905882464.jpg" alt=""/>
                  <div>
                    <div className="name">他好像一条狗</div>
                    <div className="desc">毕业于郑州大学</div>
                  </div>
                </div>
                <div className="line" />
                <div className="item-goods">
                  <img className="g-logo" src={obj.imgs[0]} alt=""/>
                  <div className="g-msg">
                    <div className="g-name">{obj.title}{obj.description}</div>
                    {/* <div className="act-list">
                      <div className="btn-cancle">取消收藏</div>
                    </div> */}
                  </div>
                </div>
                <div className="line" />
                <div className="item-footer">
                  <div className="city">来自广州</div>
                  <div className="btn-cancle">取消收藏</div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render () {
    return (
      <div className="page-like">
       <Navbar title="我的点赞" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        { this.renderDataList() }
      </div>
    )
  }
}