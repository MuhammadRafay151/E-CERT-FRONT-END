<template>
  <div style="overflow: hidden; margin-top:120px" class="container-fluid">
    <b-overlay :show="loading" no-wrap rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>

          <p id="cancel-label">Processing...</p>
        </div>
      </template>
    </b-overlay>
    <div v-if="!loading">
      <user-chart />
      <div class="row">
        <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <certificate-count-history-chart />
        </div>
        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <certificate-count-chart />
        </div>
      </div>
      <certificate-creation-chart />
      <certificate-publication-chart />
      <client-organization-chart />
    </div>
  </div>
</template>

<script>
import UserChart from "../components/Dashboard/UserChart";
import CertificateCountHistoryChart from "../components/Dashboard/CertificateCountHistoryChart.vue";
import CertificateCountChart from "../components/Dashboard/CertificateCountChart.vue";
import CertificateCreationChart from "../components/Dashboard/CertificateCreationChart.vue";
import CertificatePublicationChart from "../components/Dashboard/CertificatePublicationChart.vue";
import ClientOrganizationChart from "../components/Dashboard/ClientOrganizationChart.vue";
import loader from "../js/loader";
export default {
  name: "Dashboard",
  mixins:[loader],
  components: {
    UserChart,
    CertificateCountHistoryChart,
    CertificateCountChart,
    CertificateCreationChart,
    CertificatePublicationChart,
    ClientOrganizationChart,
  },
  created() {
     this.show_loader("Fetching...");
  
    this.$store
      .dispatch("dashboard_state/GetDashboard")
      .then(() => {
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>