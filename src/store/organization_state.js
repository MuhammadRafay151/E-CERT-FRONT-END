import axios from 'axios'
import { url } from '../js/config'

export default {
  namespaced: true,
  state: {
    org: {},
    organizations: { list: null, totalcount: null },
    users: { list: [], totalcount: null }
  },
  mutations: {
    setorg(state, value) {
      state.org = value
    },
    clearorg(state) {
      state.org = {}
    },
    organizations(state, value) {
      state.organizations.list = value.list
      if (value.totalcount) {
        state.organizations.totalcount = value.totalcount
      }
    },
    ToggleOrgStatus(state, obj) {
      console.log(obj, state.organizations)
    },
    OrgUsers(state, value) {
      state.users.list = value.list
      state.users.totalcount = value.totalcount
    },
    ClearUsers(state) {
      state.users = { list: [], totalcount: null }
    }
  },
  actions: {
    GetOrgs({ rootState, commit }, value) {
      return new Promise((res, rej) => {
        if (!value) { value = 1 }
        var temp = url + "api/organization?pageno=" + value
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("organizations", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    GetOrg({ rootState, commit }, id) {
      commit("clearorg")
      var temp = null
      if (id) { temp = url + "api/organization/" + id }
      else { temp = url + "api/organization/details" }
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("setorg", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    ToggleOrgStatus({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/organization/togglestatus",
          method: "PUT",
          data: { id: obj }
        }).then(() => {
          commit("ToggleOrgStatus", obj)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    RegisterOrg({ rootState }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/organization",
          method: "POST",
          data: obj
        }).then(() => {
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    GetOrgUsers({ rootState, commit }, obj) {
      commit("ClearUsers")
      var temp = null
      if (!obj.pageno) { obj.pageno = 1 }
      if (obj.id)
        temp = url + `api/users/${obj.id}?pageno=${obj.pageno}`
      else
        temp = url + `api/users?pageno=${obj.pageno}`
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("OrgUsers", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },


  },

}
