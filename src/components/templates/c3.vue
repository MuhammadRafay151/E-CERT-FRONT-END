<template>
  <div class="container1">
    <img
      src="/templates/c3.png"
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

/* .t {
  position: absolute;
  top: 25%;
  color: black;
  left: 0;
  right: 0;
  font-size: calc(6px + (30 - 6) * ((100vw - 200px) / (1800 - 200)));
  text-transform: uppercase;
} */
.container1 {
  position: relative;
  text-align: center;
  color: white;
}
.CertTemplate{
  position: absolute;
  top: 25%;
  left: 20px;
  color: black;
  left: 0;
  right: 0;
  font-size: calc(6px + (30 - 6) * ((100vw - 200px) / (1800 - 200)));
  font-family: 'Comfortaa';
  height: 555px; /* Assign a value */
  width: 802px;
  word-wrap: break-word;
  margin: auto;
}
/* .desc {
  position: absolute;
  top: 40%;
  color: black;
  left: 0;
  right: 0;
  font-size: calc(6px + (12 - 6) * ((100vw - 200px) / (1800 - 200)));
  width: 80%;
  margin: auto;
} */
.p2 {
  position: absolute;
  top: 89%;
  color: black;
  left: 6%;
  font-size: calc(6px + (12 - 6) * ((100vw - 200px) / (1800 - 200)));
  font-family: 'Comfortaa';
}
.p3 {
  position: absolute;
  top: 93%;
  color: black;
  left: 6%;
  font-size: calc(6px + (12 - 6) * ((100vw - 200px) / (1800 - 200)));
  font-family: 'Comfortaa';
}
.logo {
  position: absolute;
  top: 6%;
  left: 42%;
  width: 8%;
  width: 16%;
  height: 18%;
  object-fit: contain;
}
.sign {
  position: absolute;
  top: 93%;
  left: 68%;
  color: black;
    font-size: calc(5px + (14 - 5) * ((100vw - 300px) / (1600 - 300)));
    font-family: 'Comfortaa';

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