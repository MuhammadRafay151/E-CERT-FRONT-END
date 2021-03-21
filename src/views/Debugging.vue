<template>
  <div class="container" style="margin-top: 120px">
    <button class="btn btn-wb float-right" @click="clear">Clear</button>
    <div
      class="d-flex justify-content-center mb-5"
      v-for="(i, index) in logs"
      :key="index"
    >
      <div class="card shadow">
        <div class="card-body">
          <div class="card-title">id: {{ index }}</div>
          <div v-for="(j, index) in i" :key="index">
            <div class="card mt-1">
              <h5 class="card-title">{{ j.message }}</h5>
              <div class="card-body">
                <tree-view :data="j"></tree-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "debugging",
  data: () => {
    return {
      logs: {},
    };
  },
  methods: {
    clear() {
      this.logs = {};
    },
  },
  sockets: {
    log(data) {
      console.log(data);
      if (!this.logs[data._id]) {
        this.logs[data._id] = [data];
        this.logs = { ...this.logs };
      } else {
        this.logs[data._id].push(data);
      }
    },
  },
  mounted() {
    this.$socket.emit("join_debugging");
  },
  destroyed() {
    this.$socket.emit("leave_debugging");
  },
};
</script>