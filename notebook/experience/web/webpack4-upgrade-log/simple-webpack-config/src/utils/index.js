import * as dom from './dom'
import * as format from './format'
import * as localStorge from './local-storage'
import * as redux from './redux'
import * as hoc from './react-hoc'
import * as validator from './validator'
import * as errorHandle from './error-handle'
import * as file from './file'

module.exports = {
  ...dom,
  ...format,
  ...localStorge,
  ...redux,
  ...hoc,
  ...validator,
  ...errorHandle,
  ...file,
}
