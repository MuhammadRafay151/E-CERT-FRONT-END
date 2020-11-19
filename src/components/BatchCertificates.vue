<template>
  <div class="shadow p-3">
    <b-overlay :show="loading" rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>

          <p id="cancel-label">{{ loading_text }}</p>
        </div>
      </template>
      <b-table
        id="BatchDetail"
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="BatchDetail"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #head(issue_date)="data">
          <b-button class="d-inline ml-2" size="sm" variant="outline-dark" >
            <b-icon
              font-scale="2"
              icon="plus-square-fill"
            ></b-icon>
          </b-button>

          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #cell(Candidate_Name)="data">
          <p>{{ data.value }}</p>
        </template>
        <template #cell(Candidate_Email)>
          <p>asd@123.com</p>
        </template>

        <template #cell(Actions)>
          <div class="row">
            <div class="col">
              <b-icon icon="eye-fill"></b-icon>
            </div>
            <div class="col">
              <b-icon icon="pencil-fill"></b-icon>
            </div>
            <div class="col">
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
          aria-controls="BatchDetail"
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import loader from "../js/loader";
export default {
  name: "BatchCerts",
  mixins: [loader],
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "issue_date",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Candidate_Name",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Candidate_Email",
          sortable: true,
          class: "align-middle",
        },
        { key: "Issued_by", sortable: true, class: "align-middle" },
        {
          key: "Actions",
          class: "align-middle",
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