<template>
  <div>
    <BatchView v-if="BatchDetail" />
    <div v-else>
      <b-card no-body class="overflow-hidden shadow">
        <b-card-body>
          <b-row align-v="center">
            <b-col sm="3">
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

            <b-col sm="6">
              <h3>CERTIFICATES</h3>
            </b-col>

            <b-col sm="3">
              <b-nav-form @submit.prevent>
                <div class="form-group">
                  <b-form-input placeholder="Search"></b-form-input>
                  <b-button
                    variant="outline-dark"
                    class="my-2 my-sm-0"
                    type="submit"
                    ><b-icon icon="search"></b-icon
                  ></b-button>
                </div>
              </b-nav-form>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>

      <div style="border: ridge" class="d-flex justify-content-end">
        <div style="border: ridge; width: 500px; margin: 5px">
          <b-row style="margin: 5px">
            <b-col sm="1" align-self="center">
              <b-icon icon="funnel-fill"></b-icon>
            </b-col>

            <b-col sm="5"
              ><input type="date" class="form-control" placeholder="From Date"
            /></b-col>

            <b-col sm="1"> ... </b-col>
            
            <b-col sm="5"
              ><input type="date" class="form-control" placeholder="To Date"
            /></b-col>
          </b-row>
        </div>
      </div>
      <SingleCertificates v-if="Display" />
      <BatchCertificates v-else v-on:BatchDetail="DisplayBatchDetail" />
    </div>
  </div>
</template>
<script>
import SingleCertificates from "./SingleCertificates";
import BatchCertificates from "./BatchCertificates";
import BatchView from "./BatchView";

export default {
  name: "CertificateView",

  components: {
    SingleCertificates,
    BatchCertificates,
    BatchView,
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
    },
  },
  data() {
    return {
      Display: true,
      BatchDetail: false,
    };
  },
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