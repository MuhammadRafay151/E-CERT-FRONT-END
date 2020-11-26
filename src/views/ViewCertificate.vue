<template>
  <div style="margin-top: 120px">
    <b-overlay :show="loading" no-wrap rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>

          <p id="cancel-label">{{ loading_text }}</p>
        </div>
      </template>
    </b-overlay>
    <div class="container">
      <div class="row shadow justify-content-between">
        <div class="col d-flex align-self-center">
          <b-icon
            style="cursor: pointer"
            icon="arrow-left-circle"
            v-on:click="goback"
            font-scale="2"
          ></b-icon>
        </div>
        <div class="col">
          <h1>{{ PageTitle }}</h1>
        </div>
        <div class="col d-flex justify-content-end">
          <a
            v-if="!IsBatch && cert.publish && cert.publish.status"
            class="align-self-center text-dark"
            :href="url + 'download/' + id"
            target="_blank"
            ><b-icon icon="cloud-download" font-scale="2"></b-icon
          ></a>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col d-flex justify-content-center">
          <component v-bind:is="template" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col shadow"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { url } from "../js/config";
import c1 from "../components/templates/c1";
import loader from "../js/loader";
import history from "../js/History";
import { mapState } from "vuex";
export default {
  name: "ViewCertificate",
  mixins: [loader, history],
  props: ["id", "IsBatch", "batch_id"],
  data: () => {
    return {
      url: url,
      template: null,
      fetching: true,
      PageTitle: "View Certificates",
    };
  },
  components: {
    c1,
  },
  computed: {
    ...mapState("cert_state", ["cert"]),
  },
  created() {
    this.show_loader("Fetching...");
    var action = null;
    var obj = { id: this.id, edit: false };
    if (this.batch_id) {
      this.PageTitle = "View Batch Certificate";
      action = "cert_state/viewBcert";
      obj = { id: this.id, batch_id: this.batch_id };
    } else if (this.IsBatch) {
      this.PageTitle = "View Batch";
      action = "cert_state/GetBatch";
    } else {
      this.PageTitle = "View Certificate";
      action = "cert_state/GetCertificate";
    }
    this.$store
      .dispatch(action, obj)
      .then((res) => {
        this.template = res;
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>