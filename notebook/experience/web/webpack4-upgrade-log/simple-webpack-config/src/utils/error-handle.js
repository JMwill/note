import alert from '../components/alert'

const errMsgMap = {
  '401': '您的账户登录状态已经超时，请重新登录',
  '403': '您暂没有该页面的访问权限，请联系客服',
  '500': '系统开小差了，请联系客服解决',
}
const errMsgKey = Object.keys(errMsgMap)

function extractErrMsg(err) {
  const errData = err.response.data
  if (typeof errData === 'string') {
    return errData
  } else {
    return errData.error_msg || errData.message
  }
}

export function fail(err = {}, handler = alert) {
  // 处理错误信息
  if (err.response && err.response.status === 400) {
    handler(extractErrMsg(err))
  } else if (err.response && errMsgKey.indexOf(`${err.response.status}`) != -1) {
    handler(errMsgMap[err.response.status])
  } else {
    handler(errMsgMap['500'])
  }
}

export function reportRaven(err) {
  window.Raven && window.Raven.captureException(err)
}
