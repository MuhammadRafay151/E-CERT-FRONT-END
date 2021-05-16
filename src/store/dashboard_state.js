import axios from 'axios'
const url = process.env.VUE_APP_API_URL


export default {
    namespaced: true,
    state: {
        UserStats: {},
        CountHistory: {},
        CountStats: {},
        CreationHistory: {},
        PublicationHistory: {},
        OrganizationStats: {},
    },
    mutations: {
        ResetState(state) {
            state.UserStats = {}
            state.CountHistory = {}
            state.CountStats = {}
            state.CreationHistory = {}
            state.PublicationHistory = {}
            state.OrganizationStats = {}
        }
    },
    actions: {
        GetUserStats({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/UserStats"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetCountHistory({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/CountHistory"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetCountStats({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/CountStats"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetSingleCreationHistory({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/singlecreationhistory"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetBatchCreationHistory({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/batchcreationhistory"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetSinglePublicationHistory({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/singlepublicationhistory"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetBatchPublicationHistory({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/batchpublicationhistory"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetOrganizationStats({ rootState }) {
            return new Promise((res, rej) => {
                var temp = url + "api/dashboard/OrganizationStats"
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    method: "GET",
                    url: temp
                }).then(response => {
                    res(response.data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
    }
}