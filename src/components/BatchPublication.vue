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
        :items="this.batches.list"
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
          <p v-else>Life time</p>
        </template>
        <template #cell(publish_by)="data">
         {{ data.item.publish.publisher_name }}
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon
                icon="card-list"
                style="cursor: pointer"
                :id="data.index + 'f'"
                v-on:click="Batchdetails(data.item._id)"
              ></b-icon>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                View batch detail
              </b-tooltip>
            </div>
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="this.batches.totalcount"
          :per-page="5"
          v-on:input="page"
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
  name: "BatchPublication",
  mixins: [loader],
  components: { filters },
  computed: { ...mapState("cert_state", ["batches"]) },
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
          key: "batch_name",
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
        .dispatch("cert_state/GetPublishBatches", pageno)
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Batchdetails(id) {
      this.$router.push({ name: "BCP_VIEW", params: { id: id } });
    },
    CodeSearch() {},
    DateSearch() {},
  },
  created() {
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetPublishBatches")
      .then(() => {
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>