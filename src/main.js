import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from 'vuelidate'
import "./assets/css/style.css"
import Textra from 'vue-textra'
 

Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Textra);
store.commit('user_state/load_user')
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
  axios.interceptors.response.use(res => {
    // Important: response interceptors **must** return the response.
    return res;
  }, err => {
    if (err.response.status === 403) {
      console.log(1)
      router.push('/login?session_expire=true')
      store.commit("user_state/signout")
    }
    return new Promise((resolve, reject) => {
      reject(err);
    });
  });
}
