<template>
  <div class="shadow p-3">
    <b-table
      id="BatchCertificateData"
      white
      hover
      :items="BatchesInfo"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      
    >
     <template #head(Creation_Date)="data">

    <filters search_label="Enter Batch Name" class="d-inline" v-on:TextSearch="NameSearch"  v-on:DateSearch="DateSearch"/>
        <span class="d-inline">{{ data.label }}</span>
      </template>
      <template #cell(Status)="status">
        <span v-if="status.value" class="badge badge-success">Active</span>
        <span v-else class="badge badge-danger">Expire</span>
      </template>

      <template #cell(Actions)>
        <b-button variant="outline-dark" class="my-2 my-sm-0" v-on:click="View"
          ><b-icon icon="eye"></b-icon></b-button
        ><b-button variant="outline-dark" class="my-2 my-sm-0"
          ><b-icon icon="pencil"></b-icon></b-button
        ><b-button variant="outline-dark" class="my-2 my-sm-0"
          ><b-icon icon="x-circle"></b-icon
        ></b-button>
      </template>
    </b-table>

    <div class="d-flex justify-content-end">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="BatchCertificateData"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import filters from '../components/filter'
export default {
  name: "BatchCertificates",
components:{
  filters
},
  data() {
    return {
      currentPage: 1,
      perPage: 3,
      fields: [
        {
          key: "Creation_Date",
          sortable: true,
           class:"align-middle"
        },
        {
          key: "Expiry_Date",
          sortable: true,
           class:"align-middle"
        },
        {
          key: "Batch_Name",
          sortable: true,
           class:"align-middle"
        },
        {
          key: "Certification",
          sortable: true,
           class:"align-middle"
        },
        {
          key: "Status",
          sortable: true,
           class:"align-middle"
        },
        {
          key: "Created_By",
          sortable: true,
           class:"align-middle"
        },
        {
          key: "Actions",
           class:"align-middle"
        },
      ],
      BatchesInfo: [
        {
          Creation_Date: "20-oct-2020",
          Expiry_Date: "20-dec-2021",
          Batch_Name: "17B",
          Certification: "Vuejs",
          Status: true,
          Created_By: "Rafay (Admin)",
        },
        {
          Creation_Date: "20-sep-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "18B",
          Certification: "newjs",
          Status: false,
          Created_By: "sabih (Admin)",
        },
        {
          Creation_Date: "20-feb-2019",
          Expiry_Date: "20-dec-2019",
          Batch_Name: "16B",
          Certification: "jango",
          Status: true,
          Created_By: "AAMIR (issuer)",
        },
        {
          Creation_Date: "20-oct-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "17B",
          Certification: "Vuejs",
          Status: true,
          Created_By: "Rafay (Admin)",
        },
        {
          Creation_Date: "20-sep-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "18B",
          Certification: "newjs",
          Status: false,
          Created_By: "sabih (Admin)",
        },
        {
          Creation_Date: "20-feb-2019",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "16B",
          Certification: "jango",
          Status: true,
          Created_By: "AAMIR (issuer)",
        },
        {
          Creation_Date: "20-oct-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "17B",
          Certification: "Vuejs",
          Status: true,
          Created_By: "Rafay (Admin)",
        },
        {
          Creation_Date: "20-sep-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "18B",
          Certification: "newjs",
          Status: false,
          Created_By: "sabih (Admin)",
        },
        {
          Creation_Date: "20-feb-2019",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "16B",
          Certification: "jango",
          Status: true,
          Created_By: "AAMIR (issuer)",
        },
        {
          Creation_Date: "20-oct-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "17B",
          Certification: "Vuejs",
          Status: true,
          Created_By: "Rafay (Admin)",
        },
        {
          Creation_Date: "20-sep-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "18B",
          Certification: "newjs",
          Status: false,
          Created_By: "sabih (Admin)",
        },
        {
          Creation_Date: "20-feb-2019",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "16B",
          Certification: "jango",
          Status: true,
          Created_By: "AAMIR (issuer)",
        },
        {
          Creation_Date: "20-oct-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "17B",
          Certification: "Vuejs",
          Status: true,
          Created_By: "Rafay (Admin)",
        },
        {
          Creation_Date: "20-sep-2020",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "18B",
          Certification: "newjs",
          Status: false,
          Created_By: "sabih (Admin)",
        },
        {
          Creation_Date: "20-feb-2019",
          Expiry_Date: "20-dec-2020",
          Batch_Name: "16B",
          Certification: "jango",
          Status: true,
          Created_By: "AAMIR (issuer)",
        },
      ],
    };
  },

  computed: {
    rows() {
      return this.BatchesInfo.length;
    },
  },
  
  methods: {
     NameSearch(value) {
      console.log(value);
    },
    DateSearch(value) {
      console.log(value);
    },
    View() {
      this.$emit("BatchDetail");
    },
  },
};
</script>