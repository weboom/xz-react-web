import * as React from 'react';
import { TabBar } from 'antd-mobile';
import './index.css';

export interface Props {
  activeKey: string;
}

export default class extends React.Component<Props, object> {
  state = {
    selectedTab: 'redTab',
    hidden: false,
    fullScreen: false
  }

  componentDidMount () {
    this.setState({
      selectedTab: (this.props as any).activeKey 
    })
  }

   renderContent(pageText: any) {
     return (
       <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
         <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
         <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               hidden: !this.state.hidden,
             });
           }}
         >
           Click to show/hide tab-bar
         </a>
         <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               fullScreen: !this.state.fullScreen,
             });
           }}
         >
           Click to switch fullscreen
         </a>
       </div>
     );
   }

  render () {
    return (
      <div className="tabbar">
         <TabBar
           unselectedTintColor="#949494"
           tintColor="#33A3F4"
           barTintColor="white"
           hidden={this.state.hidden}
         >
           <TabBar.Item
             title="首页"
             key="首页"
             icon={<i className="iconfont icon-home-o"/>}
             selectedIcon={<i className="iconfont icon-home"/>}
             selected={this.state.selectedTab === 'welcome'}
             onPress={() => {
               this.setState({ selectedTab: 'welcome' });
               (this.props as any).history.push('/');
             }}
           />
           <TabBar.Item
             title="分类"
             key="分类"
             icon={<i className="iconfont icon-category-search-o"/>}
             selectedIcon={<i className="iconfont icon-category-search"/>}
             selected={this.state.selectedTab === 'category'}
             onPress={() => {
               this.setState({
                 selectedTab: 'category',
               });
               (this.props as any).history.push('/category');
             }}
           />
           <TabBar.Item
          icon={<i className="iconfont icon-message-o"/>}
          selectedIcon={<i className="iconfont icon-message"/>}
             title="消息"
             key="消息"
             dot
             selected={this.state.selectedTab === 'chat'}
             onPress={() => {
               this.setState({
                 selectedTab: 'chat',
               });
               (this.props as any).history.push('/chat');
             }}
           />
           <TabBar.Item
            icon={<i className="iconfont icon-user"/>}
            selectedIcon={<i className="iconfont icon-user-fill"/>}
             title="我的"
             key="我的"
             selected={this.state.selectedTab === 'account'}
             onPress={() => {
               this.setState({
                 selectedTab: 'account',
               });
               (this.props as any).history.push('/account');
             }}
           />
         </TabBar>
      </div>
    )
  }
}