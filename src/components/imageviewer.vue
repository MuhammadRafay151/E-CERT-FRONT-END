<template>
  <div>
    <b-modal
      content-class="mo"
      model-body="mo"
      v-model="modalShow"
      id="modal-xl"
      centered
      size="xl"
      hide-footer
      hide-header
    >
      <div class="float-right">
        <a href="#" class="text-white" v-on:click="close">X</a>
      </div>
      <img :src="path" alt="" width="100%" />
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "image_viewer",
  props: ["path"],
  data: () => {
    return {
      modalShow: false
    };
  },
  methods: {
    close() {this.modalShow=false}
  }
};
</script>
<style  >
.mo {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: transparent;
  background-clip: padding-box;
  border: 0px solid rgba(0, 0, 0, 0.2);
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
}
</style>