<template>
  <div class="container1">
    <img
      src="/templates/c4.png"
      style="width: 100%; object-fit: cover"
      alt=""
    />
    <img :src="cert.logo" alt="" class="logo" />
    <h3 class="t text-center">{{ cert.title }}</h3>
    <p class="desc text-center">
      It is to certify that <b>{{ cert.name }}</b> {{ cert.description }}
    </p>
    <p v-if="cert.publish && cert.publish.publish_date" class="p2 text-left">
      Publish Date:
      {{ new Date(cert.publish.publish_date).toLocaleDateString() }}
    </p>
    <p v-if="cert.publish && cert.publish.status" class="p3 text-left">
      verfication code: {{ cert._id }}
    </p>
    <p class="sign">Signature: __________________</p>
    <img :src="cert.signature" class="isign" style="" />
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

<style scoped>
.t {
  position: absolute;
  top: 30%;
  color: black;
  left: 9.5%;
  font-size: 2vw;
  width: 80%;
  word-wrap: break-word;
  font-family: "Century Gothic";
}
.container1 {
  position: relative;
  text-align: center;
  color: white;
}
.desc {
  position: absolute;
  top: 40%;
  color: black;
  left: 8%;
  font-size: calc(4px + (13 - 4) * ((100vw - 200px) / (1800 - 200)));
  width: 80%;
  word-wrap: break-word;
  font-family: "Century Gothic";
}
.p2 {
  position: absolute;
  top: 85%;
  color: black;
  left: 8%;
  font-size: calc(6px + (12 - 6) * ((100vw - 200px) / (1800 - 200)));
}
.p3 {
  position: absolute;
  top: 88%;
  color: black;
  left: 8%;
  font-size: calc(6px + (12 - 6) * ((100vw - 200px) / (1800 - 200)));
}
.logo {
  position: absolute;
  top: 10%;
  left: 45%;
  width: 8%;
  width: 16%;
  height: 18%;
  object-fit: contain;
}
.sign {
 position: absolute;
  top: 87%;
  left: 65%;
  color: black;
  font-size: calc(5px + (14 - 5) * ((100vw - 300px) / (1600 - 300)));
}
.isign {
 position: absolute;
  top: 75%;
  left: 76%;
  width: 16%;
  height: 15%;
  object-fit: contain;
}
</style>