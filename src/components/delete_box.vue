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
      <p>Are Your sure you want to delete this certificate?</p>
      <template #modal-footer>
        <button class="btn btn-gray" @click="close">Cancel</button>
        <button class="btn btn-wb" v-on:click="yes">Yes</button>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "delete_box",
  data: () => {
    return {
      modalShow: false,
      del_id:null
    };
  },
  methods: {
    show(id){
      this.del_id=id,
      this.modalShow=true
    },
    close() {
      this.modalShow = false;
      this.del_id=null
    },
    yes(){
        this.$emit("delete",this.del_id)
        this.del_id=null
    }
  },
};
</script>