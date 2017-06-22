import Firebase from 'firebase'
import LRU from 'lru-cache'


export function createAPI ({ config, version }) {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref(version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;['all', 'good', 'share', 'ask', 'job'].forEach(type => {
      api.child(`${type}topics`).on('value', snapshot => {
        api.topics[type] = snapshot.val()
      })
    })
  }
  return api
}
