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
    batches: { list: null, totalcount: null }
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
    batches(state,value){
      state.batches=value
    }
    
  },
  actions: {
    GetSingleCertificates({ commit }, value) {
      return new Promise((res, rej) => {
        if (!value) { value = 1 }
        console.log(value)
        var temp = url + "api/certificate?pageno=" + value
        axios({
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
    // Createbatch({ commit }) {

    // },
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
    // VerifyCertificate({ commit }) {

    // },
    // GetCertificateHistory({ commit }) {

    // },
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
    GetBatches({ commit,rootState },pageno) {
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
    }
  },

}
