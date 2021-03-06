import * as React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import apis from '../../apis/xy';
import { Toast, Picker, Button, InputItem, List } from 'antd-mobile';

interface Prop {
  close(): void,
  address?: any
}

export default class extends React.Component<Prop, {}> {
  state = {
    username: '',
    mobile: '',
    province: '',
    city: '',
    district: '',
    address: '',
    sfCityList: [],
    visible: false,
    pickerValue: []
  }

  componentDidMount () {
    apis.getSfCityList().then((res: any) => {
      let list = res.data.list;
      list = JSON.stringify(list).replace(/areaId/g, 'value').replace(/areaName/g, 'label')
      list = JSON.parse(list);
      this.setState({
        sfCityList: list
      })
    })
    const address: any = this.props.address
    if (address) {
      this.setState({
        ...address,
        pickerValue: [address.province_code, address.city_code, address.district_code]
      }, () => {
        console.log(this.state);
      })
    }
  }

  rawData = () => {
    const values = this.state.pickerValue;
    const picker: any[] = [];
    const oriCityList = this.state.sfCityList;
    const find = (index: number, list: any) => {
      list.forEach((element: any) => {
        if (element.value === values[index]) {
          picker.push(element);
          if (picker.length < values.length) {
            find(index + 1, element.children || []);
          }
        }
      })
    }
    find(0, oriCityList);
    return picker;
  }

  handleSubmit = () => {
    console.log(this.state);
    const cityValue = this.rawData();
    const params: any = {
      address: this.state.address,
      mobile: this.state.mobile,
      username: this.state.username,
      province: cityValue[0].label,
      city: cityValue[1].label,
      district: cityValue[2] ? cityValue[2].label : '',
      zip: 7000,
      provinceCode: this.state.pickerValue[0],
      cityCode: this.state.pickerValue[1],
      districtCode: this.state.pickerValue[2] || ''
    }
    if (this.props.address) {
      params.id = this.props.address.id
      apis.updateAddress(params).then((res: any) => {
        if (res.success) {
          Toast.success('操作成功');
          this.props.close();
        }
      })
      return;
    }
    apis.addAddress(params).then((res: any) => {
      if (res.success) {
        Toast.success('操作成功');
        this.props.close();
      }
    })
  }

  render () {
    return (
      <div className="add-address">
        <Navbar title="新增地址" onLeftClick={this.props.close}/>
        {
          this.state.sfCityList.length ? (
            <Picker
            cascade={true}
            extra={this.state.pickerValue.length ? (
              this.state.province + this.state.city + this.state.district
            ) : '请选择'}
            visible={this.state.visible}
            data={this.state.sfCityList}
            value={this.state.pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            onOk={() => this.setState({ visible: false })}
            onDismiss={() => this.setState({ visible: false })}
          >
            <List.Item onClick={() => this.setState({ visible: true })}>
              <span>选择城市</span>
            </List.Item>
          </Picker>
          ) : null
        }
        <InputItem placeholder="收件人姓名(2位以上字符)" value={this.state.username} onChange={val => {
          this.setState({
            username: val
          })
        }}/>
        <InputItem placeholder="收件人手机号码(11位)" value={this.state.mobile} onChange={val => {
          this.setState({
            mobile: val
          })
        }}/>
        <InputItem placeholder="详细地址(5位及以上字符)" value={this.state.address} onChange={val => {
          this.setState({
            address: val
          })
        }}/>
        <div className="footer">
          <Button type="primary" onClick={this.handleSubmit}>提交</Button>
        </div>
      </div>
    )
  }
}