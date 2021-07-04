<template>
  <div class="container" style="margin-top: 120px">
    <div class="row justify-content-end">
      <b-button variant="wb" size="sm" class="mb-2" v-on:click="load">
        <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon> Refresh
      </b-button>
    </div>
    <div class="row h-100">
      <textarea
        class="form-control align-self-center col-12"
        style="resize: none"
        name=""
        readonly
        rows="20"
        v-model="DockerLogs"
        ref="txt"
      ></textarea>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "docker-logs",
  data() {
    return { data: "...loading" };
  },
  methods: {
    load() {
      this.$store.dispatch("logs_state/GetDockerLogs").then(() => {
        this.$refs.txt.scrollTop = this.$refs.txt.scrollHeight;
      });
    },
  },
  computed: {
    ...mapState("logs_state", ["DockerLogs"]),
  },
  created() {
    this.load();
  },
};
</script>