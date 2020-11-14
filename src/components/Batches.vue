<template>
  <div class="shadow p-3">
    <b-overlay :show="loading" rounded="sm">
      <b-table
        id="BatchCertificateData"
        white
        hover
        :items="batches.list"
        :fields="fields"
      >
        <template #head(created_date)="data">
          <filters
            search_label="Enter Batch Name"
            class="d-inline"
            v-on:TextSearch="NameSearch"
            v-on:DateSearch="DateSearch"
          />
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #cell(created_date)="data">
          <p>{{ new Date(data.value).toLocaleString() }}</p>
        </template>
        <template #cell(expiry_date)="data">
          <p v-if="data.value != ''">
            {{ new Date(data.value).toLocaleDateString() }}
          </p>
          <p v-else>Life time</p>
        </template>
        <template #cell(created_by)="data">
          <p>{{ data.item.createdby.name }}</p>
        </template>
        <template #cell(Actions)>
          <div class="row">
            <div class="col"><b-icon icon="eye-fill" style="cursor: pointer"></b-icon></div>
            <div class="col"><b-icon icon="pencil-fill" style="cursor: pointer"></b-icon></div>
            <div class="col"><b-icon icon="x-circle-fill" style="cursor: pointer"></b-icon></div>
          </div>
          
          
          
        </template>
      </b-table>

      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="batches.totalcount"
          :per-page="5"
          aria-controls="BatchCertificateData"
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import filters from "../components/filter";
import { mapState } from "vuex";
export default {
  name: "Batches",
  components: {
    filters,
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      perPage: 3,
      fields: [
        {
          key: "created_date",
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
          key: "created_by",
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
    ...mapState("cert_state", ["batches"]),
  },

  methods: {
    NameSearch(value) {
      console.log(value);
    },
    DateSearch(value) {
      console.log(value);
    },
    Batchdetail(batch_id) {
      this.$emit("BatchDetail", batch_id);
    },
  },
  created() {
    this.$store
      .dispatch("cert_state/GetBatches")
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>