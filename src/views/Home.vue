<template>
  <div>
    <home />
    <!-- <fter /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import home from "../components/Home";
// import fter from "@/components/Footer";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  computed: { ...mapState("user_state", ["user"]) },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  components: {
    // fter,
    home,
  },
  mounted: function () {
    this.$refs.videoRef.src =
      "http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4";
    this.$refs.videoRef.autoplay = true;
    this.$refs.videoRef.loop = true;
    this.$refs.videoRef.muted = true;
  },
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