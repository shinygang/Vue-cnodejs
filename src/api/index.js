const logRequests = !!process.env.DEBUG_API

import nodeFetch from 'node-fetch'
import LRU from 'lru-cache'

let cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 15 // 15 min cache
})
let preHost = 'https://cnodejs.org/api/v1/'

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)

  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {

    return new Promise((resolve, reject) => {
      console.log(preHost + child)
      nodeFetch(preHost + child).then(res => res.json()).then((res) => {
        logRequests && console.log(`fetched ${child}.`)
        if (child.indexOf('topics') < 0) {
          cache && cache.set(child, res.data)
          resolve(res.data || {})
        } else {
          resolve(res.data || [])
        }
      }).catch(reject)
    })
  }
}

export function fetchIdsByType (type, page) {
  let queryStr = `?page=${page}&limit=20`
  if (type !== 'all') {
    queryStr += `&tab=${type}`
  }
  return fetch('topics'+queryStr)
}

export function fetchTopic (id) {
  return fetch(`topic/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (loginname) {
  return fetch(`user/${loginname}`)
}

