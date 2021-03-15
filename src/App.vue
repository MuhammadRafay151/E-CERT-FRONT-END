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
    <!-- we are passing this key props so that the view will re redered when the touter params change othwerwise vue will not rendered the 
    view even if the praams change becaus it doesnot detect any change so only way to rerendere the chage is to provide route path as key -->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import GlobalNotification from "./js/GlobalNotification";
import { mapState } from "vuex";
export default {
  components: {
    navbar,
  },
  mixins: [GlobalNotification],
  methods: {
    connection() {
      this.show = !navigator.onLine;
    },
  },
  computed: mapState(["NewMessage"]),
  sockets: {
    connect() {
      console.log("socket connected")
      this.GlobalNotify("Your realtime connection has been conected",false);
    },
    disconnect() {
      console.log("socket disconnected")
      this.GlobalNotify("Your realtime connection has been disconected",false);
    },
    connect_error(err) {
      console.log(err);
    },
    message(data) {
      this.GlobalNotify(data,false);
    },
  },
  data: () => {
    return {
      show: false,
      fruit: {
        apple: true,
      },
    };
  },
  mounted() {
    window.addEventListener("online", this.connection);
    window.addEventListener("offline", this.connection);
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
