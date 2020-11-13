<template>
  <div class="home" style="margin-top:120px">
    <!-- <img src="/home.jpg" alt="">
   <h1>HOME</h1> -->
  
  <button class="btn test">Hello World</button>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";
export default {
  name: "Home",

  computed: { ...mapState("user_state", ["user"]) },
  // mounted() {
  //   document.body.classList.add("back");
  // },
  // destroyed() {
  //   document.body.classList.remove("back");
  // }
};
</script>

<style  >
.back {
  background-image: url("/home.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>