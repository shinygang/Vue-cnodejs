import 'whatwg-fetch'
export function fetchPost(url, params) {
  let pa = ''
  if (typeof params === 'object') {
    let arr = []
    for (let k in params) {
      if (params.hasOwnProperty(k)) {
        arr.push(`${k}=${params[k]}`)
      }
    }
    pa = arr.join('&')
  } else {
    pa = params
  }

  return fetch('https://cnodejs.org/api/v1' + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: pa
  }).then((response) => response.json())
}
