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
        <button class="btn btn-wb" v-on:click="cancel">Cancel</button>
        <button class="btn btn-wb" v-on:click="yes">Yes</button>
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
      obj: null,
    };
  },
  methods: {
    show(msg, obj) {
      this.msg = msg;
      if (obj) {
        this.obj = obj;
      }
      this.modalShow = true;
    },
    yes() {
      this.modalShow = false;
      this.msg = null;
      if (this.obj) {
        this.$emit("yes", this.obj);
        this.obj = null;
      } else {
        this.$emit("yes");
      }
    },
    cancel() {
      this.modalShow = false;
      this.$emit("cancel",this.obj);
      this.obj = null;
      this.msg = null;
    },
  },
};
</script>