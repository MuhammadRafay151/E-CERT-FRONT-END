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
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="batch_certs.list"
        :fields="fields"
      >
        <template #cell(issue_date)="data">
          {{ new Date(data.value).toLocaleString() }}
        </template>
        <template #cell(Candidate_Name)="data">
          <p>{{ data.item.name }}</p>
        </template>
        <template #cell(Candidate_Email)="data">
          {{ data.item.email }}
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon
                icon="eye-fill"
                style="cursor: pointer"
                @click="view(data.item._id, data.item.batch_id)"
                :id="data.index + 'f'"
              ></b-icon>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                Verify certificate
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                icon="envelope-fill"
                style="cursor: pointer"
                :id="data.index + 's'"
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Email certificate
              </b-tooltip>
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
          v-on:change="page"
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
  name: "BCP_Comp",
  mixins: [loader],
  props: ["id", "orgid"],
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
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
        .dispatch("cert_state/GetPublishBatchCerts", {
          id: this.id,
          orgid: this.orgid,
          pageno: pageno,
        })
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddHistory() {
      if (this.orgid) {
        this.$store.commit("AddToHistory", {
          RouteName: this.$route.name,
          PageNo: this.currentPage,
          params: { id: this.id, orgid: this.orgid },
        });
      } else {
        this.$store.commit("AddToHistory", {
          RouteName: this.$route.name,
          PageNo: this.currentPage,
          params: { id: this.id },
        });
      }
    },
    view(id, batch_id) {
      this.AddHistory();
      if (this.orgid) {
        this.$router.push({
          name: "ViewCertificate",
          params: { id: id, batch_id: batch_id, orgid: this.orgid },
        });
      } else {
        this.$router.push({
          name: "ViewCertificate",
          params: { id: id, batch_id: batch_id },
        });
      }
    },
  },
  computed: {
    ...mapState("cert_state", ["batch_certs"]),
  },
  created() {
    var PageNo = 1;
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetPublishBatchCerts", {
        id: this.id,
        orgid: this.orgid,
        pageno: 1,
      })
      .then(() => {
        this.currentPage = PageNo;
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>