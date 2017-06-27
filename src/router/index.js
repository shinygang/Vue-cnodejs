import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const indexView = (resolve) => require(['../views/index.vue'], resolve)
const topicView = (resolve) => require(['../views/topic.vue'], resolve)
const userView = (resolve) => require(['../views/user.vue'], resolve)
const loginView = (resolve) => require(['../views/login.vue'], resolve)
const msgView = (resolve) => require(['../views/message.vue'], resolve)
const aboutView = (resolve) => require(['../views/about.vue'], resolve)
const newView = (resolve) => require(['../views/new.vue'], resolve)

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {path: '/index', component: indexView},
      { path: '/all/:page(\\d+)?', component: createListView('all') },
      { path: '/good/:page(\\d+)?', component: createListView('good') },
      { path: '/share/:page(\\d+)?', component: createListView('share') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/dev/:page(\\d+)?', component: createListView('dev') },
      { path: '/topic/:id([0-9a-zA-Z]+)', component: topicView },
      { path: '/user/:loginname', component: userView, meta: { requiresAuth: true } },
      { path: '/login', component: loginView },
      { path: '/message', component: msgView, meta: { requiresAuth: true } },
      { path: '/about', component: aboutView },
      { path: '/add', component: newView },
      { path: '/', redirect: '/index' },
      { path: '*', redirect: '/index' }
    ]
  })
}
