<template>
  <div class="container-fluid p-5" style="margin-top:120px">
    <BatchView v-if="BatchDetail" />
    <div v-else>
      <b-card no-body class=" shadow">
        <b-card-body>
          <b-row  align-v="center">
            <b-col class="d-flex justify-content-start">
              <div v-if="Display">
                <b-link href="#" v-on:click="ShowDetail('single')"
                  ><small style="color: blue; text-decoration: underline"
                    >Single Certificate</small
                  ></b-link
                >
                |
                <b-link href="#" v-on:click="ShowDetail('batch')"
                  ><small>Batch Certificate</small></b-link
                >
              </div>
              <div v-else>
                <b-link href="#" v-on:click="ShowDetail('single')"
                  ><small>Single Certificate</small></b-link
                >
                |
                <b-link href="#" v-on:click="ShowDetail('batch')"
                  ><small style="color: blue; text-decoration: underline"
                    >Batch Certificate</small
                  ></b-link
                >
              </div>
            </b-col>

            <b-col class="d-flex justify-content-center">
              <h3>CERTIFICATES</h3>
            </b-col>

            <b-col class="d-flex justify-content-end">
             <div class="align-self-center">
                 
                  <div class="input-group ">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                    />
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-icon icon="search"></b-icon
                  >
                      </div>
                    </div>
                    
                  </div>
                </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>

     
     
      <div class="row mt-3">
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
    ShowDetail(CallFrom) {
      if (CallFrom == "single") {
        this.Display = true;
      } else if (CallFrom == "batch") {
        this.Display = false;
      }
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

<style>
small {
  color: black;
}
small:hover {
  color: blue;
  text-decoration-color: blue;
}
</style>