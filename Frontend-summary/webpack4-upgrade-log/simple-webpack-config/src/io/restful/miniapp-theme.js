import utils from './utils'

export function getMiniappThemeList(params) {
  return utils.list('user/theme/', params, 'miniapp')
}
