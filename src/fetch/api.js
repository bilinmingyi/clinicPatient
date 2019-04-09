import axios from 'axios'

try {
  axios.defaults.baseURL = '/clinicgzh'
} catch (e) {
  console.log(e)
}

function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      respone => {
        resolve(respone.data)
      }
    ).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}
// 首页
// 获取文章列表
const getArticleList = params => fetch('/article/list', params)

// 获取诊所信息
const getClinicData = params => fetch('/clinic/detail', params)

// 个人中心
// 获取预约订单列表
const getAppointList = params => fetch('/appointOrder/list', params)

export {
  fetch,
  getAppointList,
  getArticleList,
  getClinicData
}
