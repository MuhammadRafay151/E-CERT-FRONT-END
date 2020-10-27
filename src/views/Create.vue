<template>
  <div class="home">
    <div style="float:left">
      <Certificate />
    </div>
    <div style="float:left">
      <CertificateInfo />
    </div>
  </div>
</template>

<script>
import CertificateInfo from "../components/CertificateInfo";
import Certificate from "../components/Certificate";

export default {
  name: "Create",
  components: {
    CertificateInfo,
    Certificate
  }
};
</script>
