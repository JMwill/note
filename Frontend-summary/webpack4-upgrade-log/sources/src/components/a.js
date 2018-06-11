import moment from 'moment'
import _ from 'lodash'

export default function() {
  console.log('this is component a!')
  console.log(_.VERSION)
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
}