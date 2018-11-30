module.exports = {
  get(id) {
    let result = []
    if (window.localStorage.getItem(id)) {
      result = JSON.parse(window.localStorage.getItem(id))
    }
    return result
  },
  save(id, data) {
    window.localStorage.setItem(id, JSON.stringify(data))
  },
}
