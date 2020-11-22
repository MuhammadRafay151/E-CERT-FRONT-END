import Vue from "vue";
import Vuex from "vuex";
import user_state from "./user_state"
import cert_state from "./certificate_state"
import org_state from "./organization_state"
import certcount_state from "./certcount_state"
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
 
  },
  mutations: {},
  actions: {},
  modules: {
    user_state:user_state,
    cert_state:cert_state,
    org_state:org_state,
    certcount_state:certcount_state
  }
});
