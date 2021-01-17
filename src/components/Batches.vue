<template>
  <div class="shadow p-3">
    <msgbox ref="cf" v-on:yes="publish" />
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
        bordered
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="batches.list"
        :fields="fields"
      >
        <template #head(batch_name)="data">
          <filters
            search_label="Enter Batch Name"
            class="d-inline"
            v-on:TextSearch="NameSearch"
            v-on:DateSearch="DateSearch"
          />
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #head(Actions)>
          <p>Actions</p>
          <div class="row">
            <div class="col border-right">
              <span class="">View</span>
            </div>
            <div class="col border-right">
              <span>Open</span>
            </div>
            <div class="col border-right">
              <span>Edit</span>
            </div>
            <div class="col border-right">
              <span>Delete</span>
            </div>
          </div>
        </template>
        <template #cell(created_date)="data">
          {{ new Date(data.value).toLocaleString() }}
        </template>
        <template #cell(expiry_date)="data">
          <span v-if="data.value != ''">
            {{ new Date(data.value).toLocaleDateString() }}
          </span>
          <span v-else>Life time</span>
        </template>
        <template #cell(created_by)="data">
          {{ data.item.createdby.name }}
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col border-right">
              <b-icon
                icon="eye-fill"
                v-on:click="ViewBatch(data.item._id)"
                style="cursor: pointer"
                :id="data.index + 'f'"
              ></b-icon>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                View
              </b-tooltip>
            </div>
            <div class="col border-right">
              <b-icon
                icon="card-list"
                style="cursor: pointer"
                v-on:click="Batchdetails(data.item._id)"
                :id="data.index + 's'"
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Open Batch
              </b-tooltip>
            </div>
            <div class="col border-right">
              <b-icon
                icon="pencil-fill"
                v-on:click="Edit_Batch(data.item._id)"
                style="cursor: pointer"
                :id="data.index + 't'"
              ></b-icon>
              <b-tooltip :target="data.index + 't'" triggers="hover">
                Edit
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                icon="x-circle-fill"
                v-on:click="delete_confirm(data.item._id)"
                style="cursor: pointer"
                :id="data.index + 'fr'"
              ></b-icon>
              <b-tooltip :target="data.index + 'fr'" triggers="hover">
                Delete
              </b-tooltip>
            </div>
          </div>
        </template>
        <template #cell(Publish)="data">
          <button class="btn btn-wb" @click="publish_confirm(data.item._id)">
            Publish
          </button>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="batches.totalcount"
          :per-page="5"
          v-on:change="page"
          aria-controls="BatchCertificateData"
          pills
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
import msgbox from "./confirmbox";
export default {
  name: "Batches",
  components: {
    filters,
    deletebox,
    msgbox,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 3,
      fields: [
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
          key: "Actions",
          class: "align-middle",
        },
        {
          key: "Publish",
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
      this.AddHistory();
      this.$router.push({ name: "BatchCerts", params: { id: id } });
    },
    AddHistory() {
      this.$store.commit("AddToHistory", {
        RouteName: this.$route.name,
        IsBatch: true,
        PageNo: this.currentPage,
      });
    },
    Edit_Batch(id) {
      this.AddHistory();
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
      this.AddHistory();
      //created date will not be visible on certificate view only issue date will be visible on certificate view so when batch certs added their will be date on certificate
      this.$router.push({
        name: "ViewCertificate",
        params: { id: id },
        query: { IsBatch: true },
      });
    },
    publish(id) {
      console.log(id);
      this.show_loader("Publishing...");
      this.$store
        .dispatch("cert_state/PublishBatch", id)
        .then((res) => {
          console.log(res);
          this.Hide_loader();
          if (this.batches.list.length > 1) {
            this.page(this.currentPage);
          } else if (this.batches.list.length == 1 && this.currentPage == 1) {
            this.page(1);
          } else {
            this.currentPage -= 1;
            this.page(this.currentPage);
          }
        })
        .catch((err) => {
          this.loading_text = err;
        });
    },
    publish_confirm(id) {
      var text = "Are you sure you want to publish this batch";
      this.$refs.cf.show(text, id);
    },
  },
  mixins: [del_logic, loader],
  created() {
    var PageNo = 1;
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetBatches", PageNo)
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