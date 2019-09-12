import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    goods: []
  }

  componentWillMount() {
    this.db = Taro.cloud.database({
      env: 'test-f7a727'
    })
    this.getGoods()
  }

  getGoods() {
    const db = this.db
    db.collection('idle_goods')
      .get()
      .then((data) => {
        const goods = data.data
        console.log(goods)
        this.setState({ goods })
      })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  renderGoodsList() {
    const { goods } = this.state
    return goods.map(v => {

      return <View key={v.id} className='goods-item'>
        <View className='goods-image'><Image src={v.images[0]} /></View>
        <View className='left-info'>
          <View className='goods-title'><Text>{v.title}</Text></View>
          <View className='goods-price'><Text>￥{v.price}</Text></View>
          {/* <View className='goods-desc'><Text>{v.desc}</Text></View> */}
        </View>
      </View>
    })
  }

  render() {
    return (
      <View className='container'>
        {this.renderGoodsList()}
      </View>
    )
  }
}
