<template>
  <div class="shadow p-3">
    <!-- <p>{{this.single_certificates}}</p> -->
    <b-overlay :show="loading" rounded="sm">
          <b-table
      id="SingleCertificateData"
      white
      hover
      sticky-header="500px"
      responsive
      no-border-collapse
      :items="this.single_certificates.list"
      :fields="fields"
     
    >
      <template #head(issue_date)="data">
        <filters
          search_label="Enter Code"
          class="d-inline"
          v-on:TextSearch="CodeSearch"
          v-on:DateSearch="DateSearch"
        />
        <span class="d-inline">{{ data.label }}</span>
      </template>
      <template #cell(issue_date)="data">
        <p>{{ new Date(data.value).toLocaleString() }}</p>
      </template>
      <template #cell(expiry_date)="data">
        <p v-if="data.value!=''">{{ new Date(data.value).toLocaleDateString() }}</p>
        <p v-else>Life time</p>
      </template>

      <template #cell(issuedby)="data">
        <p>{{ data.value.issuer_name }}</p>
      </template>
      <template #cell(Actions)>
        <div class="row">
          <div class="col ">
            <b-icon icon="eye-fill"> </b-icon>
          </div>
          <div class="col ">
            <b-icon icon="pencil-square"></b-icon>
          </div>
          <div class="col ">
            <b-icon icon="x-circle-fill"></b-icon>
          </div>
        </div>
      </template>
    </b-table>
     <div class="d-flex justify-content-end">
     
      <b-pagination
        v-model="currentPage"
        :total-rows=this.single_certificates.totalcount
        :per-page=5
        aria-controls="SingleCertificateData"
        v-on:input="page"
      ></b-pagination>
     
    </div>
    </b-overlay>

    <!-- <div v-if="loading" class="text-center">
      <b-spinner label="Spinning"></b-spinner>
    </div> -->
   
  </div>
</template>

<script>
// import daterange from '../components/daterange'
import filters from "../components/filter";
import { mapState } from "vuex";
export default {
  name: "SingleCertificates",
  components: {
    filters
    // daterange
  },

  methods: {
    CodeSearch(value) {
      console.log(value);
    },
    DateSearch(value) {
      console.log(value);
    },
    page(evt){
      this.loading=true
     this.$store
      .dispatch("cert_state/GetSingleCertificates",evt)
      .then(() => {
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
    },
    
  },
  data() {
    return {
      loading: true,
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "issue_date",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "expiry_date",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "name",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "title",
          sortable: true,
          class: "align-middle"
        },

        {
          key: "issuedby",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "Actions",
          class: "align-middle"
        }
      ]
    };
  },

  computed: {
    ...mapState("cert_state", ["single_certificates"])
  },
  created() {
    this.$store
      .dispatch("cert_state/GetSingleCertificates")
      .then(() => {
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>