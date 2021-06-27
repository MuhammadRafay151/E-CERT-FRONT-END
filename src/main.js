import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from 'vuelidate'
import "./assets/css/style.css"
import Textra from 'vue-textra'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import TreeView from "vue-json-tree-view"
import VueSocketIO from 'vue-socket.io';
import { io } from "socket.io-client";

Vue.use(TreeView)
Vue.use(VueSidebarMenu)
Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Textra);
store.commit('user_state/load_user')
const socket = io.connect(process.env.VUE_APP_API_URL, {
  auth: {
    token: store.state.user_state.user.token,
  },
})
store.commit("SetSocket", socket)
Vue.use(new VueSocketIO({

  connection: socket,
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },

}))

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //registering axios intercept
    axios_inter(this.$store, this.$router)
  }
}).$mount("#app");
function axios_inter(store, router) {
  const url = process.env.VUE_APP_API_URL
  let IsRefreshing = false;
  let WaitingQueue = [];
  const ProcessQueue = (error, token = null) => {
    WaitingQueue.forEach(prom => {
      if (error) {
        prom.rej(error);
      } else {
        prom.res(token);
      }
    })

    WaitingQueue = [];
  }
  axios.interceptors.response.use((response) => {
    return response
  }, err => {
    const originalRequest = err.config;
    if((err.response.status === 401) && originalRequest.url === url + 'api/account/login'){
      return Promise.reject(err);
    }
    else if ((err.response.status === 401) && originalRequest.url === url + 'api/account/refresh_token') {
      store.dispatch("user_state/signout").then(() => {
        router.push('/login?session_expire=true')
      })
      return Promise.reject(err);
    }

    if (err.response.status === 401 && !originalRequest._retry) {
      if (IsRefreshing) {
        return new Promise((res, rej) => {
          WaitingQueue.push({ res, rej })
        }).then(token => {
          originalRequest.headers.Authorization = "Bearer " + token
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }
      originalRequest._retry = true;
      IsRefreshing = true
      const RefreshToken = store.state.user_state.user.RefreshToken;
      return axios.post(url + 'api/account/refresh_token',
        {
          RefreshToken: RefreshToken
        })
        .then(res => {
          if (res.status === 200) {
            store.commit('user_state/UpdateAccessToken', res.data.token);
            store.commit("SetSocketToken", res.data.token)
            ProcessQueue(null, res.data.token);
            originalRequest.headers.Authorization = "Bearer " + res.data.token
            return axios(originalRequest);
          }
        }).catch((err) => {
          ProcessQueue(err, null);
          return Promise.reject(err);
        })
        .finally(() => { IsRefreshing = false })
    }
    return Promise.reject(err);
  });
}
