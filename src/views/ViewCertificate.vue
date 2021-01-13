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
            :href="url"
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
import loader from "../js/loader";
import history from "../js/History";
import { mapState } from "vuex";
import TemplateComponents from "../js/TemplateComponents";
export default {
  name: "ViewCertificate",
  mixins: [loader, history, TemplateComponents],
  props: ["id", "IsBatch", "batch_id", "orgid"],
  data: () => {
    return {
      url: null,
      template: null,
      fetching: true,
      PageTitle: "View Certificates",
    };
  },
  computed: {
    ...mapState("cert_state", ["cert"]),
  },
  created() {
    this.show_loader("Fetching...");
    var action = null;
    var obj = { id: this.id, edit: false, orgid: this.orgid };
    if (this.batch_id) {
      this.PageTitle = "View Batch Certificate";
      action = "cert_state/viewBcert";
      obj = { id: this.id, batch_id: this.batch_id, orgid: this.orgid };
      this.url = url + `download/${this.id}/${this.batch_id}`;
    } else if (this.$route.query.IsBatch) {
      this.PageTitle = "View Batch";
      action = "cert_state/GetBatch";
    } else {
      this.PageTitle = "View Certificate";
      action = "cert_state/GetCertificate";
      this.url = url + `download/${this.id}`;
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