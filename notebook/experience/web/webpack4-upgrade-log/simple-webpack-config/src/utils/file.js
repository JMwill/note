export function getBase64(file, done, fail) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function() {
    done && done(reader.result)
  }
  reader.onerror = function(error) {
    fail && fail(error)
  }
}
