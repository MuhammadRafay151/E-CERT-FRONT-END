<template>
  <div class="shadow p-3">
    <deletebox ref="d1" v-on:delete="del_batch" />
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
        id="BatchCertificateData"
        white
        hover
        sticky-header=500px
        responsive
        no-border-collapse
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
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col border-right">
              <b-icon
                icon="eye-fill"
                v-on:click="ViewBatch(data.item._id)"
                style="cursor: pointer"
              ></b-icon>
            </div>
            <div class="col border-right">
              <b-icon icon="card-list" style="cursor: pointer" v-on:click="Batchdetails(data.item._id)"></b-icon>
            </div>
            <div class="col border-right">
              <b-icon
                icon="pencil-fill"
                v-on:click="Edit_Batch(data.item._id)"
                style="cursor: pointer"
              ></b-icon>
            </div>
            <div class="col">
              <b-icon
                icon="x-circle-fill"
                v-on:click="delete_confirm(data.item._id)"
                style="cursor: pointer"
              ></b-icon>
            </div>
          </div>
        </template>
      </b-table>

      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="batches.totalcount"
          :per-page="5"
          v-on:input="page"
          aria-controls="BatchCertificateData"
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import filters from "../components/filter";
import { mapState } from "vuex";
import deletebox from "./delete_box";
import del_logic from "../js/delete";
import loader from "../js/loader";
export default {
  name: "Batches",
  components: {
    filters,
    deletebox,
  },
  data() {
    return {
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
    Batchdetails(id) {
        this.$router.push({ name: "BatchCerts", params: { id: id} });
    },
    Edit_Batch(id) {
      this.$router.push({ name: "Edit", params: { id: id, IsBatch: true } });
    },
    del_batch(id) {
      this.delete_confirm();
      this.show_loader("Deleting...");
      this.$store
        .dispatch("cert_state/DelelteBatch", id)
        .then((res) => {
          console.log(res);
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    page(pageno) {
      this.show_loader("Fetching...");
      this.$store
        .dispatch("cert_state/GetBatches", pageno)
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ViewBatch(id) {
      //setting back track for backward navigation
      this.$store.commit("cert_state/SetBackTrack", {
        isbatch: true,
        pageno: this.currentPage,
      });
      //created date will not be visible on certificate view only issue date will be visible on certificate view so when batch certs added their will be date on certificate

      this.$router.push({
        name: "ViewCertificate",
        params: { id: id, IsBatch: true },
      });
    },
  },
  mixins: [del_logic, loader],
  created() {
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetBatches")
      .then(() => {
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>