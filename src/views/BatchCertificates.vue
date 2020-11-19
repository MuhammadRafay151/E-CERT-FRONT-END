<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
 
      <b-card no-body class="shadow">
        <b-card-body>
          <b-row>
            <div class="col text-center">
              <h3 class="d-inline-block">BATCH CERTIFICATES</h3>
              <b-icon font-scale="2" class="float-right" icon="plus-square-fill"></b-icon>
            </div>
          </b-row>
          <b-row class="justify-content-center">
              <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
                  <b>Batch Name:</b> WEB DEVS 2020
              </div>
           <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
             <b>Certificate Title:</b>  Full Stack Web Devlopment

           </div>
            
          </b-row>
        </b-card-body>
      </b-card>

      <div class="row mt-1 ">
        <div class="col">
          <BatchCerts />
        </div>
      </div>
   
  </div>
</template>
<script>
import BatchCerts from "../components/BatchCertificates";
export default {
  name: "BatchCertificates",
  components: {
    BatchCerts,
  },
  props: ["id"],
  data: () => {
    return {};
  },
  created() {
    console.log(this.id);
  },
};
</script>