<template>
  <div :style="{ backgroundImage: `url(${image})` }" class="backimg">
    this is just a line for checking purpose
  </div>
</template>

<script>
import image from "../assets/certificate.jpeg";
export default {
  name: "certificate",
  data() {
    return {
      image,
    };
  },
};
</script>

<style>
.backimg {
  width: 842px;
  height: 625px;
}
</style>