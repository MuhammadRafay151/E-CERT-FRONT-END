import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["History"]),
    },
    methods: {
        goback() {
            var x = this.History[0];
            this.$store.commit("RemoveFromHistory")
            this.$router.push({ name: x.RouteName, query: { IsBatch: x.IsBatch, PageNo: x.PageNo } });
        },
    },
}