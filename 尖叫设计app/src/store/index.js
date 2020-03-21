import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classify: []
  },
  mutations: {
    pushClassify (state, list) {
      state.classify = list
    }
  },
  actions: {
    getClassify ({ commit }) {
      axios({
        method: 'get',
        url: '/data.json'
      }).then(res => {
        commit('pushClassify', res)
      })
    }
  },
  modules: {

  }
})
