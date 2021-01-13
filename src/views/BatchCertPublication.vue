<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
    <b-card no-body class="shadow">
      <b-card-body>
        <b-row>
          <div class="col text-center">
            <b-icon
              class="float-left"
              style="cursor: pointer"
              icon="arrow-left-circle"
              v-on:click="goback"
              font-scale="2"
            ></b-icon>
            <h3 class="d-inline-block">BATCH CERTIFICATES</h3>
          </div>
        </b-row>
        <b-row class="justify-content-center" v-if="batch_certs.batch">
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Batch Name:</b> {{ batch_certs.batch.batch_name }}
          </div>
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Certificate Title:</b> {{ batch_certs.batch.title }}
          </div>
        </b-row>
        <b-row class="justify-content-center" v-if="batch_certs.batch">
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Publish Date:</b>
            {{
              new Date(
                batch_certs.batch.publish.publish_date
              ).toLocaleDateString()
            }}
          </div>
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>PublishBy:</b> {{ batch_certs.batch.publish.publisher_name }}
          </div>
        </b-row>
      </b-card-body>
    </b-card>

    <div class="row mt-1">
      <div class="col">
        <BatchCertsPublication :id="id" :orgid="orgid" />
      </div>
    </div>
  </div>
</template>
<script>
import BatchCertsPublication from "../components/BatchCertPublication";
import history from "../js/History";
import { mapState } from "vuex";
export default {
  name: "BCP_VIEW",
  props: ["id", "orgid"],
  mixins: [history],
  components: {
    BatchCertsPublication,
  },
  computed: {
    ...mapState("cert_state", ["batch_certs"]),
  },
};
</script>