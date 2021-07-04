import axios from "axios"
const url = process.env.VUE_APP_API_URL
export default {
    namespaced: true,
    state: {
        Logs: { List: [], Count: 0 },
        DockerLogs: null,
    },
    mutations: {
        SetLogs(state, value) {
            state.Logs.List = value.List
            state.Logs.Count = value.Count
        },
        SetDockerLogs(state, value) {
            state.DockerLogs = value
        }
    },
    actions: {
        GetLogs({ rootState, commit }, PageNo) {
            let temp = url + "api/logs"
            temp += PageNo ? `?pageno=${PageNo}` : ""
            return new Promise((res, rej) => {
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    commit("SetLogs", response.data)
                    res()
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetDockerLogs({ rootState, commit }) {
            commit("SetDockerLogs", "loading...")
            return new Promise((res, rej) => {
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: url + "api/logs/docker"
                }).then(response => {
                    commit("SetDockerLogs", response.data)
                    res()
                }).catch(err => {
                    commit("SetDockerLogs", err.response?.data)
                    rej(err)
                })
            })
        }
    }
}