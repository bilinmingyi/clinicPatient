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
    {code: 'UNPAID', name: '待支付'},
    {code: 'SIGN_WAITING', name: '待登记'},
    {code: 'TREAT_WAITING', name: '待就诊'},
    {code: 'DONE', name: '完成'},
    {code: 'SZJK_PAYING', name: '深圳健康支付'},
    {code: 'CANCEL', name: '取消'}
  ]
  return codeToName(statusList, val)
}

export default {
  priceFormat,
  appointStatus
}
