import axios from "axios"

import { url } from '../js/config'
export default {
  namespaced: true,
  state: {
    Authorization: { SuperAdmin: false, Admin: false, Issuer: false },
    user: { token: null }
  },
  mutations: {
    signout(state) {
      state.user={ token: null }
      state.Authorization = { SuperAdmin: false, Admin: false, Issuer: false }
      localStorage.removeItem("user")
    },
    signin(state, user) {

      // delete user.token
      state.user = user
      for (var i = 0; i < user.roles.length; i++) {
        state.Authorization[user.roles[i]] = true
      }
      localStorage.setItem("user", JSON.stringify({ user: user, Authorization: state.Authorization }))
    },
    load_user(state) {
      var x=JSON.parse(localStorage.getItem("user"))
      if (x) {
        state.user = x.user
        state.Authorization = x.Authorization
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
