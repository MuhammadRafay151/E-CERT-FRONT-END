import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["History"]),
    },
    methods: {
        goback() {
            var length = this.History.length
            if (length > 0) {
                var x = this.History[length - 1];
                this.$store.commit("RemoveFromHistory")
                if (x.params) {
                    this.$router.push({ name: x.RouteName, params: x.params, query: { IsBatch: x.IsBatch, PageNo: x.PageNo } });
                } else {
                    this.$router.push({ name: x.RouteName, query: { IsBatch: x.IsBatch, PageNo: x.PageNo } });
                }
            } else {
                this.route.push(-1)
            }

        },
    },
}