import utils from '../utils'

window.addEventListener('load', function suspensionInit() {
  const showClassName = 'suspension-show'
  // main
  let $ = document.querySelector.bind(document)
  let suspension = $('.suspension')
  if (!suspension) { return }

  suspension.addEventListener('click', (e) => {
    e.stopPropagation()
    if (suspension.className.indexOf(showClassName) > -1) {
      utils.className.rmClass(suspension, showClassName)
    } else {
      utils.className.addClass(suspension, showClassName)
    }
  })

  document.addEventListener('click', (e) => {
    if (!e.target.contains(suspension)) {
      utils.className.rmClass(suspension, showClassName)
    }
  })

  window.removeEventListener('load', suspensionInit)
})
