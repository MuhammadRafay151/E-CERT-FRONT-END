<template>
  <div>
    <h2>Individual Certificate Creation</h2>
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
      <LineChart :chartData="chartData" :options="chartOptions"></LineChart>
    </b-overlay>
  </div>
</template>
<script>
import loader from "../../js/loader";
import LineChart from "../Charts/LineChart";
export default {
  name: "CertificateCreationChart",
  mixins: [loader],
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
            data: [40, 20, 10, 1, 10, 50, 11, 17, 5, 21],
            borderColor: "#5fdba7",
            pointBorderColor: "#ffffff",
            pointBackgroundColor: "#5fdba7",
            backgroundColor: "#5fdba70f",
            borderWidth: 2,
            pointRadius: 6,
            label: "Single Certificates",
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
    this.show_loader("Fetching...");
    this.$store
      .dispatch("dashboard_state/GetSingleCreationHistory")
      .then((res) => {
        var chartData = {
          labels: [],
          datasets: [
            {
              data: [],
              borderColor: "#5fdba7",
              pointBorderColor: "#ffffff",
              pointBackgroundColor: "#5fdba7",
              backgroundColor: "#5fdba70f",
              borderWidth: 2,
              pointRadius: 6,
              label: "Single Certificates",
            },
          ],
        };
        for (let i = 0; i < res.length; i++) {
          chartData.labels.push(new Date(res[i].date).toLocaleDateString());
          chartData.datasets[0].data.push(res[i].Count);
        }
        this.chartData = chartData;
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>