import moment from 'moment'
import a from './a'

export default function() {
  console.log(a())
  console.log('this is component b!')
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
}