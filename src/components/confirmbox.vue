<template>
  <div>
    <b-modal
      centered
      id="modalPopover"
      content-class="shadow"
      hide-header
      title="Modal with Popover"
      v-model="modalShow"
    >
      <p>{{ msg }}</p>
      <template #modal-footer>
        <button class="btn btn_fr" v-on:click="cancel">Cancel</button>
        <button class="btn btn_fr" v-on:click="yes">Yes</button>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "confirmbox",
  data: () => {
    return {
      msg: null,
      modalShow: false,
    };
  },
  methods: {
    show(msg) {
      this.msg = msg;
      this.modalShow=true
    },
    yes() {
      this.modalShow = false;
      this.$emit("yes");
    },
    cancel() {
      this.modalShow = false;
      this.$emit("cancel");
    },
  },
};
</script>