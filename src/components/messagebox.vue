<template>
  <div>
    <b-modal
      centered
      id="modalPopover"
      content-class="shadow"
      hide-header
      title="Modal with Popover"
      v-model="show"
    >
      <p>Are Your sure you want to delete this certificate?</p>
      <template #modal-footer>
        <button class="btn btn_fr" v-on:click="ok">OK</button>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
     name: "messagebox",
     props:{show:Boolean},
  data: () => {
    return {
      modalShow: false,
    };
  },
  methods: {
   
    ok(){
      this.modalShow=false
    }
  },

}
</script>