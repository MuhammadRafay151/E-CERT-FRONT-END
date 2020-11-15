import axios from 'axios'
import {url} from '../js/config'

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
      organizations=[]
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
      }
    },
    actions: {
      CreateOrganization({ commit }) {
  
      },
      GetOrgCerts({ commit }) {
  
      },
      AddOrgUser({ commit }) {
  
      },
      GetOrgCertCount({ commit }) {
  
      },
      AddOrgCertCount({ commit }) {
  
    }
    },
  
  }
  