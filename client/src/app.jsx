import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    pages: [
      'pages/index/index',
      'pages/publish/index',
      'pages/user/index',
      'pages/goods-detail/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: false,
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './images/home.png',
          selectedIconPath: './images/home-active.png'
        },
        {
          pagePath: 'pages/publish/index',
          text: '发布',
          iconPath: './images/publish.png',
          selectedIconPath: './images/publish-active.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './images/user.png',
          selectedIconPath: './images/user-active.png'
        }
      ],
      color: '#a0a0a0',
      selectedColor: '#0064FF',
      backgroundColor: '#fff',
      borderStyle: 'black'
    },
    cloud: true
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
      Taro.cloud.callFunction({ name: 'login' }).then(res => {
        console.log(res)
      })
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
