import axios from 'axios'
import { url } from '../js/config'

export default {
  namespaced: true,
  state: {
    cert: {
      title: "Certificate Title",
      name: "\"Name\"",
      email: null,
      instructor_name: null,
      expiry_date: null,
      description: "\"discription goes here\"",
      logo: null,
      signature: null,
      templateid: null,
      certificate_img: "base64"
    },
    single_certificates: { list: null, totalcount: null },
    batches: { list: null, totalcount: null },
    BackTrack: { isbatch: null, pageno: null }
  },
  mutations: {
    updatecert(state, value) {
      state.cert = value
    },
    clearcert(state) {
      state.cert = {
        title: "Certificate Title",
        name: "\"Name\"",
        email: null,
        instructor_name: null,
        expiry_date: null,
        description: "\"discription goes here\"",
        logo: null,
        signature: null,
        templateid: null,
      }
    },
    single_certs(state, value) {
      state.single_certificates.list = value.list
      if (value.totalcount) {
        state.single_certificates.totalcount = value.totalcount
      }
    },
    batches(state, value) {
      state.batches = value
    },
    DeleteCert(state, id) {
      var list = state.single_certificates.list
      const filteredItems = list.filter(function (item) {
        return item._id !== id
      })
      state.single_certificates.list = filteredItems
      state.single_certificates.totalcount -= 1
    },
    DeleteBatch(state, id) {
      var list = state.batches.list
      const filteredItems = list.filter(function (item) {
        return item._id !== id
      })
      state.batches.list = filteredItems
      state.batches.totalcount -= 1
    },
    SetBackTrack(state, obj) {
      state.BackTrack = obj
    }

  },
  actions: {
    GetSingleCertificates({ rootState, commit }, value) {
      return new Promise((res, rej) => {
        if (!value) { value = 1 }
        var temp = url + "api/certificate?pageno=" + value
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("single_certs", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    GetCertificate({ rootState, commit }, obj) {
      var temp = null
      if (obj.edit) {
        temp = url + `api/certificate/${obj.id}?edit=${obj.edit}`
      } else {
        temp = url + "api/certificate/" + obj.id
      }
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: temp,
          method: "GET",

        }).then(response => {
          var x = response.data
          x.logo = `data:${x.logo.mimetype};base64,${x.logo.image}`
          x.signature = `data:${x.signature.mimetype};base64,${x.signature.image}`
          commit("updatecert", response.data)
          res(response.data.template_id)
        }).catch(err => {

          rej(err)
        })
      })
    },
    Create_Certificate({ rootState }, form) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/certificate",
          method: "POST",
          data: form
        }).then(response => {
          res(response)
        }).catch(err => {

          rej(err)
        })
      })
    },
    Update_Certificate({ rootState }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/certificate/" + obj.id,
          method: "PUT",
          data: obj.form
        }).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    Delete_Certificate({ rootState, commit }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/certificate/" + id,
          method: "DELETE",
        }).then(response => {
          commit("DeleteCert", id)
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    Publish_Certificate() { },
    VerifyCertificate() { },
    Create_Batch({ rootState }, form) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/batch",
          method: "POST",
          data: form
        }).then(response => {
          res(response)
        }).catch(err => {

          rej(err)
        })
      })



    },
    GetBatches({ commit, rootState }, pageno) {
      return new Promise((res, rej) => {
        if (!pageno) { pageno = 1 }
        var temp = url + "api/batch?pageno=" + pageno
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("batches", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    GetBatch({ commit, rootState }, obj) {
      return new Promise((res, rej) => {
        var temp = null
        if (obj.edit) {
          temp = url + `api/batch/${obj.id}?edit=${obj.edit}`
        } else {
          temp = url + "api/batch/" + obj.id
        }
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          method: "GET",
          url: temp
        })
          .then(response => {
            var x = response.data
            console.log(x)
            x.logo = `${url}image/${x.logo.image}?mimetype=${x.logo.mimetype}`
            x.signature = `${url}image/${x.signature.image}?mimetype=${x.signature.mimetype}`
            commit("updatecert", response.data)
            res(response.data.template_id)
          }).catch(err => {
            rej(err)
          })
      })
    },
    UpdateBatch({ rootState }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/batch/" + obj.id,
          method: "PUT",
          data: obj.form
        }).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    DelelteBatch({ rootState, commit }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/batch/" + id,
          method: "DELETE",
        }).then(response => {
          commit("DeleteBatch", id)
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    CreateBatchCert() { },
    UpdateBatchCert() { },
    DeleteBatchCert() { },
    PublishBatch() { },
    // GetCertificateHistory({ commit }) {

    // },
  },

}
