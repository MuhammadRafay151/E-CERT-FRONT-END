<template>
  <div class="container" style="margin-top: 120px">
    <div class="d-flex justify-content-center mb-5" v-for="(i,index) in logs" :key="index">
      <div class="card shadow">
        <div class="card-body">
          <tree-view :data="i" ></tree-view>
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
  sockets: {
    log(data) {
      console.log(data)
      if (!this.logs[data._id]) {
        this.logs[data._id] = [data];
        this.logs={...this.logs}
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