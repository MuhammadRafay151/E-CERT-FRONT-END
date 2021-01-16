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
};
</script>