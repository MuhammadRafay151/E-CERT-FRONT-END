<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
    <b-card no-body class="shadow">
      <b-card-body>
        <b-row>
          <div class="col text-center">
            <h3 class="d-inline-block">BATCH CERTIFICATES</h3>
          </div>
        </b-row>
        <b-row class="justify-content-center">
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Batch Name:</b> WEB DEVS 2020
          </div>
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Certificate Title:</b> Full Stack Web Devlopment
          </div>
        </b-row>
         <b-row class="justify-content-center">
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Publish Date:</b> 17-08-2020
          </div>
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>PublishBy:</b> Muhammad Rafay
          </div>
        </b-row>
      </b-card-body>
    </b-card>
   
    <div class="row mt-1">
      <div class="col">
        <BatchCertsPublication />
      </div>
    </div>
  </div>
</template>
<script>
import BatchCertsPublication from "../components/BatchCertPublication";

export default {
  name: "BCP_VIEW",
  components: {
    BatchCertsPublication,
  },
  props: ["id"],
};
</script>