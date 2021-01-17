<template>
  <div style="overflow: hidden; margin-top: 120px" class="container-fluid">
    <div>
      <user-chart />
      <div class="row">
        <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <certificate-count-history-chart />
        </div>
        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <certificate-count-chart />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <certificate-creation-chart />
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <BatchCertificateCreationChart />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <CertificatePublicationChart />
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <BatchCertificatePublicationChart />
        </div>
      </div>
      <client-organization-chart />
    </div>
  </div>
</template>

<script>
import UserChart from "../components/Dashboard/UserChart";
import CertificateCountHistoryChart from "../components/Dashboard/CertificateCountHistoryChart.vue";
import CertificateCountChart from "../components/Dashboard/CertificateCountChart.vue";
import CertificateCreationChart from "../components/Dashboard/CertificateCreationChart.vue";
import BatchCertificateCreationChart from "../components/Dashboard/BatchCertificateCreationChart";
import CertificatePublicationChart from "../components/Dashboard/CertificatePublicationChart.vue";
import BatchCertificatePublicationChart from "../components/Dashboard/BatchCertificatePublicationHistory";
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
    BatchCertificateCreationChart,
    BatchCertificatePublicationChart,
  },
};
</script>