<template>
  <div class="container" style="margin-top: 120px;">
    <div class="row ">
      <div class="col ">
        <div class=" row justify-content-center ">
          <div class=" col-8 d-flex justify-content-center ">
            <div class="d-none d-md-block d-xl-block">
              <Certificate />
            </div>
          </div>
          <div class="col d-flex justify-content-center">
            <CertificateInfo />
          </div>
        </div>
      </div>
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
