<template>
  <div style="overflow: hidden" class="container-fluid">
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
</template>

<script>
import UserChart from "../components/Dashboard/UserChart";
import CertificateCountHistoryChart from "../components/Dashboard/CertificateCountHistoryChart.vue";
import CertificateCountChart from "../components/Dashboard/CertificateCountChart.vue";
import CertificateCreationChart from "../components/Dashboard/CertificateCreationChart.vue";
import CertificatePublicationChart from "../components/Dashboard/CertificatePublicationChart.vue";
import ClientOrganizationChart from "../components/Dashboard/ClientOrganizationChart.vue";
export default {
  name: "Dashboard",
  components: {
    UserChart,
    CertificateCountHistoryChart,
    CertificateCountChart,
    CertificateCreationChart,
    CertificatePublicationChart,
    ClientOrganizationChart,
  },
  created() {
    this.$store
      .dispatch("dashboard_state/GetDashboard")
      .then(() => {
        console.log("successful load");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>