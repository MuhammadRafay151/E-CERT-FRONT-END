import axios from 'axios'
import { url } from '../js/config'

export default {
    namespaced: true,
    state: {
      org: {
        name:null,
        email:null,
        id:null,
        ecertcount:null,
        status:null
      },
      organizations: { list: null, totalcount: null }
    },
    mutations: {
      updateorg(state, value) {
        state.org = value
      },
      clearorg(state) {
        state.org = {
          name:null,
          email:null,
          id:null,
          ecertcount:null,
          status:null
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
      GetOrg({ commit }, value) {
        return new Promise((res, rej) => {
          
          if (!value) { value = 1 }
          console.log(value)
  
          var temp = url + "api/organization?pageno=" + value
          axios({
            method: "GET",
            url: temp
          }).then(response => {
            commit("organizations", response.data)
            res()
          }).catch(err => {
            rej(err)
          })
        })
      }
      


      //CreateOrganization({ commit }) {
  
      ///},
      //GetOrgCerts({ commit }) {
  
      //},
      //AddOrgUser({ commit }) {
  
      //},
      //GetOrgCertCount({ commit }) {
  
      //},
      //AddOrgCertCount({ commit }) {
  
    //}
    },
  
  }
  