<template>
  <div class="container">
    <div class="row vh-100">
      <div class="col align-self-center">
          <div class="shadow p-2 mb-2">
              <h2>LOGS</h2>
          </div>
        <log-table />
      </div>
    </div>
  </div>
</template>
<script>
import logTable from "../components/LogTable";

export default {
  name: "logs",
  components: { logTable },
};
</script>