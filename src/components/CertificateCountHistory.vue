<template>
  <div class="shadow p-3">
    <!-- <p>{{certhistory}}</p>  -->
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
        id="CertCountData"
        white
        hover
        fixed
        responsive
        no-border-collapse
        :items="certhistory.list"
        :fields="fields"
      >
        <template #head(date)="data">
          <filters
            search_label="Enter Code"
            class="d-inline"
            v-on:TextSearch="CodeSearch"
            v-on:DateSearch="DateSearch"
          />
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #cell(date)="data">
          <p>{{ new Date(data.value).toLocaleString()}}</p>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="this.certhistory.totalcount"
          :per-page="5"
          aria-controls="CertCountData"
          v-on:input="page"
          pills
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import filters from "../components/filter";
import { mapState } from "vuex";
import loader from "../js/loader";
export default {
  name: "CertCount",
  props: ["id"],
  mixins: [loader],
  components: {
    filters,
  },
  methods: {
    CodeSearch(value) {
      console.log(value);
    },
    DateSearch(value) {
      console.log(value);
    },
    page(pageno) {
      this.loading = true;
      this.$store
        .dispatch("certcount_state/Getcounthistory", {
          id: this.id,
          pageno: pageno,
        })
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delete_count(id) {
      this.$router.push({ name: "deleteCount", params: { id: id } });
    },
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      fields: [
        {
          key: "date",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Count",
          sortable: true,
          class: "align-middle",
        },
      ],
    };
  },
  computed: {
    ...mapState("certcount_state", ["certhistory"]),
  },
  created() {
    this.show_loader("Fetching...");
    this.$store
      .dispatch("certcount_state/Getcounthistory", { id: this.id, pageno: 1 })
      .then(() => {
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
