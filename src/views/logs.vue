<template>
  <div class="container">
    <div class="row vh-100">
      <div class="col align-self-center">
        <div class="shadow p-2 mb-2 clearfix">
          <h2 class="d-inline-block">LOGS</h2>
          <button class="d-inline btn btn-wb float-right" v-on:click="Refresh">Refresh</button>
        </div>
        <log-table
          ref="l1"
          :pageno="$route.query.pageno ? $route.query.pageno : 1"
        />
      </div>
    </div>
  </div>
</template>
<script>
import logTable from "../components/LogTable";

export default {
  name: "logs",
  components: { logTable },
  methods: {
    Refresh() {
      this.$refs.l1.Load();
    },
  },
};
</script>