import axios from 'axios'
const url = process.env.VUE_APP_API_URL


export default {
    namespaced: true,
    state: {
        UserStats: {},
        CountHistory: {}
    },
    mutations: {
        UpdateDashbord(state, value) {
            state.UserStats = value.UserStats
            state.CountHistory = value.CountHistory

        }
        
    },
    actions: {
        GetDashboard({ rootState, commit }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    commit("UpdateDashbord", response.data)
                    res()
                }).catch(err => {
                    rej(err)
                })
            })
        },
    }
}