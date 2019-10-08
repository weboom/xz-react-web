import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';

interface Props {
  categoryId?: string|number
}

export default class extends React.Component<Props> {
  state = {
    list: []
  }

  componentDidMount () {
    const onFinish = (res: any) => {
      if (res && res.success) {
        this.setState({
          list: res.data.list
        })
      }
    }
    xzApi.getXzProductList({
      categoryId: this.props.categoryId
    }).then(onFinish)
  }

  public renderXzProductList = () => {
    const list: any[] = this.state.list;
    return (
      <div className="g-list">
        {
          list.map(item => {
            return (
              <div className="g-item" key={item.id} onClick={() => {
                const history: any = (this.props as any).history;
                history.push(`/item/${item.id}`);
              }}>
                <div className="g-logo-wrap">
                    <img src={item.imgs[0]} alt=""/>
                  </div>
                  <div className="g-item-name">
                    <div>{ item.title + item.description }</div>
                  </div>
                  <div className="g-item-price">¥{+item.price / 100}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render () {
    return this.renderXzProductList();
  }
}