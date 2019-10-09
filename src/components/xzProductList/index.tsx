import * as React from 'react';
import './index.css';
import xzApi from '../../apis/xy';
import LazyLoad from 'react-lazyload';

interface Props {
  categoryId?: string|number
}

export default class extends React.Component<Props> {
  state = {
    list: []
  }

  getXzProductList = () => {
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

  componentDidMount() {
    this.getXzProductList()
  }

  componentDidUpdate (prevProps: any) {
    if (this.props.categoryId !== prevProps.categoryId) {
      this.getXzProductList()
    }
  }

  public renderXzProductList = () => {
    const list: any[] = this.state.list;
    const pImg = <img className="g-logo-wrap g-logo-placeholder"
      src="https://img10.360buyimg.com/wq/jfs/t24601/190/890984006/4559/731564fc/5b7f9b7bN3ccd29ab.png" />
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
                    <LazyLoad debounce={true} placeholder={pImg}>
                      <img src={item.imgs[0]} alt=""/>
                    </LazyLoad>
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