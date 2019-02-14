import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    user: {}
  },
  actions: {
    authUser ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/user')
        .then((response) => {
          commit('setAuthUser', response.data);
          resolve();
        })
        .catch((err) => {
          reject();
        })
      })
    }
  },
  mutations: {
    setAuthUser (state, user) {
      state.user = user;
    }
  },
  getters: {
    doneUser: state => {
      return state.user
    }
  }
})

export default store