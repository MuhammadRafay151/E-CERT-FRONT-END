import axios from "axios"
const url = process.env.VUE_APP_API_URL
export default {
    namespaced: true,
    state: {
        NewCount: 0,
        Notifications: { list: [], count: 0 }
    },
    mutations: {
        SetNotifications(state, value) {
            state.Notifications = value
        },
        SetNotificationCount(state, value) {
            state.NewCount = value.count
        },
        AddNotificationCount(state, value) {
            state.NewCount += value.count
        },
        ResetState(state) {
            state.NewCount = 0
            state.Notifications = { list: [], count: 0 }
        }
    },
    actions: {
        GetNewNotification({ rootState, commit }) {
            return new Promise((res, rej) => {
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    url: url + "api/notification",
                    method: "GET",
                }).then(response => {
                    commit("SetNotifications", response.data)
                    res()
                }).catch(err => {
                    rej(err)
                })
            })
        },
        GetNewNotificationCount({ rootState, commit }) {
            return new Promise((res, rej) => {
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    url: url + "api/notification/unread/count",
                    method: "GET",
                }).then(response => {
                    commit("SetNotificationCount", response.data)
                    res()
                }).catch(err => {
                    rej(err)
                })
            })
        },
        MarkAsRead({ rootState, state }) {
            return new Promise((res, rej) => {
                let ids = state.Notifications.list.filter(x => x.Isread === false).map(x => x._id)
                axios({
                    headers: {
                        'Authorization': `Bearer ${rootState.user_state.user.token}`,
                    },
                    url: url + "api/notification/",
                    method: "PATCH",
                    data: { ids }
                }).then(() => {
                    res()
                }).catch(err => {
                    rej(err)
                })
            })
        }
    }
}