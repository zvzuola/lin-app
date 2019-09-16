import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount() {
  }
  render() {
    return (
      <View className='container'>
        <View className='cnt'>
          <View className='avatar'>
            <open-data type='userAvatarUrl'></open-data>
          </View>
          <View className='name'>
            <open-data type='userNickName' lang='zh_CN'></open-data>
          </View>
        </View>
      </View>
    )
  }
}
