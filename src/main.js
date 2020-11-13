import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from 'vuelidate'
import "./assets/css/style.css"
Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
