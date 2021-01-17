<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
    <b-card no-body class="shadow">
      <b-card-body>
        <b-row>
          <div class="col-4">
            <b-nav tabs>
              <b-nav-item :active="Display" v-on:click="showsingle" 
                >Single Certificates</b-nav-item
              >
              <b-nav-item :active="!Display" v-on:click="showbatch"
                >Batch Certificates</b-nav-item
              >
            </b-nav>
          </div>

          <div class="col text-center">
            <h3 class="text-wb">CERTIFICATES</h3>
          </div>
          <div class="col text-left"></div>
        </b-row>
      </b-card-body>
    </b-card>

    <div class="row mt-1">
      <div class="col">
        <SingleCertificates  v-if="Display" />
        <batches  v-else />
      </div>
    </div>
  </div>
</template>
<script>
import SingleCertificates from "../components/SingleCertificates";

import Batches from "../components/Batches";

export default {
  name: "CertificateView",
  components: {
    SingleCertificates,
    Batches,
  },
  methods: {
    showsingle() {
      this.Display = true;
    },
    showbatch() {
      this.Display = false;
    },
  },
  data() {
    return {
      Display: true,
    };
  },
  created() {
    this.$store.commit("cert_state/ClearSingleCertificates");
    this.$store.commit("cert_state/ClearBatches");
    this.$store.commit("cert_state/ClearBatchCerts");
    if (this.$route.query.IsBatch) {
      this.showbatch();
    } else {
      this.showsingle();
    }
  },
};
</script>

<style scoped>
a {
  color: #10c3ff;
}
small {
  color: black;
}
small:hover {
  color: blue;
  text-decoration-color: blue;
}
</style>