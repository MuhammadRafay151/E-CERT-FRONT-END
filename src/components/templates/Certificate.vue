<template>
  <div class="container1">
    <img
      src="/templates/f2b08cc2a4da932e542734ae797563d1.png"
      style="width: 100%; object-fit: cover"
      alt=""
    />
    <img :src="cert.logo" alt="" class="logo" />
    <div class="CertTemplate" v-html="cert.template"></div>
    <!-- <h3 class="t">{{ cert.title }}</h3>
    <p class="desc text-left">
      It is to certify that <b>{{ cert.name }}</b> {{ cert.description }}
    </p> -->
    <p v-if="cert.publish && cert.publish.publish_date" class="p2 text-left">
      Publish Date:
      {{ new Date(cert.publish.publish_date).toLocaleDateString() }}
    </p>
    <p v-if="cert.publish && cert.publish.status" class="p3 text-left">
      verfication code: {{ cert._id }}
    </p>
    <p class="sign">Signature: _____________________</p>
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
/* .t {
  position: absolute;
  top: 25%;
  color: black;
  left: 0;
  right: 0;
  font-size: 3vw;
} */
.container1 {
  position: relative;
  text-align: center;
  color: white;
  /* max-width: 80; */
  width: 900px;
}
.scroll {
  width: 800px;
  overflow-x: scroll;
  overflow-y: hidden;
}
/* .desc {
  position: absolute;
  top: 25%;
  color: black;
  left: 0;
  right: 0;
  font-size: 1vw;
  width: 50%;
  margin: auto;
} */
.CertTemplate {
  position: absolute;
  top: 25%;
  left: 20px;
  color: black;
  left: 0;
  right: 0;
  /* font-size: 1.1vw; */
  height: 555px; /* Assign a value */
  width: 85%;
  word-wrap: break-word;
  margin: auto;
  font-family: "Century Gothic";
}
.p2 {
  position: absolute;
  top: 85%;
  color: black;
  left: 20%;
  font-family: "Century Gothic";
  /* font-size: 1vw; */
}
.p3 {
  position: absolute;
  top: 88%;
  color: black;
  left: 20%;
  font-family: "Century Gothic";
  /* font-size: 1vw; */
}
.logo {
  position: absolute;
  top: 12%;
  left: 14%;
  width: 10%;
  height: 12%;
  object-fit: contain;
}
.sign {
  position: absolute;
  top: 88%;
  left: 55%;
  color: black;
  font-size: 1vw;
  font-family: "Century Gothic";
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