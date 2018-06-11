import $ from 'jquery'
import Alert from '../components/alert'

export function scrollTop(el, marginTop = 0, stopIfNotExist = false) {
  let t = 0
  let exist = false
  if (el != null && $(el).length > 0) {
    t = $(el).first().offset().top
    exist = true
  }

  if (stopIfNotExist && !exist) return

  $('html,body').animate({
    scrollTop: `${t - marginTop - 70}px`,
  }, 0)
}

export function openNewTab(url) {
  let win = window.open(url, '_blank')
  if (!win) {
    Alert('打开新窗口失败，请赋予允许弹出新窗口的权限并重新执行上一次操作')
  } else {
    win.focus()
  }
}

export const className = (function() {
  let cache = {}
  let start = '(?:^|\\s)'
  let end = '(?:\\s|$)'

  function lookupClass(className) {
    let cached = cache[className]
    if (cached) {
      cached.lastIndex = 0
    } else {
      cache[className] = cached = new RegExp(start + className + end, 'g')
    }
    return cached
  }

  function addClass(el, className) {
    let current = el.className
    if (!current.length) {
      el.className = className
    } else if (!lookupClass(className).test(current)) {
      el.className += ' ' + className
    }
  }

  function rmClass(el, className) {
    el.className = el.className.replace(lookupClass(className), ' ').trim()
  }

  return {
    addClass,
    rmClass,
  }
}())
