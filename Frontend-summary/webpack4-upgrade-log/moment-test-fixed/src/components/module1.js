require('../css/index.css')

export default () => {
  window.addEventListener('contentloaded', () => {
    var m = 'module2' || ''
    const m2 = require('./' + [m])
    console.log(m2('MMMM Do YYYY, h:mm:ss a'))
  })
}