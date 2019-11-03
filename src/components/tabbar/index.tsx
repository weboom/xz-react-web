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
             icon={<div style={{
               width: '22px',
               height: '22px',
               background: 'url(https:zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
             />
             }
             selectedIcon={<div style={{
               width: '22px',
               height: '22px',
               background: 'url(https:zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
             />
             }
             selected={this.state.selectedTab === 'welcome'}
             onPress={() => {
               this.setState({
                 selectedTab: 'welcome',
               });
               (this.props as any).history.push('/');
             }}
           >
             {this.renderContent('首页')}
           </TabBar.Item>
           <TabBar.Item
             icon={
               <div style={{
                 width: '22px',
                 height: '22px',
                 background: 'url(https:gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
               />
             }
             selectedIcon={
               <div style={{
                 width: '22px',
                 height: '22px',
                 background: 'url(https:gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
               />
             }
             title="分类"
             key="分类"
             selected={this.state.selectedTab === 'category'}
             onPress={() => {
               this.setState({
                 selectedTab: 'category',
               });
               (this.props as any).history.push('/category');
             }}
           >
             {this.renderContent('分类')}
           </TabBar.Item>
           <TabBar.Item
             icon={
               <div style={{
                 width: '22px',
                 height: '22px',
                 background: 'url(https:zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
               />
             }
             selectedIcon={
               <div style={{
                 width: '22px',
                 height: '22px',
                 background: 'url(https:zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
               />
             }
             title="聊天"
             key="聊天"
             dot
             selected={this.state.selectedTab === 'chat'}
             onPress={() => {
               this.setState({
                 selectedTab: 'chat',
               });
               (this.props as any).history.push('/chat');
             }}
           >
             {this.renderContent('聊天')}
           </TabBar.Item>
           <TabBar.Item
             icon={{ uri: 'https:zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
             selectedIcon={{ uri: 'https:zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
             title="我的"
             key="我的"
             selected={this.state.selectedTab === 'account'}
             onPress={() => {
               this.setState({
                 selectedTab: 'account',
               });
               (this.props as any).history.push('/account');
             }}
           >
             {this.renderContent('我的')}
           </TabBar.Item>
         </TabBar>
      </div>
    )
  }
}