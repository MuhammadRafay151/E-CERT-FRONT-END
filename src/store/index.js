import Vue from "vue";
import Vuex from "vuex";
import user_state from "./user_state"
import cert_state from "./certificate_state"
Vue.use(Vuex);

export default new Vuex.Store({
  state:{},
  mutations: {},
  actions: {},
  modules: {
    user_state:user_state,
    cert_state:cert_state
  }
});
