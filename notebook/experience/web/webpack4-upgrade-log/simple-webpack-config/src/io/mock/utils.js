/* eslint-disable */
export function delay (method, params, data, is_reject = false, delay_time = 500) {
  console.log(`\nio.${method} --> req -->`, params)

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(`\nio.${method} --> res -->`, data)
      if (is_reject) {
        console.warn('reject==>\n')
        const response = {
          status: data.status || 400,
          data
        }
        reject(new Error(JSON.strinify(response)))
      } else {
        if (params && data && data.meta) {
          data.meta.offset = params.offset || 0
        }
        resolve({
          data
        })
      }
    }, delay_time)
  })
}
