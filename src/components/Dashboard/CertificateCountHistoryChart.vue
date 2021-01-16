<template>
  <div>
    <div class="row mt-5">
      <div class="col">
        <h2>Certificate Count History</h2>
        <LineChart :chartData="chartData" :options="chartOptions"></LineChart>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "../Charts/LineChart";
export default {
  name: "CertificateCountHistoryChart",
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          "1/1/21",
          "2/1/21",
          "3/1/21",
          "4/1/21",
          "5/1/21",
          "6/1/21",
          "7/1/21",
          "8/1/21",
          "9/1/21",
          "10/1/21",
        ],
        datasets: [
            {
            data: [40, 20, 10, 1,10, 50, 11, 17, 5,21],
            borderColor: "#FF4136",
            pointBorderColor: "#ffffff",
            pointBackgroundColor: "#FF4136",
            backgroundColor: "#FF41360f",
            borderWidth: 2,
            pointRadius: 6,
            label:"Count History"
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>