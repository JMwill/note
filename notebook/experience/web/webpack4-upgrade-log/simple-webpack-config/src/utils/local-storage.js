export function getCookie(name) {
  name = encodeURIComponent(name).replace(/[-.+*]/g, '\\$&')
  const regexp = new RegExp('(?:(?:^|.*;)\\s*' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$')
  return decodeURIComponent(document.cookie.replace(regexp, '$1')) || null
}

export function setAdType(type = 'banner') {
  localStorage.setItem('AD_TYPE', type)
}

export function getAdType() {
  return localStorage.getItem('AD_TYPE') || 'banner'
}

export function setShelfType(type = 'normal') {
  localStorage.setItem('SHELF_TYPE', type)
}

export function getShelfType() {
  return localStorage.getItem('SHELF_TYPE') || 'normal'
}
