<template>
  <div class="container-fluid" style="margin-top: 120px">
    <b-overlay :show="loading" no-wrap rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
          <p id="cancel-label">{{loading_text}}</p>
        </div>
      </template>
    </b-overlay>
    <div class="row justify-content-center mb-2" v-if="template">
      <div class="col-11 shadow p-2">
         <b-icon class="h1 float-left" style="cursor: pointer;"  v-on:click="goback" icon="arrow-left-circle"></b-icon>
      
        <h1 class="d-inline-block">{{ PageTitle }}</h1>
        <b-dropdown
          class="d-d-inline-block float-right"
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          right
        >
          <template #button-content>
            <b-icon
              icon="three-dots-vertical"
              variant="dark"
              font-scale="1"
            ></b-icon>
          </template>
          <b-dropdown-item href="#" v-on:click="show_selector"
            >Change Template</b-dropdown-item
          >
          <!-- <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#"
                  >Something else here...</b-dropdown-item
                > -->
        </b-dropdown>
      </div>
    </div>
    <div class="row" v-if="selector">
      <div class="col">
        <templateselector
          v-on:select="select"
          v-on:close="close_selector"
          edit
        />
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-8 d-flex justify-content-center">
        <div class="d-none d-md-block d-xl-block">
          <component v-bind:is="template" />
          <!-- <Certificate /> -->
        </div>
      </div>
      <div v-if="IsBatch && template">
        <BatchInfo
          ref="batch"
          v-on:start="show_loader('Updating...')"
          v-on:stop="Hide_loader"
          v-bind:template_id="template"
          edit
        />
      </div>
      <div v-else-if="template" class="col d-flex justify-content-center">
        <CertificateInfo
          ref="ct1"
          v-on:start="show_loader('Updating...')"
          v-on:stop="Hide_loader"
          v-bind:template_id="template"
          edit
        />
      </div>
    </div>
  </div>
</template>
<script>
import templateselector from "../components/template_selector";
import CertificateInfo from "../components/CertificateInfo";
import BatchInfo from "../components/BatchInfo";
import TemplateComponents from "../js/TemplateComponents"
import loader from "../js/loader";
import history from '../js/History'
export default {
  //we use this for modification of batch and single certificates.
  name: "Edit",
  mixins: [loader,history,TemplateComponents],
  props: { id: String, IsBatch: Boolean },
  components: {
    CertificateInfo,
    BatchInfo,
    templateselector,
  },

  data: () => {
    return {
      PageTitle: null,
      template: null,
      select_variant: false,
      selector: false,
    };
  },
  methods: {
    show_selector() {
      //for show template selector
      this.selector = true;
    },
    close_selector() {
      this.selector = false;
    },
    select(tid) {
      this.template = tid;
      this.close_selector();

      // console.log("template selcted & it's id is:" + tid);
    },
  },
  created() {
    this.show_loader("Fetching...");
    var action = null;
    if (this.IsBatch) {
      this.PageTitle = "Edit Batch";
      action = "cert_state/GetBatch";
    } else {
      this.PageTitle = "Edit Certificate";
      action = "cert_state/GetCertificate";
    }
    this.$store
      .dispatch(action, { id: this.id, edit: true })
      .then((res) => {
        this.template = res;
        this.Hide_loader()
      })
      .catch(() => {
        this.$router.push({name:"404"})
      });
  },
};
</script>