export default {
    methods: {
        GlobalNotify(msg,noAutoHide=true) {
            this.$bvToast.toast(msg, {
                title: "Notification",
                toaster: "b-toaster-bottom-right",
                variant: "default",
                solid: true,
                appendToast: true,
                noAutoHide: noAutoHide,
                autoHideDelay:1000
            });
        }
    }
}