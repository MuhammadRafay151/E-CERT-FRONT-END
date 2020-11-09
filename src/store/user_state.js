import axios from "axios"

import { url } from '../js/config'
export default {
  namespaced: true,
  state: {
    roles: { SuperAdmin: false, Admin: false, Issuer: false },
    user: { token: null }
  },
  mutations: {
    signout(state) {
      state.user = { token: null }
      state.roles = { SuperAdmin: false, Admin: false, Issuer: false }
    },
    signin(state, user) {

      // delete user.token
      state.user = user
      for (var i = 0; i < user.roles.length; i++) {
        state.roles[user.roles[i]] = true
      }
    }
  },
  actions: {
    authenticate({ commit }, auth) {
      return new Promise((res, rej) => {
        axios({
          method: "post",
          data: { email: auth.email, password: auth.password },
          url: url + 'api/account/login'
        }).then(resposne => {
          commit("signin", resposne.data)
          // console.log(resposne.data)
          res()

        }).catch(err => {
          rej(err)

        })
      })

    },
    signout({ commit }) {
      return new Promise(res => {
        commit("signout")
        res()
      })
    },
    changepassword() {

    }
  },
  getters: {
    IsLoggedIn(state) {
      return state.user.token != null
    },

  }
}
