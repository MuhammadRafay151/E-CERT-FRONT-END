<template>
  <div>
    <div class="row mt-5">
      <div class="col">
        <h2>Certificate Count</h2>
        <b-overlay :show="loading" wrap rounded="sm">
          <template #overlay>
            <div class="text-center">
              <b-spinner
                style="width: 3rem; height: 3rem"
                label="Large Spinner"
              ></b-spinner>
              <p id="cancel-label">{{ loading_text }}</p>
            </div>
          </template>
          <DoughnutChart
            :chartData="chartData"
            :options="chartOptions"
          ></DoughnutChart>
        </b-overlay>
      </div>
    </div>
  </div>
</template>
<script>
import DoughnutChart from "../Charts/DoughnutChart";
import loader from "../../js/loader";
export default {
  name: "CertificateCountChart",
  mixins: [loader],
  components: {
    DoughnutChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          "Total Certificates",
          "Used Certificates",
          "Available Certificates",
        ],
        datasets: [
          {
            data: [3, 2, 1],
            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40"],
            borderWidth: 2,
            borderAlign: "center",
            hoverBorderColor: "#fff",
            hoverBorderWidth: 5,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 30,
      },
    };
  },
  created() {
    this.show_loader("Fetching...");
    this.$store
      .dispatch("dashboard_state/GetCountStats")
      .then((res) => {
        this.Hide_loader();
        this.chartData = {
          labels: [
            "Total Alloted Count",
            "Total Publications",
            "Available Count",
          ],
          datasets: [
            {
              data: [
                res.TotalAllotedCount,
                res.TotalPublications,
                res.AvailableCount,
              ],
              backgroundColor: ["#0074D9", "#FF4136", "#2ECC40"],
              borderWidth: 2,
              borderAlign: "center",
              hoverBorderColor: "#fff",
              hoverBorderWidth: 5,
            },
          ],
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>