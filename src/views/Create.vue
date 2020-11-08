<template>
  <div class="container-fluid" style="margin-top: 120px;">
        <!-- <b-overlay show no-wrap rounded="sm"  >
          <template #overlay>
        <div class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        
          <p id="cancel-label">Processing...</p>
        
        </div>
      </template>
        </b-overlay> -->
    <div class=" row justify-content-center mb-2" v-if="template">
      <div class="col-11 shadow p-2 text-left align-middle ">
       <a href="#" class="text-dark" v-on:click="show_selector"> <b-icon  class="h1 " icon="arrow-left-circle"></b-icon></a>
      </div>
    </div>
    <div class="row " v-if="!template">
      <div class="col">
        <templateselector v-on:select="select" />
      </div>
    </div>
    <div v-else class=" row justify-content-center">
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

import c1 from "../components/c1";
import templateselector from "../components/template_selector";
export default {
  name: "Create",
  components: {
    CertificateInfo,
    c1,
    templateselector
  },
  data: function() {
    return {
      template: "",
      spin:false
    };
  },
  methods: {
    select(tid) {
      this.template = tid;
      this.spin=true
    },
    show_selector(){
      this.template=""
        this.$store.commit("cert_state/clearcert");
    },
   
    
  }
};
</script>
