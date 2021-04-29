<template>
  <div class="container">
    <b-modal id="modal-1" hide-footer centered title="IncreaseCount">
      <AddCertCount :id="id" v-on:Inserted="RefreshHistory" />
    </b-modal>
    <div class="shadow p-3">
      <div class="row justify-content-between">
        <div class="col d-flex align-items-center">
          <strong>Total Count: {{ org.ecertcount }}</strong>
        </div>
        <div class="col">
          <h3 class="d-inline-block text-wb">Count History</h3>
        </div>
        <div class="col">
          <b-icon
            v-if="Authorization.SuperAdmin"
            font-scale="2"
            class="float-right"
            icon="plus-square-fill"
            style="cursor: pointer"
            id="a1"
            variant="wb"
            v-b-modal.modal-1
          ></b-icon>
          <b-tooltip target="a1" triggers="hover">
            Increase certificate count
          </b-tooltip>
        </div>
      </div>
    </div>
    <CertCount :id="id" ref="h1" />
  </div>
</template>

<script>
import CertCount from "../components/CertificateCountHistory";
import AddCertCount from "../components/AddCertCount";
import { mapState } from "vuex";
export default {
  name: "CertificateCount",
  props: { id: String },
  components: {
    CertCount,
    AddCertCount,
  },
  computed: {
    ...mapState("user_state", ["user", "Authorization"]),
    ...mapState("org_state", ["org"]),
  },
  methods: {
    RefreshHistory() {
      this.$bvModal.hide("modal-1");
      this.$refs.h1.page(1);
    },
  },
  data() {
    return {
      Display: true,
      Add: true,
    };
  },
};
</script>

