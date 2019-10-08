import * as React from 'react';
import './index.css';
import Tabbar from '../../components/tabbar';
import Tabs from 'antd-mobile/lib/tabs';
import xzApi from '../../apis/xy';
import XzProductList from '../../components/xzProductList'

const tabs: any[] = [];
for(let index = 0; index < 10; index++) {
  tabs.push({
    title: '测试' + index
  })
}

export default class extends React.Component {
  state = {
    cMenu: []
  }

  public getXzCategorytList = () => {
    xzApi.getXzCategorytList().then(res => {
      this.setState({
        cMenu: res.data.list
      })
    })
  }

  componentDidMount () {
    this.getXzCategorytList();
  }

  public renderMain = () => {
    console.log('tabs', tabs);
    console.log(this.state.cMenu)
    const list = this.state.cMenu.map((item: any) => {
      return {
        ...item,
        title: item.name
      }
    })
    return (
      <div>
      <Tabs tabs={list}
        initialPage={0}
        tabBarUnderlineStyle={{
          border: 0,
          backgroundColor: 'transparent'
        }}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        {
          list.map((item, index) => {
            return (
              <div className="tab-screen" key={index}>
                <XzProductList categoryId={(item as any).id} />
              </div>
            )
          })
        }
      </Tabs>
    </div>
    )
  }

  render () {
    return (
      <div className="page-chat">
        { this.renderMain() }
        <Tabbar {...this.props} activeKey="chat"/>
      </div>
    )
  }
}