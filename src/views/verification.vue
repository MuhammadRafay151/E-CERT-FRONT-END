<template>
  <div class="container vh-100">
    <div class="row h-100 justify-content-center">
      <div
        class="d-flex justify-content-center align-self-center"
        v-if="!showcertificate"
      >
        <verify v-on:ShowView="rendercert" ref="v1" />
      </div>
      <div class="col d-flex justify-content-center align-self-center " style="margin-top:10%" v-else>
        <div>
          <div class="shadow p-3">
            <h2 :class="'d-inline text-' + alertvariant">{{ title }}!</h2>
            <b-button class="d-inline float-right" title="Load file" @click="download">
              <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
            </b-button>
          </div>

          <div class="row mt-2">
            <div class="col d-flex justify-content-center">
              <component v-bind:is="template" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <b-alert
                class="mt-1"
                v-model="showDismissibleAlert"
                :variant="alertvariant"
                dismissible
              >
                {{ msg }}
              </b-alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import verify from "../components/verify";
import TemplateComponents from "../js/TemplateComponents";
import { mapState} from "vuex"
export default {
  name: "verification",
  mixins: [TemplateComponents],
  computed:{
    ...mapState("cert_state", ["cert"])
  },
  data: function () {
    return {
      showcertificate: false,
      template: null,
      title: null,
      msg: null,
      showDismissibleAlert: false,
      alertvariant: null,
    };
  },
  components: {
    verify,
  },
  methods: {
    rendercert() {
      var x = this.$store.state.cert_state.cert;
      this.template = x.template_id;
      this.msg = x.message;
      if (x.is_expired) {
        this.title = "Expired";
        this.alertvariant = "warning";
      } else {
        this.title = "Verified";
        this.alertvariant = "success";
      }
      this.showcertificate = true;
      this.showDismissibleAlert = true;
    },
    download() {
      const linkSource = `data:application/pdf;base64,${this.cert.pdf}`;
      const downloadLink = document.createElement("a");
      const fileName = this.cert._id;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.$refs.v1.code = this.$route.params.id;
      this.$refs.v1.send();
    }
  },
};
</script>

