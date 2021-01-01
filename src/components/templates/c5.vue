<template>
  <div class="container1">
    <img
      class="border border-dark"
      src="/templates/c5.png"
      style="width: 100%; object-fit: cover"
      alt=""
    />
    <img :src="cert.logo" alt="" class="logo" />
    <h3 class="t text-left">{{ cert.title }}</h3>

    <p class="desc text-left text-justify">
      It is to certify that <br />
      <b style="font-size: 2vw; color: black">{{ cert.name }}</b> <br />
      {{ cert.description }}
    </p>
    <p v-if="cert.publish && cert.publish.publish_date" class="p2 text-left">
      Publish Date:
      {{ new Date(cert.publish.publish_date).toLocaleDateString() }}
    </p>
    <p v-if="cert.publish && cert.publish.status" class="p3 text-left">
      verfication code: {{ cert._id }}
    </p>
    <p class="sign">Signature: _______________</p>
    <img :src="cert.signature" class="isign" />
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
  top: 2%;
  color: #66c8d0;
  left: 2%;
  font-size: 3vw;
  font-family: "Kano regular";
  text-transform: uppercase;
  text-align: justify;
  width: 50%;
  word-wrap: break-word;
}
.desc {
  position: absolute;
  top: 40%;
  color: black;
  left: 2%;
  font-size: 1vw;
  font-family: "Kano regular";
  text-align: justify;
  width: 60%;
  word-wrap: break-word;
}
.container1 {
  position: relative;
  text-align: center;
  color: white;
  max-width: 80;
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
  top: 4%;
  left: 80%;
  width: 16%;
  height: 18%;
  object-fit: contain;
}
.sign {
  position: absolute;
  top: 95%;
  left: 65%;
  color: black;
  font-size: 1vw;
}
.isign {
  position: absolute;
  top: 80%;
  left: 80%;
  width: 16%;
  height: 15%;
  object-fit: contain;
}
</style>