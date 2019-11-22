import wx from 'weixin-js-sdk'
import {fetchWxConfig} from '../../fetch/api'

export default function getWXSign () {
  return new Promise((resolve, reject) => {
    fetchWxConfig({
      'uri': window.location.pathname.replace(/\/yzsgzh/, ''),
      'channel_id': 4,
      'wx_appid': 'wx343e9395567a7303'
    }).then(res => {
      if (res.code === 1000) {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        })
        wx.ready(() => {
          resolve({
            wx: wx,
            appId: res.data.appId
          })
        })
        wx.error((res) => {
          console.log(res)
        })
      } else {
        this.$Message.infor('微信初始化失败')
      }
    }).catch(error => {
      reject(error)
    })
  })
}
