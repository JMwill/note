import utils from './utils'

export function uploadImg(params) {
  return utils.postView('upload/image/', params)
}
