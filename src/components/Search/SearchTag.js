//this code used in the compoent which are using searching compoenent for searches so this compoenent will show the search in to tags and provide functionality to clear the search filters.
export default {
    data() {
        return {
            value: [],
        };
    },
    methods: {
        ClearSQ() {
            this.SQuery = null;
            this.value = [];
            this.page(1);
            this.currentPage = 1;
        },
    }
}