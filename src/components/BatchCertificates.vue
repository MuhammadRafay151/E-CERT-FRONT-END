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
        :items="batch_certs.list"
        :fields="fields"
      >
        <template #cell(Candidate_Name)="data">
          <p>{{ data.item.name }}</p>
        </template>
        <template #cell(Candidate_Email)="data">
          {{ data.item.email }}
        </template>
        <template #cell(issued_by)="data">
          {{ data.item.issuedby.name }}
        </template>

        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon icon="eye-fill" style="cursor: pointer;" @click="view(data.item.batch_id,data.item._id)"></b-icon>
            </div>
            <div class="col">
              <b-icon icon="pencil-fill" style="cursor: pointer;" @click="edit(data.item.batch_id,data.item._id)"></b-icon>
            </div>
            <div class="col">
              <b-icon icon="x-circle-fill" style="cursor: pointer;" @click="del(data.item.batch_id,data.item._id)"></b-icon>
            </div>
          </div>
        </template>
      </b-table>

      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="batch_certs.totalcount"
          :per-page="5"
          aria-controls="SingleCertificateData"
          v-on:input="page"
          pills
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    };
  },
  methods: {
    page(pageno) {
      console.log(pageno);
      this.show_loader("Fetching...");
      this.$store
        .dispatch("cert_state/GetBatchCerts", {
          id: this.$route.params.id,
          pageno: pageno,
        })
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(batch_id,id) {console.log(batch_id,id)},
    view(batch_id,id) {console.log(batch_id,id)},
    edit(batch_id,id) {console.log(batch_id,id)},
  },
  computed: {
    ...mapState("cert_state", ["batch_certs"]),
  },
  created() {
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetBatchCerts", {
        id: this.$route.params.id,
        pageno: 1,
      })
      .then(() => {
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>