function getDateTimestamp() {
  const n = new Date()
  const d = new Date(n.getFullYear(), n.getMonth(), n.getDate())
  return Math.floor(d.getTime() / 1000)
}

module.exports = {
  getDateTimestamp,
}
