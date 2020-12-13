<template>

  <div class="container1">
    <img
      src="../../assets/f2b08cc2a4da932e542734ae797563d1.png"
      style="width: 100%; object-fit: cover"
      alt=""
    />
    <img :src="cert.logo" alt="" class="logo" />
    <h3 class="t">{{ cert.title }}</h3>
    <p class="desc text-left">
      It is to certify that <b>{{ cert.name }}</b> {{ cert.description }}
    </p>
    <p v-if="cert.publish && cert.publish.publish_date" class="p2 text-left">
      Publish Date:
      {{ new Date(cert.publish.publish_date).toLocaleDateString() }}
    </p>
    <p v-if="cert.publish && cert.publish.status" class="p3 text-left">
      verfication code: {{ cert._id }}
    </p>
    <p class="sign">Signature: _____________________</p>
    <img :src="cert.signature" class="isign " style="" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "certificate",
  computed: {
    ...mapState("cert_state", ["cert"]),
  },
};
</script>

<style>
.t {
  position: absolute;
  top: 25%;
  color: black;
  left: 0;
  right: 0;
  font-size: 3vw;
}
.container1 {
  position: relative;
  text-align: center;
  color: white;
 max-width: 80;
}
.scroll {
  width: 800px;
  overflow-x: scroll;
  overflow-y: hidden;
}
.desc {
  position: absolute;
  top: 40%;
  color: black;
  left: 0;
  right: 0;
  font-size: 1vw;
  width: 50%;
  margin: auto;
}
.p2 {
  position: absolute;
  top: 85%;
  color: black;
  left: 20%;
  font-size: 1vw;
}
.p3 {
  position: absolute;
  top: 88%;
  color: black;
  left: 20%;
  font-size: 1vw;
}
.logo {
  position: absolute;
  top: 13%;
  left: 78%;
  width: 8%;
}
.sign {
  position: absolute;
  top: 88%;
  left: 55%;
  color: black;
  font-size: 1vw;
}
.isign {
  position: absolute;
  top: 75%;
  left: 65%;
  width: 16%;
  height: 15%;
  object-fit: contain;
}
</style>