import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtImagePicker, AtForm, AtButton, AtTextarea, AtInput } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '发布'
  }

  constructor() {
    super()
    this.state = {
      files: [],
      desc: '',
      title: '',
      price: '',
      phoneNumber: ''
    }
  }

  componentWillMount() {
    this.db = Taro.cloud.database({
      env: 'test-f7a727'
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleImageChange(files) {
    this.setState({
      files
    })
  }

  handleDescChange(event) {
    this.setState({
      desc: event.target.value
    })
  }


  handlePriceChange(price) {
    this.setState({
      price
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return price
  }

  handleTitleChange(title) {
    this.setState({
      title
    })
    return title
  }

  handlePhoneNumberChange(phoneNumber) {
    this.setState({
      phoneNumber
    })
    return phoneNumber
  }

  handleSubmit() {
    const db = this.db
    const { title, desc, price, files, phoneNumber } = this.state
    return Promise.all(files.map(item => {
      return Taro.cloud.uploadFile({
        cloudPath: 'idle_goods/' + Date.now() + item.url.match(/\.[^\.]+$/)[0], // 文件名称 
        filePath: item.url,
      })
    })).then((data) => {
      console.log(data)
      const images = data.map(v => v.fileID)
      return db.collection('idle_goods').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          title,
          desc,
          price,
          uploadTime: new Date(),
          images,
          phoneNumber
        }
      })
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    const { title, desc, price, phoneNumber, files } = this.state
    return (
      <View className='container'>
        <AtForm
          className='form'
          onSubmit={this.handleSubmit.bind(this)}
        >
          <AtInput
            className='form-item'
            name='title'
            title='商品名称'
            type='text'
            placeholder='请输入商品名称'
            value={title}
            onChange={this.handleTitleChange.bind(this)}
          />
          <AtInput
            className='form-item'
            name='price'
            title='价格'
            type='number'
            placeholder='请输入价格'
            value={price}
            onChange={this.handlePriceChange.bind(this)}
          />
          <AtInput
            className='form-item'
            name='phoneNumber'
            title='手机号码'
            type='phone'
            placeholder='手机号码'
            value={phoneNumber}
            onChange={this.handlePhoneNumberChange.bind(this)}
          />
          <View className='form-item'>
            <View className='form-item-label'>商品描述</View>
            <AtTextarea
              name='desc'
              value={desc}
              onChange={this.handleDescChange.bind(this)}
              maxLength={500}
              placeholder='请输入商品描述，新旧程度等信息'
            />
          </View>
          <View className='form-item'>
            <View className='form-item-label'>商品图片</View>
            <AtImagePicker
              multiple
              files={files}
              onChange={this.handleImageChange.bind(this)}
            />
          </View>
          <AtButton className='submit-btn' type='primary' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}
