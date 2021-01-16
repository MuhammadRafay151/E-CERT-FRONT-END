import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  mixins: [Doughnut,reactiveProp],
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