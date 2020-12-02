import axios from 'axios'
import { url } from '../js/config'

export default {
  namespaced: true,
  state: {
    certcount: {
      date: null,
      Org_Id: null,
      count: null,
      currentcount: null
    },
    certhistory: { list: null, totalcount: null }
  },
  mutations: {
    getorg_id(state, payload) {
      state.certcount.org_id = payload
    },
    addcount(state, payload) {
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
        date: null,
        Org_Id: null,
        count: null,
      }
    },
    certcount(state, value) {
      state.certhistory.list = value.list
      if (value.totalcount) {
        state.certhistory.totalcount = value.totalcount
      }
    },
  },
  actions: {
    Getcounthistory({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pagno) { obj.pagno = 1 }
        if (obj.id)
          var temp = url + `api/count/${obj.id}?pageno=${obj.pageno}`
        else
          temp = url + `api/count?pageno=${obj.pageno}`
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
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
    AddCount({ rootState }, obj) {
      if (obj.id) {
        var temp = url + "api/count/" + obj.id
      } else {
        temp = url + "api/count"
      }
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: temp,
          method: "PUT",
          data: { count: obj.count }
        }).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })



    },
  },

}
