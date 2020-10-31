export default {
  namespaced: true,
  state: {
    cert:{
      title: "Certificate Title",
      name: "\"Name\"",
      email: null,
      instructor: null,
      expiry_date: null,
      description: "\"discription goes here\"",
      logo: null,
      signature: null,
      templateid: null,},
    certificates:[]
  },
  mutations: {
    updatecert(state,value){
      state.cert=value
    }
  },
  actions: {
    // Createbatch({ commit }) {

    // },
    // certificate({ commit }) {

    // },
    // VerifyCertificate({ commit }) {

    // },
    // GetCertificateHistory({ commit }) {

    // }
  },

}
