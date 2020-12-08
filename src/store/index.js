import Vue from "vue";
import Vuex from "vuex";
import user_state from "./user_state"
import cert_state from "./certificate_state"
import org_state from "./organization_state"
import certcount_state from "./certcount_state"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //{RouteName:null,IsBatch:null,PageNo:null}
    History: [],
    NewMessage: ""
  },
  mutations: {
    AddToHistory(state, obj) {
      state.History.push(obj)
    },
    RemoveFromHistory(state) {
      state.History.pop()
    }, NewMessage(state, msg) {
      state.NewMessage = msg
    }
  },
  actions: {},
  modules: {
    user_state: user_state,
    cert_state: cert_state,
    org_state: org_state,
    certcount_state: certcount_state
  }
});
