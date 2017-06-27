import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, data }) => {
    state.lists[type] = data
  },

  SET_TOPIC: (state, { id, topic }) => {
    Vue.set(state.topics, id, topic || {}) /* false means user not found */
  },

  SET_LOGINUSER (state, user) {
    state.loginUser = user
  },

  SET_USER (state, { user }) {
    state.user = user
  },

  SET_MESSAGE: (state, messages) => {
    state.messages = messages
  }
}
