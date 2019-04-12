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

// 医生列表
// 获取医生列表
const getDoctorList = params => fetch('/doctor/list', params)

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

export
{
  fetch,
  getAppointList,
  getArticleList,
  getClinicData,
  getDoctorList,
  fetchRecipeList,
  fetchUserInfo,
  fetchPatientList,
  changePatientInfo,
  deletePatient,
  addPatient
}
