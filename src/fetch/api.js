import axios from 'axios'

try {
  axios.defaults.baseURL = '/yzsgzh'
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
// 获取文章详情
const fetchArticleDetail = params => fetch('/article/detail?id=' + params.id)
// 获取诊所信息
const getClinicData = params => fetch('/clinic/detail', params)
// 获取聊天列表信息
const chatMsgList = params => fetch('/chat/msg/list', params)
// 发送信息
const msgSend = params => fetch('/chat/msg/send', params)
const msgWithdraw = params => fetch('/chat/msg/withdraw', params)
// 图片生成链接
const imgUpLoad = params => fetch('/chat/img/upload', params)
// 未读消息
const unread = params => fetch('/chat/msg/unread', params)

// 医生列表
// 获取医生列表
const getDoctorList = params => fetch('/doctor/list', params)
// 获取医生详情
const fetchDOctorDetail = params => fetch('/doctor/detail?id=' + params.id)
// 获取医生排版
const fetchDoctorSchedule = params => fetch('/doctor/schedule', params)
// 提交预约订单
const saveAppointData = params => fetch('/appointOrder/submit', params)

// 商场
// 获取商品列表
const fetchGoodsList = params => fetch('/goods/list', params)
// 获取商品详情
const fetchGoodsDetail = params => fetch('/goods/detail', params)
// 获取购物车
const fetchShopCar = params => fetch('/shopcart/list', params)
// 添加购物车
const addShopCar = params => fetch('/shopcart/add', params)
// 更改购物车商品数量
const changeShopNum = params => fetch('/shopcart/update', params)
// 删除购物车商品
const removeShop = params => fetch('/shopcart/remove', params)
// 创建订单是否需要审核
const checkEnable = params => fetch('/goodsorder/checkEnabled', params)
// 更新地址
const updateAddress = params => fetch('/cuser/addrInfo/update', params)
// 创建订单
const createOrder = params => fetch('/goodsorder/create', params)

// 个人中心
// 获取预约订单列表
const getAppointList = params => fetch('/appointOrder/list', params)
// 获取处方订单列表
const fetchRecipeList = params => fetch('/treatOrder/list', params)
// 获取患者个人信息
const fetchUserInfo = params => fetch('/user/info', params)
// 获取患者列表
const fetchPatientList = params => fetch('/patient/list', params)
// 更改就诊人信息
const changePatientInfo = params => fetch('/patient/update', params)
// 删除就诊人
const deletePatient = params => fetch('/patient/delete', params)
// 添加就诊人
const addPatient = params => fetch('/patient/add', params)
// 获取预约订单详情
const fetchAppointDetail = params => fetch('/appointOrder/detail', params)
// 获取处方订单详情
const fecthRecipeDetail = params => fetch('/treatOrder/detail', params)
// 支付跳转
const gotoPay = params => fetch('/pay/szjk/payUrl', params)
// 更新个人信息
const changeUser = params => fetch('/user/update', params)
// 获取验证码
const fetchCode = params => fetch('/sms/chkCode/mobileBind', params)
// 修改电话号码
const savePhone = params => fetch('/user/mobile/update', params)

export {
  fetch,
  getAppointList,
  getArticleList,
  fetchArticleDetail,
  getClinicData,
  chatMsgList,
  msgSend,
  getDoctorList,
  fetchRecipeList,
  fetchUserInfo,
  fetchPatientList,
  changePatientInfo,
  deletePatient,
  msgWithdraw,
  addPatient,
  fetchAppointDetail,
  fecthRecipeDetail,
  changeUser,
  fetchDOctorDetail,
  fetchDoctorSchedule,
  saveAppointData,
  gotoPay,
  fetchCode,
  savePhone,
  imgUpLoad,
  unread,
  fetchGoodsList,
  fetchGoodsDetail,
  fetchShopCar,
  addShopCar,
  changeShopNum,
  removeShop,
  checkEnable,
  updateAddress,
  createOrder
}
