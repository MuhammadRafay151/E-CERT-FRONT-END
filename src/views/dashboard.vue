<template>
  <div style="margin-top: 120px" class="container-fluid">
    <div class="p-2">
      <div class="row" v-if="Authorization.Admin">
        <div class="col">
          <div class="shadow-lg">
            <user-chart />
          </div>
        </div>
      </div>
      <div class="row mt-5" v-if="Authorization.Admin">
        <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <div class="shadow-lg">
            <certificate-count-history-chart />
          </div>
        </div>
        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <div class="shadow-lg">
            <certificate-count-chart />
          </div>
        </div>
      </div>
      <div class="row mt-5" v-if="Authorization.Admin">
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div class="shadow-lg">
            <certificate-creation-chart />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div class="shadow-lg">
            <BatchCertificateCreationChart />
          </div>
        </div>
      </div>

      <div class="row mt-5" v-if="Authorization.Admin">
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div class="shadow-lg">
            <CertificatePublicationChart />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div class="shadow-lg">
            <BatchCertificatePublicationChart />
          </div>
        </div>
      </div>
      <div class="shadow-lg p-5" v-if="Authorization.SuperAdmin">
        <client-organization-chart />
      </div>
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
import { mapState } from "vuex";
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
  computed: {
    ...mapState("user_state", ["Authorization"]),
  },
};
</script>