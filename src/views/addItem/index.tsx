import * as React from 'react';
import './index.css';
import * as qiniu from 'qiniu-js';
import Navbar from '../../components/navbar';
import { ImagePicker, Button, TextareaItem, InputItem } from 'antd-mobile';
import XzCategoryPicker from '../../components/xzCategoryPicker';
import xzApi from '../../apis/xy';

/**
 * @description 发布宝贝
 * @author Gaollard
 */
export default class extends React.Component {
  state = {
    title: '',
    price: '',
    desc: '',
    category: '',
    categoryId: '',
    categoryName: '',
    brandId: '',
    brandName: '',
    skuId: '',
    skuName: '',
    address: '',
    depreciation: '',
    token: '',
    files: [],
    multiple: false
  }

  public handleSave = () => {
    const files = this.state.files
    this.uploadImg(0, (files[0] as any).file, this.doAddItem);
  }

  doGet7nToken = () => {
    xzApi.get7nToken().then(res => {
      this.setState({
        token: res.data.token
      })
    });
  }

  onChange = (files: any, type: any, index: any) => {
    this.setState({
      files
    });
  }

  public uploadImg = (index: any, file: any, callback?: any) => {
    const vm = this;
    const observable = qiniu.upload(file, file.name, this.state.token, {}, {});
    const files: any[] = this.state.files

    observable.subscribe({
      next(res) {
        const key = 'percent';
        files[index][key] = res.total.percent;
        vm.setState({
          files
        })
      },
      error(error) {
        console.log(error);
      },
      complete(res) {
        console.log(res);
        const key = 'uri';
        files[index][key] = `//c1.airtlab.com/${res.key}`;
        vm.setState({
          files
        })
        const nextIndex = files.findIndex(element => !element.uri);
        if (nextIndex !== -1) {
          vm.uploadImg(nextIndex, files[nextIndex].file, callback);
        } else {
          if (callback) {
            callback();
          }
        }
      }
    });
  }

  public doAddItem = () => {
    const imgs: string[] = [];
    this.state.files.forEach(element => {
      const uri = (element as any).uri
      if (uri) {
        imgs.push(uri);
      }
    })
    xzApi.addXzProduct({
      ...this.state,
      city: this.state.address,
      description: this.state.desc,
      tradeWayId: 1,
      imgs: JSON.stringify(imgs),
      files: []
    }).then(res => {
      console.log(res);
    })
  }

  componentDidMount () {
    this.doGet7nToken();
  }

  render () {
    const { files } = this.state;
    return (
      <div className="page-addItem">
        <Navbar title="发布宝贝" onLeftClick={() => {
          (this.props as any).history.goBack();
        }}/>
        <div>
          <InputItem
            clear
            placeholder="标题(品牌型号都是买家喜欢搜索的关键词)"
            value={this.state.title}
            onChange={(val) => {
              this.setState({
                title: val
              })
            }}
          />
          <InputItem
            clear
            placeholder="价格(单位为分)"
            value={this.state.price}
            onChange={(val) => {
              this.setState({
                price: val
              })
            }}
          />
          <TextareaItem
            clear
            placeholder="描述(入手渠道使用感受等)"
            value={this.state.desc}
            onChange={(val) => {
              this.setState({
                desc: val
              })
            }}
          />
         <InputItem
            clear
            placeholder="新旧程度(例如 88新)"
            value={this.state.depreciation}
            onChange={(val) => {
              this.setState({
                depreciation: val
              })
            }}
          />
          <InputItem
            clear
            placeholder="宝贝所在城市"
            value={this.state.address}
            onChange={(val) => {
              this.setState({
                address: val
              })
            }}
          />
        </div>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 7}
          multiple={this.state.multiple}
        />
        <XzCategoryPicker onClickItem={(options: any) => {
          console.log(options)
          this.setState({
            categoryId: options[0].value,
            categoryName: options[0].label,
            brandId: options[1] ? (options[1].value) : '',
            brandName: options[1] ? (options[1].label) : '',
            skuId: options[2] ? (options[2].value) : '',
            skuName: options[2] ? (options[2].label) : '',
          })
        }}/>
        <div className="u-footer">
          <Button type="primary" onClick={ this.handleSave }>提交</Button>
        </div>
      </div>
    )
  }
}