<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p>{{user}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  computed: { ...mapState("user_state",["user"]), }
};
</script>
