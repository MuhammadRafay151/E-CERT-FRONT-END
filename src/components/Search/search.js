export default {
    data: () => {
        return {
            title: "",
            fromdate: "",
            todate: "",
        };
    },
    methods: {
        Search() {
            let query = "";
            for (const [key, value] of Object.entries(this.$data)) {
                if (value) {
                    query += `${key}=${value}&`;
                }
            }
            query = query.slice(0, query.length - 1);
            if (query.length > 0) {
                this.$emit("search", { query: query, data: this.$data });
            }
        },
    },
}