import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const userStore = new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        setUserInfo({ commit }, user) {
            commit('setUserInfo', user);
        }
    }
});

export default userStore;