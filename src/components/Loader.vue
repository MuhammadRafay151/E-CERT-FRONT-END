<template>
  <div>
    <b-overlay :show="loading" no-wrap rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
          <p id="cancel-label">{{ loading_text }}</p>
        </div>
        <slot></slot>
      </template>
    </b-overlay>
  </div>
</template>
<script>
export default {
  name: "loader",
  data: () => {
    return {
      loading: false,
      loading_text: null,
    };
  },
  methods: {
    show_loader(text) {
      this.loading_text = text;
      this.loading = true;
    },
    Hide_loader() {
      this.loading = false;
    },
  },
};
</script>