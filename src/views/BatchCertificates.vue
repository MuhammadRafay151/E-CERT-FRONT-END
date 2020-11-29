<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
    <cbox ref="cf" v-on:yes="close_Add(false)" />
    <b-card no-body class="shadow">
      <b-card-body>
        <b-row>
          <div class="col text-center">
            <b-icon
            class="float-left"
            style="cursor: pointer"
            icon="arrow-left-circle"
            v-on:click="goback"
            font-scale="2"
          ></b-icon>
            <h3 class="d-inline-block">BATCH CERTIFICATES</h3>
            <b-icon
              v-if="!Add"
              font-scale="2"
              class="float-right"
              icon="plus-square-fill"
              style="cursor: pointer"
              v-on:click="Display_Add"
            ></b-icon>
            <b-icon
              v-else
              font-scale="2"
              class="float-right"
              icon="x-circle-fill"
              style="cursor: pointer"
              v-on:click="close_Add(true)"
            ></b-icon>
          </div>
        </b-row>
        <b-row class="justify-content-center" v-if="batch_certs.batch">
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Batch Name:</b> {{batch_certs.batch.batch_name}}
          </div>
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Certificate Title:</b> {{batch_certs.batch.title}}
          </div>
        </b-row>
         <b-row class="justify-content-center" v-if="batch_certs.batch">
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Created Date:</b> {{new Date(batch_certs.batch.created_date).toLocaleDateString()}}
          </div>
          <div class="col-12 col-lg-5 shadow m-2 p-2 text-center">
            <b>Created By:</b> {{batch_certs.batch.createdby.name}}
          </div>
        </b-row>
      </b-card-body>
    </b-card>
    <AddBatchCerts v-if="Add" />
    <div v-else class="row mt-1">
      <div class="col">
        <BatchCerts />
      </div>
    </div>
  </div>
</template>
<script>
import BatchCerts from "../components/BatchCertificates";
import AddBatchCerts from "../components/AddBatchCert";
import cbox from "../components/confirmbox";
import { mapState } from "vuex";
import history from '../js/History'
export default {
  name: "BatchCertificates",
  props: ["id"],
  mixins:[history],
  components: {
    BatchCerts,
    AddBatchCerts,
    cbox,
  },
  computed: {
    ...mapState("cert_state", ["batch_certs"]),
  },
  data: () => {
    return {
      Add: false,
      select_variant: false,
    };
  },
  methods: {
    Display_Add() {
      this.Add = true;
    },
    close_Add(confirm) {
      if (confirm)
        this.$refs.cf.show("Are you sure you want to close this window?");
      else this.Add=false
    },
  },
  
};
</script>