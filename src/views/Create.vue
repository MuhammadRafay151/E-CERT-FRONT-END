<template>
  <div v-if="isSupported" class="container-fluid" style="margin-top: 120px">
    <b-modal
      centered
      id="modalPopover"
      content-class="bg-wb"
      hide-header
      hide-footer
      title="Modal with Popover"
      v-model="select_variant"
      size="lg"
    >
      <div class="row pt-5 pb-5">
        <div class="col border-right text-center">
          <h2
            style="cursor: pointer"
            class="text-white text-center"
            @click="setbatch(false)"
          >
            Individual Certificate
          </h2>
          <sub>Create certificate for individual entity</sub>
        </div>
        <div class="col border-left text-center">
          <h2
            style="cursor: pointer"
            class="text-white text-center"
            @click="setbatch(true)"
          >
            Batch Certificate
          </h2>
          <sub
            >Create Batch for handling mulitple certificate in a group form</sub
          >
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
    <div
      class="row justify-content-center mb-2"
      v-if="template || IsBatch != null"
    >
      <div class="col-11 shadow p-2">
        <a href="#" class="text-dark float-left" v-on:click="show_selector">
          <b-icon class="h1" icon="arrow-left-circle"></b-icon
        ></a>
        <h1 class="text-wb">{{ PageTitle }}</h1>
      </div>
    </div>
    <div class="row" v-if="!template || IsBatch == null">
      <div class="col">
        <templateselector v-on:select="select" />
      </div>
    </div>
    <div v-else class="d-flex justify-content-center">
      <div>
        <component v-bind:is="template" />
      </div>
      <div v-if="IsBatch">
        <BatchInfo
          v-on:start="start_process"
          v-on:stop="stop_process"
          v-bind:template_id="template"
        />
      </div>
      <div v-else class="ml-5">
        <CertificateInfo
          v-on:start="start_process"
          v-on:stop="stop_process"
          v-bind:template_id="template"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <h1 style="margin-top: 120px">
      This feature is not supported on mobile & tablet devices.
    </h1>
  </div>
</template>

<script>
import CertificateInfo from "../components/CertificateInfo";
import BatchInfo from "../components/BatchInfo";
import templateselector from "../components/template_selector";
import TemplateComponents from "../js/TemplateComponents";
import utils from "../js/utils";
export default {
  name: "Create",
  mixins: [TemplateComponents, utils],
  components: {
    CertificateInfo,
    BatchInfo,
    templateselector,
  },
  data: function () {
    return {
      PageTitle: null,
      template: "",
      select_variant: false,
      process: false,
      IsBatch: null,
      isSupported: true,
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
      if (value == true) {
        this.PageTitle = "Create Batch";
      } else {
        this.PageTitle = "Create Certificate";
      }
    },
    start_process() {
      this.process = true;
    },
    stop_process() {
      this.process = false;
    },
  },
  created() {
    this.$store.commit("cert_state/clearcert");
    if (this.isMobileAndTablet()) {
      this.isSupported = false;
    }
  },
};
</script>
