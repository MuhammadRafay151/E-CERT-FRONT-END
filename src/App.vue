<template>
  <div id="app">
    <navbar id="nav" />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <b-overlay :show="show" no-wrap>
      <template #overlay>
        <div class="text-center">
          <b-icon
            icon="exclamation-circle-fill"
            variant="danger"
            font-scale="2"
          ></b-icon>
          <p id="cancel-label">waiting for network ...</p>
        </div>
      </template>
    </b-overlay>
    <router-view :key="$route.path" />
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import { io } from "socket.io-client";
import { url } from "./js/config";
export default {
  components: {
    navbar,
  },
  methods: {
    connection() {
      this.show = !navigator.onLine;
    },
  },
  data: () => {
    return {
      show: false,
    };
  },
  mounted() {
    window.addEventListener("online", this.connection);
    window.addEventListener("offline", this.connection);
    // this.connection()
    let socket = io.connect(url);
    socket.on("message", (data) => {
      this.$bvToast.toast(data, {
        title: "Notification",
        toaster: "b-toaster-bottom-right",
        variant: "default",
        solid: true,
      });
    });
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  /* color: #46b7de; */
  color: #22e1ff;
}
</style>
