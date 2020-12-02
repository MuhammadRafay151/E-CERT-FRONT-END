export default {
    data: () => {
        return {
            debounceTimeout: null,
            IsSearching: false,
        }
    },
    methods: {
        debounce(callback) {
            if (this.debounceTimeout) {
                this.IsSearching = false;
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(() => {
                this.IsSearching = true;
                callback();
            }, 2000);
        },
        cleardebounce(){
            clearTimeout(this.debounceTimeout);
        }
    }
}