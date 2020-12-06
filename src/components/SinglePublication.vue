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
        id="SingleCertificateData"
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="this.single_certificates.list"
        :fields="fields"
      >
        <template #head(publish_date)="data">
          <filters
            search_label="Enter Code"
            class="d-inline"
            v-on:TextSearch="CodeSearch"
            v-on:DateSearch="DateSearch"
          />
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #cell(publish_date)="data">
          {{ new Date(data.item.publish.publish_date).toLocaleDateString() }}
        </template>
        <template #cell(expiry_date)="data">
          <span v-if="data.value != ''">
            {{ new Date(data.value).toLocaleDateString() }}
          </span>
          <span v-else>Life time</span>
        </template>
        <template #cell(publish_by)="data">
          {{ data.item.publish.publisher_name }}
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon
                icon="eye-fill"
                style="cursor: pointer"
                :id="data.index + 'f'"
                v-on:click="view_Certificate(data.item._id)"
              >
              </b-icon>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                View
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                icon="envelope-fill"
                v-on:click="email(data.item._id)"
                style="cursor: pointer"
                :id="data.index + 's'"
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Email Certificate
              </b-tooltip>
            </div>
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="this.single_certificates.totalcount"
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
import loader from "../js/loader";
import filters from "../components/filter";
import { mapState } from "vuex";
export default {
  name: "SinglePublication",
  mixins: [loader],
  components: { filters },
  computed: { ...mapState("cert_state", ["single_certificates"]) },
  data: () => {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "publish_date",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "expiry_date",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "name",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "title",
          sortable: true,
          class: "align-middle",
        },

        {
          key: "publish_by",
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
      this.show_loader("Fetching...");
      this.$store
        .dispatch("cert_state/GetPublishCertificates", pageno)
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddHistory() {
      this.$store.commit("AddToHistory", {
        RouteName: this.$route.name,
        IsBatch: false,
        PageNo: this.currentPage,
      });
    },
    view_Certificate(id) {
      this.AddHistory();
      this.$router.push({ name: "ViewCertificate", params: { id: id } });
    },
    email(id) {
      console.log(id);
    },
    CodeSearch() {},
    DateSearch() {},
  },
  created() {
    this.show_loader("Fetching...");
    var PageNo = 1;
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.$store
      .dispatch("cert_state/GetPublishCertificates", PageNo)
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