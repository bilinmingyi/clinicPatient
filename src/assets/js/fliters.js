const codeToName = (list, code) => {
  for (var i = 0; i < list.length; i++) {
    if (list[i].code === code) {
      return list[i].name
    }
  }
  return null
}

/**
 * @desc： Format price.
 * @param {String} price
 * @param {String} currency
 * @param {Number} decimals
 * @return {String}
 *
 * @example priceFormat('12345.67890', '$', 3) -> '$12,345.679'
 */
const priceFormat = (price, currency, decimals) => {
  price = parseFloat(price)
  if ((!price && price !== 0) || !isFinite(price)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var sign = price < 0 ? '-' : ''
  var str = Math.abs(price).toFixed(decimals)
  var _int = decimals ? str.slice(0, -1 - decimals) : ''
  var _float = decimals ? str.slice(-1 - decimals) : ''
  var i = _int.length % 3
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  var mid = _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,')
  return sign + currency + head + mid + _float
}

/**
 * @desc： Format appointStatus.
 * @param {String} val
 * @example appointStatus('UNPAID') -> '待支付'
 */
const appointStatus = (val) => {
  let statusList = [
    {code: 'UNKNOWN', name: '未知'},
    {code: 'SIGN_WAITING', name: '待登记'},
    {code: 'TREAT_WAITING', name: '待就诊'},
    {code: 'UNCONFIRM', name: '待确认'},
    {code: 'UNPAID', name: '挂号待支付'},
    {code: 'DISPENSING', name: '配药中'},
    {code: 'DONE', name: '完成'},
    {code: 'SZJK_PAYING', name: '预约待支付'},
    {code: 'CANCEL', name: '取消'}
  ]
  return codeToName(statusList, val)
}

/**
 * @desc: Date format
 * @param {Date | Number} date
 * @param {string} fmt 目标字符串格式,默认：yyyy-MM-dd hh:mm:ss
 * @returns {string} 返回格式化后的日期字符串
 *
 * @example
 * dateFormat(0, "yyyy年MM月dd日 第q季度")    // "1970年01月01日 第1季度"
 *
 * @support:
 * yyyy：年
 * q: 季度
 * MM：月
 * dd：日
 * hh: 时
 * mm：分
 * ss：秒
 * S：毫秒
 */
const dateFormat = function (date, fmt) {
  if (!Date.prototype.Format) {
    Object.defineProperty(Date.prototype, 'Format', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function (fmt) {
        var f = fmt != null ? fmt : 'yyyy-MM-dd hh:mm:ss'
        var weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        var o = {
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          W: weekList[this.getDay()],
          S: this.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(f)) {
          f = f.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(f)) {
            f = f.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
          }
        }
        return f
      }
    })
  }
  let d = Date.prototype.isPrototypeOf(date) ? date : new Date(Number(date))
  return d.Format(fmt)
}
/**
 * @desc： Format doctor type(过滤医生类型).
 * @param {Number} type
 * @example doctorTypes(1) -> '中医师'
 */
const doctorTypes = (type) => {
  let list = [{code: 0, name: '未知'},
    {code: 1, name: '中医师'},
    {code: 2, name: '主治医师'},
    {code: 3, name: '副主任医师'},
    {code: 4, name: '主任医师'}]
  return codeToName(list, type)
}
/**
 * @desc： Format treatOrder status(订单状态).
 * @param {String} status
 * @example treatOrderStatus('UNCOMMIT') -> '就诊中'
 */
const treatOrderStatus = (status) => {
  let list = [
    {code: 'UNCOMMIT', name: '未提交'},
    {code: 'UNKNOWN', name: '未知'},
    {code: 'UNCOMMIT', name: '就诊中'},
    {code: 'UNCONFIRM', name: '待确认'},
    {code: 'UNPAID', name: '待支付'},
    {code: 'DISPENSING', name: '配药中'},
    {code: 'DELIVER', name: '配送中'},
    {code: 'DONE', name: '完成'},
    {code: 'CANCEL', name: '取消'}
  ]
  return codeToName(list, status)
}
/**
 * @desc： Format treatOrder status(商场订单状态).
 * @param {String} status
 * @example mallOrderStatus('DONE') -> '完成'
 */
const mallOrderStatus = (status) => {
  let list = [
    {code: 'UNKNOWN', name: '未知'},
    {code: 'AUDIT', name: '待审核'},
    {code: 'REFUSE', name: '审核拒绝'},
    {code: 'UNPAID4CLIENT', name: '待付款'},
    {code: 'DELIVER', name: '待发货'},
    {code: 'WAIT_INSTOCK', name: '待收货'},
    {code: 'DONE', name: '完成'},
    {code: 'CANCEL', name: '取消'}
  ]
  return codeToName(list, status)
}
/**
 * @desc： Format sex(性别类型).
 * @param {Number} type
 * @example sexFormat(1) -> '男'
 */
const sexFormat = (type) => {
  let list = [
    {code: 0, name: '保密'},
    {code: 1, name: '男'},
    {code: 2, name: '女'}
  ]
  return codeToName(list, type)
}
/**
 * @desc： Format age(年龄计算).
 * @param {Number} str
 * @example ageFormat('...') -> 5
 */
const ageFormat = (str) => {
  let date = new Date(Number(str))
  let today = new Date()
  return today.getFullYear() - date.getFullYear()
}
/**
 * @desc： Format articleType(文章类型).
 * @param {Number} type
 * @example articleType(1) -> '资讯'
 */
const articleType = (type) => {
  let list = [{code: 1, name: '资讯'}, {code: 2, name: '诊所动态'}]
  return codeToName(list, type)
}
/**
 * @desc： Format payType(支付类型).
 * @param {Number} type
 * @example payTypeFormat(1) -> '微信线上'
 */
const payTypeFormat = (type) => {
  let list = [
    {code: 0, name: '未知'},
    {code: 1, name: '微信线上'},
    {code: 2, name: '支付宝线上'},
    {code: 3, name: '银行卡'},
    {code: 4, name: '微信线下'},
    {code: 5, name: '支付宝线下'},
    {code: 6, name: '现金'},
    {code: 7, name: '医保卡'},
    {code: 9, name: '平台支付'}
  ]
  return codeToName(list, type)
}

const recipeType = (type, category) => {
  var list = [
    {code: 0, name: '未知'},
    {code: 1, name: '中药饮片', category: 1},
    {code: 1, name: '配方颗粒', category: 2},
    {code: 2, name: '中成药西药'},
    {code: 3, name: '产品处方'},
    {code: 4, name: '诊疗项目'},
    {code: 5, name: '附加项目'},
    {code: 6, name: '材料处方'}
  ]
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].code === type) {
      if (type === 1) {
        if (category === list[i].category) {
          return list[i].name
        }
      } else {
        return list[i].name
      }
    }
  }
}

export default {
  priceFormat,
  appointStatus,
  dateFormat,
  doctorTypes,
  treatOrderStatus,
  mallOrderStatus,
  sexFormat,
  ageFormat,
  articleType,
  payTypeFormat,
  recipeType
}
