<template>
  <div style="margin-top: 120px">
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
    <div class="container">
      <div class="row ">
        <div class="col shadow p-2 ">
             <b-icon class="h1 float-left" style="cursor: pointer;" icon="arrow-left-circle" v-on:click="goback"></b-icon
        >
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
import loader from "../js/loader";
export default {
  name: "ViewCertificate",
  mixins:[loader],
  props: ["id","IsBatch"],
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
    this.show_loader("Fetching...");
    var action=null
    if (this.IsBatch) {
      this.PageTitle = "View Batch";
      action = "cert_state/GetBatch";
    } else {
      this.PageTitle = "View Certificate";
      action = "cert_state/GetCertificate";
    }
    this.$store
      .dispatch(action, {id:this.id,edit:false})
      .then((res) => {
        this.template = res;
        this.Hide_loader()
      })
      .catch((err) => {
        console.log(err);
      });
    
  },
  methods:{
    goback(){
     if(this.IsBatch){
        this.$router.push('/certificates?flag=true')
     }
     else{
        this.$router.push('/certificates?flag=false')
     }
    }
  }
};
</script>