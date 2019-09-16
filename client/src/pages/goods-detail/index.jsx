import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '宝贝详情'
  }

  state = {
    goods: null
  }

  componentWillMount() {
    Taro.getStorage({
      key: 'detail',
      success: (res) => {
        this.setState({ goods: res.data })
      }
    })
  }

  renderGoodsDetail() {
    const { goods: v } = this.state
    if (!v) return null
    return <View>
      <Swiper
        className='slide'
        indicatorDots
        autoplay
        circular
        interval={3000}
        duration={500}
      >
        {v.images.map(src => <SwiperItem key={src}>
          <Image mode='aspectFit' src={src} className='slide-image' />
        </SwiperItem>
        )}
      </Swiper>
      <View className='info'>
        <View className='goods-title'><Text>{v.title}</Text></View>
        <View className='goods-price'><Text>￥{v.price}</Text></View>
        <View className='goods-desc'><Text>{v.desc}</Text></View>
        <View className='goods-phone'><Text>卖家联系方式：</Text>{v.phoneNumber}</View>
      </View>
    </View>
  }

  render() {
    return (
      <View className='container'>
        {this.renderGoodsDetail()}
      </View>
    )
  }
}
