<template>
  <div style="margin-top: 120px">
    <b-overlay :show="fetching" no-wrap rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>

          <p id="cancel-label">Fetching Certificate...</p>
        </div>
      </template>
    </b-overlay>
    <div class="container">
      <div class="row ">
        <div class="col shadow p-2 ">
           <a href="#" class="text-dark float-left "  >
          <b-icon class="h1 " icon="arrow-left-circle"></b-icon
        ></a>
        <h1>{{PageTitle}}</h1>
          
        </div>
      </div>
      <div class="row mt-5">
        <div class="col d-flex justify-content-center">
            <component v-bind:is="template" />
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
import c1 from "../components/templates/c1";
export default {
  name: "ViewCertificate",
  props: ["id"],
  data: () => {
    return {
      template: null,
      fetching: true,
      PageTitle:"View Certificates"
    };
  },
  components: {
    c1,
  },
  created() {
    this.$store
      .dispatch("cert_state/GetCertificate", this.id)
      .then((res) => {
        this.template=res
        this.fetching=false
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>