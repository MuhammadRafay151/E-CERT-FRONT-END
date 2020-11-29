<template>
  <div class="shadow p-3">
  
    <!-- <p>{{certhistory}}</p>  -->
    <b-overlay :show="loading" rounded="sm">
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
          <p>{{ new Date(data.value).toISOString().split('T')[0] }}</p>
        </template>


        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <a
                href="#"
                class="text-dark"
                v-on:click="delete_count(data.item._id)"
              >
                <b-icon icon="x-circle-fill"> </b-icon>
              </a>
            </div>
          </div>
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

export default {
  name: "CertCount",
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
    page(evt) {
      this.loading = true;
      this.$store
        .dispatch("certcount_state/Getcounthistory", evt)
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
      perPage: 3,
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
        {
          key: "Actions",
          class: "align-middle",
        },
      ],
    };
  },

  computed: {
    ...mapState("certcount_state", ["certhistory"]),
  },
  created() {
    this.$store
      .dispatch("certcount_state/Getcounthistory")
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
