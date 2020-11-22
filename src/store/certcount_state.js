import axios from 'axios'
import { url } from '../js/config'

export default {
    namespaced: true,
    state: {
      certcount: {
        date:null,
        Org_Id:null,
        count:null,
        currentcount:null
      },
      certhistory: { list: null, totalcount: null }
    },
    mutations: {
      getorg_id (state, payload) {
        state.certcount.org_id = payload
      },
      addcount (state, payload) {
        state.certcount.count = payload
      },
      cuurentcount(state, payload) {
        state.certcount.currentcount = payload
      },
      updatecount(state, value) {
        state.certcount = value
      },
      clearcount(state) {
        state.certcount = {
          date:null,
          Org_Id:null,
          count:null,
        }
      },
      certcount(state, value) {
        state.certhistory.list = value.list
        console.log(value.list)
        if (value.totalcount) {
          state.certhistory.totalcount = value.totalcount
        }
      },
    },
    actions: {
      Getcounthistory({ commit }, value) {
        return new Promise((res, rej) => {
          
          if (!value) { value = 1 }
          console.log(value)
  
          var temp = url + "api/count?pageno=" + value
          axios({
            method: "GET",
            url: temp
          }).then(response => {
            commit("certcount", response.data)
            res()
          }).catch(err => {
            rej(err)
          })
        })
      },
      AddCount({ rootState }, certcount) {
        console.log(certcount)
        return new Promise((res, rej) => {
          axios({
            headers: {
              'Authorization': `Bearer ${rootState.user_state.user.token}`,
  
            },
            url: url + "api/count",
            method: "PUT",
            data: certcount
          }).then(response => {
            res(response)
          }).catch(err => {
  
            rej(err)
          })
        })
  
  
  
      },
      


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
  