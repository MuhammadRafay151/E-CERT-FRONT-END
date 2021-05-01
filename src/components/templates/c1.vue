<template>
  <div>
    <div class="container1 border">
      <img
        src="/templates/certificate.jpeg"
        style="width: 100%; object-fit: cover"
        alt=""
      />
      <img :src="cert.logo" width="80" alt="" class="logo" />

      <!-- <h3 class="t">{{ cert.title }}</h3>
      <p class="desc text-left">
        It is to certify that <b>{{ cert.name }}</b> {{ cert.description }}
      </p> -->
      <div class="CertTemplate" v-html="cert.template_display"></div>
      <p v-if="cert.publish && cert.publish.publish_date" class="p2 text-left">
        Publish Date:
        {{ new Date(cert.publish.publish_date).toLocaleDateString() }}
      </p>
      <p v-if="cert.publish && cert.publish.status" class="p3 text-left">
        verfication code: {{ cert._id }}
      </p>
      <div>
        <p class="sign">Signature: ___________________</p>
        <img
          :src="cert.signature"
          width="150"
          height="100"
          alt=""
          class="isign"
        />
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "c2",
  computed: {
    ...mapState("cert_state", ["cert"]),
  },
};
</script>

<style scoped>
.cert {
  width: 842px;
  height: 595px;
}
.logo {
  position: absolute;
  top: 5%;
  left: 85%;
}
.CertTemplate{
  position: absolute;
  top: 20%;
  left: 20px;
  color: black;
  left: 0;
  right: 0;
  font-size: calc(6px + (30 - 6) * ((100vw - 200px) / (1800 - 200)));
  height: 555px; /* Assign a value */
  width: 802px;
  word-wrap: break-word;
  margin: auto;
}
.sign {
  position: absolute;
  top: 95%;
  left: 70%;
  color: black;
  font-size: calc(5px + (14 - 5) * ((100vw - 300px) / (1600 - 300)));
}
.isign {
  position: absolute;
  top: 81%;
  left: 80%;
  width: 16%;
  height: 15%;
  object-fit: contain;
}
/* .t {
  position: absolute;
  top: 20%;
  color: black;
  left: 0;
  right: 0;
  font-size: calc(6px + (30 - 6) * ((100vw - 200px) / (1800 - 200)));
  height: 500px; 
  margin: auto;
} */
.container1 {
  position: relative;
  text-align: center;
  color: white;
  max-width: 900px;
}
.scroll {
  width: 842px;
  overflow-x: scroll;
  overflow-y: hidden;
}
/* .desc {
  position: absolute;
  top: 50%;
  color: black;
  left: 0;
  right: 0;
  top: 40%;
  font-size: calc(4px + (18 - 4) * ((100vw - 200px) / (1800 - 200)));
  width: 60%;
  word-wrap: break-word;
  margin: auto;
} */
.p2 {
 position: absolute;
  top: 88%;
  color: black;
  left: 2%;
  font-size: calc(5px + (14 - 5) * ((100vw - 300px) / (1600 - 300)));
}
.p3 {
  position: absolute;
  top: 92%;
  color: black;
  left: 2%;
  font-size: calc(5px + (14 - 5) * ((100vw - 300px) / (1600 - 300)));
}
</style>