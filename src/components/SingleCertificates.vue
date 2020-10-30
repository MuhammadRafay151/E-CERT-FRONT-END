<template>
  <div>
     
    <b-table
      id="SingleCertificateData"
      striped
      hover
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    
    >
     <template #head(issue_date)="data">
    <daterange class="d-inline"/>
        <span class="d-inline">{{ data.label }}</span>
      </template>
      <template  #head(expiry_date)="data">
       <span class="d-inline"></span>
        <span class="align-middle text-center" >{{ data.label }}</span>
      </template>
      <template #cell(status)="Status">
        <span v-if="Status.value" class="badge badge-success">Active</span>
        <span v-else class="badge badge-danger">Expire</span>
      </template>

      <template #cell(Actions)>
        <b-button variant="outline-dark" class="my-2 my-sm-0"
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
        aria-controls="SingleCertificateData"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import daterange from '../components/daterange'
export default {
  name: "SingleCertificates",
components:{
daterange
},methods:{
 
},
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "issue_date",
          sortable: true,
          class:"align-middle"
        },
        {
          key: "expiry_date",
          sortable: true,
          class:"align-middle"
        },
        {
          key: "name",
          sortable: true,
          class:"align-middle"
        },
        {
          key: "title",
          sortable: true,
          class:"align-middle"
        },
        {
          key: "status",
          sortable: true,
          class:"align-middle"
        },
        {
          key: "issued_by",
          sortable: true,
          class:"align-middle"
        },
        {
          key: "Actions",
          class:"align-middle"
        },
      ],
      items: [
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: false,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: false,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: false,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: false,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: false,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: true,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "20-oct-2020",
          expiry_date: "Life Time",
          name: "Muhammad Ismail",
          title: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)",
        },
        {
          issue_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          name: "Muhammad Rafay",
          title: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          name: "Muhammad Sabih",
          title: "graphics",
          status: false,
          issued_by: "AAmir (issuer)",
        },
        {
          issue_date: "10-feb-2020",
          expiry_date: "Life Time",
          name: "Muhammad Aamir",
          title: "Vuejs",
          status: false,
          issued_by: "smail (issuer)",
        },
        {
          issue_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          name: "Muhammad Umair",
          title: "tango",
          status: false,
          issued_by: "ismail (issuer)",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "Life Time",
          name: "Hassan Ahmeed Sidiqqi ",
          title: "mango",
          status: true,
          issued_by: "Rafay (issuer)",
        },
        {
          issue_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          name: "Abdul Rafay",
          title: "flutter",
          status: false,
          issued_by: "Sabih (Admin)",
        },
        {
          issue_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          name: "Faizan",
          title: "jango",
          status: true,
          issued_by: "Rafay (Admin)",
        },
      ],
    };
  },

  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>