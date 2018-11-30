const fse = require('fs-extra')
const path = require('path')
const uglifyJS = require("uglify-js")

class PepePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('PepePlugin', (stats) => {
      if (stats.hasErrors()) return

      const statsJson = stats.toJson()
      const assets = statsJson.entrypoints.main.assets

      const content = `
        ;(function(window){
          var head = document.getElementsByTagName('head')[0];

          function resolveUrl (file) {
            var url = window.__app_config__ && window.__app_config__.assets_path || '/';
            return url + file;
          }

          function load(file) {
            if (!file) return;
            if (/\.js$/.test(file)) {
              var el = document.createElement('script');
              el.src = resolveUrl(file);
              head.appendChild(el);
            } else if (/\.css$/.test(file)) {
              var el = document.createElement('link');
              el.rel = 'stylesheet';
              el.type = 'text/css';
              el.href = resolveUrl(file);
              head.appendChild(el);
            }
          }

          var assets = '${assets}'.split(',');
          for (var i = 0; i < assets.length; i++) {
            load(assets[i])
          }
        })(this);
      `
      fse.outputFileSync(path.join(__dirname, 'dist/index.js'), uglifyJS.minify(content).code);
    })
  }
}

module.exports = PepePlugin
