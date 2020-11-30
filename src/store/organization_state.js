import axios from 'axios'
import { url } from '../js/config'

export default {
  namespaced: true,
  state: {
    org: {
      name: null,
      email: null,
      id: null,
      ecertcount: null,
      status: null
    },
    organizations: { list: null, totalcount: null }
  },
  mutations: {
    updateorg(state, value) {
      state.org = value
    },
    clearorg(state) {
      state.org = {
        name: null,
        email: null,
        id: null,
        ecertcount: null,
        status: null
      }
    },
    organizations(state, value) {
      state.organizations.list = value.list
      console.log(value.list)
      if (value.totalcount) {
        state.organizations.totalcount = value.totalcount
      }
    },
  },
  actions: {
    GetOrg({ rootState,commit }, value) {
      return new Promise((res, rej) => {

        if (!value) { value = 1 }
        console.log(value)

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
    ToggleOrgStatus(){},
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
    RegisterAdmin({ rootState }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/certificate",
          method: "POST",
          data: obj
        }).then(() => {
          res()
        }).catch(err => {
          rej(err)
        })
      })
    }

  },

}
