import axios from "axios"
const url = process.env.VUE_APP_API_URL
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
      }
    },
    ToggleUserStatus(state, obj) {
      console.log(obj, state.organizations)
    },
    UpdateAccessToken(state, token) {
      state.user.token = token
      localStorage.setItem("user", JSON.stringify({ user: state.user, Authorization: state.Authorization }))
    }
  },
  actions: {
    authenticate({ commit, rootState }, auth) {
      return new Promise((res, rej) => {
        axios({
          method: "post",
          data: { email: auth.email, password: auth.password },
          url: url + 'api/account/login'
        }).then(resposne => {
          commit("signin", resposne.data)
          rootState.socket.disconnect();
          rootState.socket.auth.token = resposne.data.token
          rootState.socket.connect();

          res()

        }).catch(err => {
          rej(err)

        })
      })

    },
    signout({ state, commit, rootState }) {
      return new Promise((res, rej) => {
        axios({
          method: "post",
          data: { RefreshToken: state.user.RefreshToken },
          url: url + 'api/account/sign_out'
        }).then(() => {
          commit("signout")
          rootState.socket.disconnect();
          res()
        }).catch(err => {
          rej(err)
        })
      })
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
    UpdateUserProfile({ rootState }, obj) {
      var temp = null
      if (obj.orgid) {
        temp = url + `api/account/UpdateProfile/${obj.orgid}`
      } else {
        temp = url + "api/account/UpdateProfile/"
      }
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: temp,
          method: "PUT",
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
    ChangePassword({ rootState }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/account/password",
          data: obj,
          method: "PUT",
        }).then(() => {
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    ResetPassword(ctx, obj) {
      return new Promise((res, rej) => {
        axios({
          url: url + "api/account/resetpassword",
          method: "PUT",
          data: obj
        }).then(response => {
          res(response.data)
        }).catch(err => {
          rej(err)
        })
      })
    },
    ResetPasswordLink({ rootState }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/account/resetpassword/" + id,
          method: "POST",
        }).then(response => {
          res(response.data)
        }).catch(err => {
          rej(err)
        })
      })
    }

  },
  getters: {
    IsLoggedIn(state) {
      return state.user.token != null
    },


  }
}
