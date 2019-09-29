import * as React from 'react';
import apis from '../../apis';
import './index.css';

export default class Welcome extends React.Component {
  public state = {
    list: []
  }

  public componentDidMount () {
    apis.getDemandList({}).then(ret => {
      const res = ret as any;
      if (res && res.success) {
        this.setState({
          list: res.data.list
        })
      }
    })
  }

  public renderList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="d-list">
        {list.map((item, index) => {
          return (
            <div className="d-item" key={index}>{ item.title }</div>
          )
        })}
      </div>
    )
  }

  public render () {
    return (
      <div className="page-welcome">
        {this.renderList()}
      </div>
    )
  }
}