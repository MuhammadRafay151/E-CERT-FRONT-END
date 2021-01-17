import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins
export default {
  mixins: [Line, reactiveProp],
  props: {
    options: {
      type: Object,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
};