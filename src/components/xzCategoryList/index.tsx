import * as React from 'react';
import xzApi from '../../apis/xy';
import './index.css'

const classNames = require('classnames');

let scrollerRef: any;
let wrapperRef: any;

interface Prop {
  categoryId?: string|number
  onClickItem(categoryId: string): any
}

export default class extends React.Component<Prop> {
  state = {
    cMenu: [],
    width: 375
  }

  getXzCategorytList = () => {
    xzApi.getXzCategorytList().then(res => {
      this.setState({ cMenu: res.data.list })
    })
  }

  componentDidMount () {
    console.log(222)
    this.getXzCategorytList();
  }

  componentDidUpdate () {
    if (scrollerRef && wrapperRef) {
      const len = scrollerRef.children.length
      let width = 0
      for (let index = 0; index < len; index++) {
        width += scrollerRef.children[index].offsetWidth
      }
      wrapperRef.style.width = (width + 10) + 'px'
    }
  }

  render = () => {
    const cMenu: any[] = this.state.cMenu;
    return (
      <div className="cate-list" ref={ref => wrapperRef = ref}>
        <div className="scroller" ref={ref => scrollerRef = ref}>
        {
          cMenu.map(item => {
            const cls = classNames('cate-item', {
              'cate-item-active': this.props.categoryId === item.id
            });
            return (
              <div className={cls} key={item.id} onClick={() => this.props.onClickItem(item.id)}>
                { item.name }
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}