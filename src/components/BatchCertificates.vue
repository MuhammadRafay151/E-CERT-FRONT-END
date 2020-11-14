<template>
  <div>
    <b-table
      id="BatchDetail"
      striped
      hover
      :items="BatchDetail"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
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
          ><b-icon icon="envelope"></b-icon></b-button
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
        aria-controls="BatchDetail"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatchInformation",

  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "issue_date",
          sortable: true,
        },
        {
          key: "expiry_date",
          sortable: true,
        },
        {
          key: "Candidate_Name",
          sortable: true,
        },
        {
          key: "Certification",
          sortable: true,
        },
        {
          key: "Status",
          sortable: true,
        },
        {
          key: "Issued_by",
          sortable: true,
        },
        {
          key: "Actions",
        },
      ],
      BatchDetail: [
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        {
          issue_date: "10-oct-2020",
          expiry_date: "10-dec-2020",
          Candidate_Name: "Ismail",
          Certification: "Vuejs",
          Status: "true",
          Issued_by: "Ismail",
        },
        1,
      ],
    };
  },

  computed: {
    rows() {
      return this.BatchDetail.length;
    },
  },
};
</script>