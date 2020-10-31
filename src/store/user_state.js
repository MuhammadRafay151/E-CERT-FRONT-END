import axios from "axios"

export default {
  namespaced: true,
  state: {
    user: { Name: "Muhammad Rafay", SuperAdmin: false,IsAdmin: true, Token: "a" }
  },
  mutations: {
    signout(state) {
      state.user.Token = null
    },
    signin(state, Token) {
      state.user.Token = Token
    }
  },
  actions: {
    authenticate({commit}) {
      return new Promise((res, rej) => {
        axios({
          method: "get",
          url: 'https://jsonplaceholder.typicode.com/todos/1'
        }).then(resposne => {
          commit("signin", "123sdfysdvfg0asd")
          console.log(resposne.data)
          res()
   
        }).catch(() => {
          rej("log in failed")

        })
      })

    },
    signout({ commit }) {
      return new Promise(res=>{
        commit("signout")
        res()
      })
    },
    changepassword(){

    }
  },
  getters: {
    IsLoggedIn(state) {
      return state.user.Token != null
    },
    
  }
}
