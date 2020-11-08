import axios from 'axios'
import {url} from '../js/config'
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
    certificates: []
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
    }
  },
  actions: {
    // Createbatch({ commit }) {

    // },
    Create_Certificate({rootState},form) {
      return new Promise((res, rej) => {
     
        axios({
          headers: {
            'Authorization': `Bearer ${rootState.user_state.user.token}` ,
           
          },
          url: url+"api/certificate",
          method: "POST",
          data: form
        }).then(response => {
          console.log(response)
          res()
        }).catch(err => {

          rej(err)
        })
      })
    },
    // VerifyCertificate({ commit }) {

    // },
    // GetCertificateHistory({ commit }) {

    // }
  },

}
