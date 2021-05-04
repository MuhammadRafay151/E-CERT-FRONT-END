import axios from 'axios'
const url = process.env.VUE_APP_API_URL

export default {
  namespaced: true,
  state: {
    certcount: {
      date: null,
      Org_Id: null,
      count: null,
      currentcount: null
    },
    certhistory: { list: null, totalcount: null, available_balance: null }
  },
  mutations: {
    ClearCountHistory(state) {
      state.certhistory = { list: null, totalcount: null }
    },
    certcount(state, value) {
      state.certhistory=value
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
