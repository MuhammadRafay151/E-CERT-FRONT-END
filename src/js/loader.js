export default {
    data:()=>{
      return{
        loading_text: null,
        loading: false,
      }
    },
    methods: {
        show_loader(text) {
            this.loading_text = text;
            this.loading = true;
        },
        Hide_loader() {
            this.loading = false;
        }
    }
}