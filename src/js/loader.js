export default {
  data: () => {
    return {
      loading_text: null,
      loading: false,
      spinner: true
    }
  },
  methods: {
    show_loader(text) {
      this.loading_text = text;
      this.loading = true;
      this.spinner = true
    },
    Hide_loader() {
      this.loading = false;
    },
    show_error(text) {
      this.loading_text = text
      this.loading = true;
      this.spinner = false
    },
    dismissible_error(text) {
      this.loading_text = text
      this.loading = true;
      this.spinner = false
      setTimeout(() => {
        this.Hide_loader()
      }, 1000);
    },

  }
}