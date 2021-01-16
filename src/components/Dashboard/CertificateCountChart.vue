<template>
  <div>
    <div class="row mt-5">
      <div class="col">
        <h2>Certificate Count</h2>
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
  name: "CertificateCountChart",
  components: {
    DoughnutChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          "Total Certificates",
          "Used Certificates",
          "Available Certificates"
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
};
</script>