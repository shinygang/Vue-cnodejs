import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      activeType: 'all',
      topics: {/* [id: number]: Item */},
      user: null,
      loginUser: {},
      messages: {},
      lists: {
        all: [],
        good: [/* number */],
        share: [],
        ask: [],
        dev: [],
        job: []
      }
    },
    actions,
    mutations,
    getters
  })
}
