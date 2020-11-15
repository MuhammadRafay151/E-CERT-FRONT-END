<template>
  <div class="shadow p-3">
    <b-table
      id="OrganizationData"
      white
      hover
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #head(register_date)="data">
        <filters
          search_label="Enter Code"
          class="d-inline"
          v-on:TextSearch="CodeSearch"
          v-on:DateSearch="DateSearch"
        />
        <span class="d-inline">{{ data.label }}</span>
      </template>

      <template #cell(status)="Status">
        <span v-if="Status.value" class="badge badge-success">Active</span>
        <span v-else class="badge badge-danger">Disable</span>
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
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="OrganizationData"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
// import daterange from '../components/daterange'
import filters from "../components/filter";
export default {
  organization_name: "OrganizationsDetails",
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
    }
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "register_date",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "organization_name",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "certificate_issue_limit",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "status",
          sortable: true,
          class: "align-middle"
        },
        {
          key: "Actions",
          class: "align-middle"
        }
      ],
      items: [
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: false,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: false,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: false,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: false,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: false,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: true,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "20-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Ismail",
          certificate_issue_limit: "Vuejs",
          status: true,
          issued_by: "Rafay (Admin)"
        },
        {
          register_date: "30-sep-2020",
          expiry_date: "20-oct-2020",
          organization_name: "Muhammad Rafay",
          certificate_issue_limit: "All rounder",
          status: true,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "20-jan-2020",
          expiry_date: "05-feb-2020",
          organization_name: "Muhammad Sabih",
          certificate_issue_limit: "graphics",
          status: false,
          issued_by: "AAmir (issuer)"
        },
        {
          register_date: "10-feb-2020",
          expiry_date: "Life Time",
          organization_name: "Muhammad Aamir",
          certificate_issue_limit: "Vuejs",
          status: false,
          issued_by: "smail (issuer)"
        },
        {
          register_date: "05-feb-2020",
          expiry_date: "20-jan-2020",
          organization_name: "Muhammad Umair",
          certificate_issue_limit: "tango",
          status: false,
          issued_by: "ismail (issuer)"
        },
        {
          register_date: "10-oct-2020",
          expiry_date: "Life Time",
          organization_name: "Hassan Ahmeed Sidiqqi ",
          certificate_issue_limit: "mango",
          status: true,
          issued_by: "Rafay (issuer)"
        },
        {
          register_date: "20-oct-2019",
          expiry_date: "19-dec-2020",
          organization_name: "Abdul Rafay",
          certificate_issue_limit: "flutter",
          status: false,
          issued_by: "Sabih (Admin)"
        },
        {
          register_date: "30-jan-2018",
          expiry_date: "20-oct-2020",
          organization_name: "Faizan",
          certificate_issue_limit: "jango",
          status: true,
          issued_by: "Rafay (Admin)"
        }
      ]
    };
  },

  computed: {
    rows() {
      return this.items.length;
    }
  }
};
</script>