import { Doughnut } from "vue-chartjs";
export default {
  mixins: [Doughnut],
  props: {
    chartData: {
      type: Object,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    this.renderChart(this.chartData,this.options)
  },
};