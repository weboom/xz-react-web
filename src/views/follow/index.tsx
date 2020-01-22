import * as React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import InlineLoading from '../../components/inline-loading'
import {connect} from 'react-redux';
import {getFollowList} from '../../redux/follow.redux'

const mapStateToProps = (state : any) => {
  return {follow: state.follow}
}

const mapActionToProps = (dispatch : any) => {
  return {
    getFollowList: () => dispatch(getFollowList())
  }
}

interface Props {
  history : any,
  follow : any,
  getFollowList() : void
}

class Follow extends React.Component < Props > {
  public state = {
    list: []
  }

  public renderList = () => {
    const list : any[] = this.props.follow.list;
    return (
      <div className="list">
        {list.map(item => {
          const obj : any = item.userInfo;
          return (
            <div className="item" key={item.id}>
              <img className="avatar" src={obj.avatar} alt=""/>
              <div>
                <div className="nickname">{obj.nickname}</div>
                <div className="item-desc">现居{obj.residence}</div>
              </div>
              <div className="btn-follow">已关注</div>
            </div>
          )
        })}
        { this.props.follow.loading ? <InlineLoading /> : null}
      </div>
    )
  }

  componentWillMount() {
    this.props.getFollowList()
  }

  render() {
    return (
      <div className="page-follow">
        <Navbar title="我的关注" onLeftClick={this.props.history.goBack}/>
        <div className="page-body">
          { this.renderList()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(Follow)