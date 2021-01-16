<template>
  <div>
    <div class="row mt-5">
      <div class="col">
        <h2>Users</h2>
        <DoughnutChart
          :chartData="chartData"
          :options="chartOptions"
        ></DoughnutChart>
      </div>
    </div>
  </div>
</template>
<script>
import DoughnutChart from "../Charts/DoughnutChart";
export default {
  name: "UserChart",
  components: {
    DoughnutChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          "Total Users",
          "Active Users",
          "Inactive Users",
          "Unregistered Users",
        ],
        // this.UserStats.TotalLimit, this.UserStats.Active, this.UserStats.Disabled, this.UserStats.UnRegistered
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 30,
      },
    };
  },
  created() {
    var x = this.$store.state.dashboard_state.UserStats;
    this.chartData.datasets.push({
      data: [
        x.TotalLimit,
        x.Active,
        x.Disabled,
        x.UnRegistered,
      ],
      backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#E2CC40"],
      borderWidth: 2,
      borderAlign: "center",
      hoverBorderColor: "#fff",
      hoverBorderWidth: 5,
    });
  },
};
</script>