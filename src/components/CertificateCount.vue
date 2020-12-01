<template>
  <div class="container">
    <b-modal id="modal-1" hide-footer centered title="IncreaseCount">
      <AddCertCount :id="id" v-on:Inserted="RefreshHistory" />
    </b-modal>
    <div class="shadow p-3 ">
      <h3 class="d-inline-block">Count History</h3>
      <b-icon
        font-scale="2"
        class="float-right"
        icon="plus-square-fill"
        style="cursor: pointer"
        id="a1"
        v-b-modal.modal-1
      ></b-icon>
      <b-tooltip target="a1" triggers="hover">
       Increase certificate count
      </b-tooltip>
    </div>
    <CertCount :id="id" ref="h1" />
  </div>
</template>

<script>
import CertCount from "../components/CertificateCountHistory";
import AddCertCount from "../components/AddCertCount";

export default {
  name: "CertificateCount",
  props: { id: String },
  components: {
    CertCount,
    AddCertCount,
  },

  methods: {
    RefreshHistory() {
      this.$bvModal.hide("modal-1")
      this.$refs.h1.page(1);
    },
  },
  data() {
    return {
      Display: true,
      Add:true
    };
  },
};
</script>

