/* eslint-disable */
import { delay } from './utils'

let flag = 0

export function uploadImg (params) {
  // return delay(`uploadImg`, params, '服务器繁忙', true);

  flag = (flag + 1) % 2

  return delay(
    'uploadImg',
    params,
    {
      url: flag === 0
        ? 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg'
        : 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/bc/94/bc94acf7d97645c84fac76063d19251c3b12d386-260f7944c3adb551c1f9ba577db57294d616c37a.jpg'
    },
    false,
    500
  )
}

export function uploadFile (params) {
  return delay(
    'uploadFile',
    params,
    {
      path: '/abc/def.p12'
    },
    false,
    500
  )
}
