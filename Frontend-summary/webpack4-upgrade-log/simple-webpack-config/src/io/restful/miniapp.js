import utils from './utils'

export function getMiniappList(params) {
  return utils.list('', params, 'miniapp')
}

export function getMiniapp() {
  return utils.get('current/', null, 'miniapp')
}

export function switchMiniapp(params) {
  return utils.put('current/', params, 'miniapp')
}
