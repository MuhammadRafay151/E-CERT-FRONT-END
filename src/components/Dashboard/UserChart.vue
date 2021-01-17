<template>
  <div>
    <h2>Users</h2>
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
</template>
<script>
import DoughnutChart from "../Charts/DoughnutChart";
import loader from "../../js/loader";
export default {
  name: "UserChart",
  mixins: [loader],
  components: {
    DoughnutChart,
  },
  data: () => {
    return {
      chartData: {
        labels: [
          "Total Users",
          "Active Users",
          "Inactive Users",
          "Unregistered Users",
        ],
        datasets: [
          {
            data: [4, 2, 1, 1],
            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#E2CC40"],
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
      .dispatch("dashboard_state/GetUserStats")
      .then((res) => {
        this.Hide_loader();
        this.chartData = {
          labels: [
            "Total Users",
            "Active Users",
            "Inactive Users",
            "Unregistered Users",
          ],
          datasets: [
            {
              data: [
                res.TotalLimit,
                res.Active,
                res.Disabled,
                res.UnRegistered,
              ],
              backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#E2CC40"],
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