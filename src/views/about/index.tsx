import * as React from 'react';
import './index.css';
import Navbar from '../../components/navbar';

export default class extends React.Component {
  render () {
    return (
      <div className="page-about">
         <Navbar title="关于我们" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        <div className="page__body">
       		<img className="icon-banner" src="https://s1.huishoubao.com/static/m/wxapp/who.png" />
        	<div>我们的主要建立用户对用户之间的桥梁，目标是构建具有高度锲约的信用社区，让尽可能多的人参与进来。我们会选择信用评定委员会，对不遵守锲约的用户进行惩罚，保证社区的稳健运行。唯一提升信用值的做法就是帮助别人，我们真诚的希望你能够加入进来，一起守卫社区。</div>
        	<img className="icon-footer" src="https://s1.huishoubao.com/static/m/wxapp/bottom-bg.png" />       	
        </div>
      </div>
    )
  }
}