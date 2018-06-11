function load(name) {
  import('./components/' + name)
  require('./components/' + name)
}

export default 'a.js'
