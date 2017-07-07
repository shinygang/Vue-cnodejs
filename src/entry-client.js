import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'
import Alert from './util/alert'
Vue.use(Alert)

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
Vue.nextTick(() => {
  console.log(bar.$el)
  document.body.appendChild(bar.$el)
})

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

const ckAuth = (to, from, cb) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!(window.sessionStorage.user || (store.state.loginUser && store.state.loginUser.token))) {
      // router.push({ path: '/login', query: { redirect: to.fullPath }})
      cb()
      return
    } else {
      if (!store.state.loginUser.token && window.sessionStorage.user) {
        store.dispatch('SET_LOGINUSER', JSON.parse(window.sessionStorage.user))
      }
    }
  }
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady((to, from) => {
  ckAuth(to, from, () => {
    router.push({ path: '/login', query: { redirect: to.fullPath } })
  })

  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    ckAuth(to, from, () => {
      next({ path: '/login', query: { redirect: to.fullPath } })
    })
    document.body.className = ''
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}