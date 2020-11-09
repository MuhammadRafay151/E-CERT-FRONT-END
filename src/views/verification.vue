<template>
  <div class="container " style="margin-top:120px">
    <div class="row  justify-content-center">
      <div class="col-5 " v-if="!showcertificate">
        <verify v-on:myEvent="rendercert" />
      </div>
      <div class="col" v-else>
        <div class="shadow p-3">
          <h2 class="d-inline">Verified!</h2>
          <b-button class="d-inline float-right" title="Load file">
            <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
          </b-button>
        </div>
       
        <div class="row">
          <div class="col d-flex justify-content-center">
               <certificate  />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import verify from "../components/verify";
import certificate from "../components/templates/Certificate";
export default {
  name: "verification",
  data: function() {
    return {
      showcertificate: false
    };
  },
  components: {
    certificate,
    verify
  },
  methods:{
      rendercert(){
        
          this.showcertificate=true
      }
  }
};
</script>