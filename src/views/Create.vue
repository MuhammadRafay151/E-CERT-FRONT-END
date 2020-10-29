<template>
  <div class="container" style="margin-top: 120px;">
    <div class="row" v-if="!is_selected">
      <div class="col">
       <templateselector/>
      </div>
       
    </div>
    <div v-else class="row ">
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
import templateselector from "../components/template_selector";
export default {
  name: "Create",
  components: {
    CertificateInfo,
    Certificate,
    templateselector,
  },
  data: function() {
    return {
      is_selected:false,
    };
  }
};
</script>
