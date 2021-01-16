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
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: "#FF4136",
            pointBorderColor: "#ffffff",
            pointBackgroundColor: "#FF4136",
            backgroundColor: "#FF41360f",
            borderWidth: 2,
            pointRadius: 6,
            label: "Count History",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    var x = this.$store.state.dashboard_state.CountHistory;
 
    for (var i = 0; i < x.length; i++) {
      this.chartData.labels.push(new Date(x[i].date).toLocaleDateString());
      this.chartData.datasets[0].data.push(x[i].Count)
    }
  },
};
</script>