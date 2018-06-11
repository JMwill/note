import utils from './utils'

export function getMiniappQrcode() {
  return utils.get('qrcode/', {}, 'miniapp')
}

export function getMiniappVersionList(params) {
  return utils.list('user/release/', params, 'miniapp')
}

export function addMiniappVersion(params) {
  return utils.post('user/release/', params, 'miniapp')
}

export function commitMiniappVersion() {
  return utils.post('commit/', {}, 'miniapp')
}

export function auditMiniappVersion(params) {
  return utils.post('audit/', params, 'miniapp')
}

export function releaseMiniappVersion() {
  return utils.post('release/', {}, 'miniapp')
}

export function getMiniappCategoryList(params) {
  return utils.list('category/', params, 'miniapp')
}

export function getMiniappAudit() {
  return utils.get('audit/', {}, 'miniapp')
}

export function refreshMinappWxcode() {
  return utils.get('info/', {}, 'miniapp')
}
