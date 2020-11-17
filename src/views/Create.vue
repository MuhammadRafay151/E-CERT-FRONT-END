<template>
  <div class="container-fluid" style="margin-top: 120px">
    <b-modal
      centered
      id="modalPopover"
      content-class="bg-dark"
      hide-header
      hide-footer
      title="Modal with Popover"
      v-model="select_variant"
      size="lg"
    >
      <div class="row pt-5 pb-5">
        <div class="col border-right">
          <h1
            style="cursor: pointer"
            class="text-white text-center"
            @click="setbatch(false)"
          >
            Single Certificate
          </h1>
        </div>
        <div class="col border-left">
          <h1
            style="cursor: pointer"
            class="text-white text-center"
            @click="setbatch(true)"
          >
            Batch Certificate
          </h1>
        </div>
      </div>
    </b-modal>
    <b-overlay :show="process" no-wrap rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>

          <p id="cancel-label">Processing...</p>
        </div>
      </template>
    </b-overlay>
    <div class="row justify-content-center mb-2" v-if="template || IsBatch != null">
      <div class="col-11 shadow p-2 ">
        <a href="#" class="text-dark float-left"  v-on:click="show_selector">
          <b-icon class="h1" icon="arrow-left-circle"></b-icon
        ></a>
        <h1>{{PageTitle}}</h1>
      </div>
    </div>
    <div class="row" v-if="!template || IsBatch == null">
      <div class="col">
        <templateselector v-on:select="select" />
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-8 d-flex justify-content-center">
        <div class="d-none d-md-block d-xl-block">
          <component v-bind:is="template"  />
          <!-- <Certificate /> -->
        </div>
      </div>
      <div v-if="IsBatch">
        <BatchInfo v-on:start="start_process" v-on:stop="stop_process" v-bind:template_id="template" />
      </div>
      <div v-else class="col d-flex justify-content-center">
        <CertificateInfo v-on:start="start_process" v-on:stop="stop_process" v-bind:template_id="template" />
      </div>
    </div>
  </div>
</template>

<script>
import CertificateInfo from "../components/CertificateInfo";
import BatchInfo from "../components/BatchInfo"
import c1 from "../components/templates/c1";
import templateselector from "../components/template_selector";
export default {
  name: "Create",
  components: {
    CertificateInfo,
    BatchInfo,
    c1,
    templateselector,
  },
  data: function () {
    return {
      PageTitle:null,
      template: "",
      select_variant: false,
      process: false,
      IsBatch: null,
    };
  },
  methods: {
    select(tid) {
      this.template = tid;
      this.select_variant = true;
    },
    show_selector() {
      //for back navigation
      this.template = "";
      this.IsBatch = null;
      this.$store.commit("cert_state/clearcert");
    },
    setbatch(value) {
      this.select_variant = false;
      this.IsBatch = value;
      if(value==true){
        this.PageTitle="Create Batch"
      }else{this.PageTitle="Create Certificate"}
    },
    start_process() {
      this.process = true;
    },
    stop_process() {
      this.process = false;
    },
  },
  created(){
    this.$store.commit('cert_state/clearcert')
  }
};
</script>
