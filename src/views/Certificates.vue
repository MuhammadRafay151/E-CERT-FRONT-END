<template>
  <div class="container-fluid p-5" style="margin-top:120px">
   
    <BatchView v-if="BatchDetail" />
    <div v-else>
      <b-card no-body class=" shadow">
        <b-card-body>
          <b-row >
            <div class="col-4">
              <b-nav tabs >
                <b-nav-item :active="Display" v-on:click="showsingle"
                  >SingleCertificates</b-nav-item
                >
                <b-nav-item :active="!Display" v-on:click="showbatch"
                  >BatchCertificates</b-nav-item
                >
              </b-nav>
            </div>

            <div class="col text-center" >
              <h3>CERTIFICATES</h3>
            </div>
            <div class="col text-left " >
            
            </div>
          </b-row>
        </b-card-body>
      </b-card>

      <div class="row mt-1">
        <div class="col">
          <SingleCertificates v-if="Display" />
          <BatchCertificates v-else v-on:BatchDetail="DisplayBatchDetail" />
        </div>
      </div>
    </div>
       
  </div>
</template>
<script>
import SingleCertificates from "../components/SingleCertificates";
import BatchCertificates from "../components/BatchCertificates";
import BatchView from "../components/BatchView";

export default {
  name: "CertificateView",

  components: {
    SingleCertificates,
    BatchCertificates,
    BatchView
  },

  methods: {
    showsingle() {
      this.Display = true;
    },
    showbatch() {
      this.Display = false;
    },

    DisplayBatchDetail() {
      this.BatchDetail = true;
    }
  },
  data() {
    return {
      Display: true,
      BatchDetail: false
    };
  }
};
</script>

<style scoped>
a {
  color: #46b7de;
}
small {
  color: black;
}
small:hover {
  color: blue;
  text-decoration-color: blue;
}
</style>