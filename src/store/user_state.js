import axios from "axios"
import { connectSocket, CloseSocket } from "../js/socket"
import { url } from '../js/config'

export default {
  namespaced: true,
  state: {
    Authorization: { SuperAdmin: false, Admin: false, Issuer: false },
    user: { token: null }
  },
  mutations: {
    signout(state) {
      state.user = { token: null }
      state.Authorization = { SuperAdmin: false, Admin: false, Issuer: false }
      localStorage.removeItem("user")
      CloseSocket()
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
      var x = JSON.parse(localStorage.getItem("user"))
      if (x) {
        state.user = x.user
        state.Authorization = x.Authorization
        connectSocket(state.user.token)
      }
    },
    ToggleUserStatus(state, obj) {
      console.log(obj, state.organizations)
    },
  },
  actions: {
    authenticate({ state, commit }, auth) {
      return new Promise((res, rej) => {
        axios({
          method: "post",
          data: { email: auth.email, password: auth.password },
          url: url + 'api/account/login'
        }).then(resposne => {
          commit("signin", resposne.data)
          connectSocket(state.user.token)
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

    },
    CheckEmail({ rootState }, email) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "get",
          url: url + 'api/account/Available/' + email
        }).then(resposne => {
          res(resposne.data)
        }).catch(err => {
          rej(err)

        })
      })
    },
    RegisterUser({ rootState }, obj) {
      var temp = null
      if (obj.orgid) {
        temp = url + "api/account/Register/" + obj.orgid
      } else {
        temp = url + "api/account/Register/"
      }
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: temp,
          method: "POST",
          data: obj.user
        }).then(() => {
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    ToggleUserStatus({ rootState, commit }, obj) {
      var temp = null
      if (obj.orgid) {
        temp = url + `api/account/togglestatus/${obj.orgid}/${obj.userid}`
      } else {
        temp = url + `api/account/togglestatus/${obj.userid}`
      }
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: temp,
          method: "PUT",
        }).then(() => {
          commit("ToggleUserStatus", obj)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
  },
  getters: {
    IsLoggedIn(state) {
      return state.user.token != null
    },

  }
}
