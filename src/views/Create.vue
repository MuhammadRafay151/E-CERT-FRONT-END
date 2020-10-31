<template>
  <div class="container-fluid" style="margin-top: 120px;">
    <div class="row" v-if="!is_selected">
      <div class="col">
        <templateselector />
      </div>
    </div>
    <div class=" row justify-content-center">
      <div class=" col-8 d-flex justify-content-center">
        <div class="d-none d-md-block d-xl-block">
          <component v-bind:is="template" />
          <!-- <Certificate /> -->
        </div>
      </div>
      <div class="col d-flex justify-content-center ">
        <CertificateInfo />
      </div>
    </div>
  </div>
</template>

<script>
import CertificateInfo from "../components/CertificateInfo";
import c1 from "../components/Certificate";
import c2 from "../components/c2";
import templateselector from "../components/template_selector";
export default {
  name: "Create",
  components: {
    CertificateInfo,
    c1,
    templateselector,
    c2
  },
  data: function() {
    return {
      template: "c2",
      is_selected: true
    };
  }
};
</script>
