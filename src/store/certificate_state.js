import axios from 'axios'
const url = process.env.VUE_APP_API_URL
import Vue from "vue";
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
    batch_certs: { list: null, totalcount: null, batch: null },
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
      if (value.totalcount && parseInt(value.totalcount) >= 0) {
        state.single_certificates.totalcount = value.totalcount
      }
    },
    ClearSingleCertificates(state) {
      state.single_certificates = { list: null, totalcount: null }
    },
    ClearBatches(state) {
      state.batches = { list: null, totalcount: null }
    },
    ClearBatchCerts(state) {
      state.batch_certs = { list: null, totalcount: null, batch: null }
    },
    batches(state, obj) {
      state.batches.list = obj.list
      if (obj.totalcount && parseInt(obj.totalcount) >= 0) {
        state.batches.totalcount = obj.totalcount
      }
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
    },
    BatchCerts(state, obj) {
      state.batch_certs.list = obj.list
      if (obj.totalcount) {
        state.batch_certs.totalcount = obj.totalcount
      }
      if (obj.batch) {
        state.batch_certs.batch = obj.batch
      }
    },
    DeleteBatchCert(state, id) {
      var list = state.batch_certs.list
      const filteredItems = list.filter(function (item) {
        return item._id !== id
      })
      state.batch_certs.list = filteredItems
      state.batch_certs.totalcount -= 1
    },
    UpdateBatchCert(state, obj) {
      var list = state.batch_certs.list
      var index = list.findIndex((x => x._id == obj._id))
      Vue.set(state.batch_certs.list, index, obj)
    },
  },
  actions: {
    GetSingleCertificates({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        var temp = url + `api/certificate?pageno=${obj.pageno}&sort=${obj.sort}`
        obj.query ? temp += `&${obj.query}` : null
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
      } else if (obj.orgid && obj.id) {
        temp = url + `api/certificate/org_pub/${obj.orgid}/${obj.id}/`
      }
      else {
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
          x.logo = `${url}image/${x.logo}`
          x.signature = `${url}image/${x.signature}`
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
    Publish_Certificate({ rootState }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/publish/single",
          method: "POST",
          data: { id: id }
        }).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    GetPublishCertificates({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        let temp = null
        if (obj.id) {
          temp = url + `api/certificate/org_pub/${obj.id}/?pageno=${obj.pageno}&sort=${obj.sort}`
        } else {
          temp = url + `api/certificate?pageno=${obj.pageno}&pub=true&sort=${obj.sort}`
        }
        obj.query ? temp += `&${obj.query}` : null
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
    VerifyCertificate({ rootState, commit }, code) {
      return new Promise((res, rej) => {
        var temp = url + "api/verify/" + code
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "GET",
          url: temp
        }).then(response => {
          var x = null
          x = response.data
          if (x.blockchain === true) {
            x.logo = `data:${x.logo.mimetype};base64,${x.logo.image}`
            x.signature = `data:${x.signature.mimetype};base64,${x.signature.image}`
          } else {
            x.logo = `${url}image/${x.logo}`
            x.signature = `${url}image/${x.signature}`
          }

          commit("updatecert", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
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
    GetBatches({ commit, rootState }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        let temp = url + `api/batch?pageno=${obj.pageno}&sort=${obj.sort}`
        obj.query ? temp += `&${obj.query}` : null
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
            x.logo = `${url}image/${x.logo}`
            x.signature = `${url}image/${x.signature}`
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
    CreateBatchCert({ rootState, }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + "api/bcert",
          method: "POST",
          data: obj
        }).then(() => {
          res()
        }).catch(err => {
          rej(err)
        })
      })

    },
    GetBatchCerts({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        var temp = url + `api/bcert/${obj.id}?pageno=${obj.pageno}`
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("BatchCerts", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    UpdateBatchCert({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + `api/bcert/`,
          method: "PUT",
          data: obj
        }).then(response => {
          commit("UpdateBatchCert", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    DeleteBatchCert({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          url: url + `api/bcert/${obj.id}/${obj.batch_id}`,
          method: "DELETE",
        }).then(response => {
          commit("DeleteBatchCert", obj.id)
          console.log(response)
          res()
        }).catch(err => {
          rej(err)
        })
      })

    },
    viewBcert({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        var temp = null
        if (obj.orgid) {
          temp = url + `api/bcert/view/${obj.orgid}/${obj.id}/${obj.batch_id}`
        } else {
          temp = url + `api/bcert/view/${obj.id}/${obj.batch_id}`
        }

        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          method: "GET",
          url: temp
        }).then(response => {
          var x = response.data
          x.logo = `${url}image/${x.logo}`
          x.signature = `${url}image/${x.signature}`
          commit("updatecert", x)
          res(response.data.template_id)
        }).catch(err => {
          rej(err)
        })
      })
    },
    PublishBatch({ rootState }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,

          },
          url: url + "api/publish/batch",
          method: "POST",
          data: { id: id }
        }).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    GetPublishBatches({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        let temp = null;
        if (obj.id) {
          temp = url + `api/batch/org_pub/${obj.id}/?pageno=${obj.pageno}&sort=${obj.sort}`
        } else {
          temp = url + `api/batch?pageno=${obj.pageno}&pub=true&sort=${obj.sort}`
        }
        obj.query ? temp += `&${obj.query}` : null
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
    GetPublishBatchCerts({ rootState, commit }, obj) {
      return new Promise((res, rej) => {
        if (!obj.pageno) { obj.pageno = 1 }
        var temp = null
        if (obj.orgid) {
          temp = url + `api/bcert/org_pub/${obj.orgid}/${obj.id}?pageno=${obj.pageno}&pub=true`
        } else {
          temp = url + `api/bcert/${obj.id}?pageno=${obj.pageno}&pub=true`
        }
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "GET",
          url: temp
        }).then(response => {
          commit("BatchCerts", response.data)
          res()
        }).catch(err => {
          rej(err)
        })
      })
    },
    EmailSingleCert({ rootState }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "POST",
          url: url + "api/mail/single/" + id
        }).then(() => {
          res()
        }).catch(() => {
          rej()
        })
      })
    },
    EmailBatchCert({ rootState }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "POST",
          url: url + "api/mail/batchcert/" + id
        }).then(() => {
          res()
        }).catch(() => {
          rej()
        })
      })
    },
    EmailBatch({ rootState }, id) {
      return new Promise((res, rej) => {
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}`,
          },
          method: "POST",
          url: url + "api/mail/batch/" + id
        }).then(() => {
          res()
        }).catch(() => {
          rej()
        })
      })
    },
  },

}
