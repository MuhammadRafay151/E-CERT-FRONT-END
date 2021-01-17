<template>
  <div class="shadow p-3">
    <msgbox ref="cf" v-on:yes="publish" />
    <deletebox ref="d1" v-on:delete="del_cert" />
    <!-- <p>{{this.single_certificates}}</p> -->
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
        bordered
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="this.single_certificates.list"
        :fields="fields"
      >
        <template #head(name)="data">
          <filters
            search_label="Enter Code"
            class="d-inline"
            v-on:TextSearch="CodeSearch"
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
              <span>Edit</span>
            </div>
            <div class="col">
              <span>Delete</span>
            </div>
          </div>
        </template>
        <template #cell(issue_date)="data">
          {{ new Date(data.value).toLocaleString() }}
        </template>
        <template #cell(expiry_date)="data">
          <span v-if="data.value != ''">
            {{ new Date(data.value).toLocaleDateString() }}
          </span>
          <span v-else>Life time</span>
        </template>

        <template #cell(issuedby)="data">
          {{ data.value.issuer_name }}
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon
                icon="eye-fill"
                style="cursor: pointer"
                v-on:click="view_Certificate(data.item._id)"
                :id="data.index + 'f'"
              >
              </b-icon>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                view Certificate
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                style="cursor: pointer"
                icon="pencil-square"
                v-on:click="Edit_Certificate(data.item._id)"
                :id="data.index + 's'"
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Edit Certificate
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                icon="x-circle-fill"
                v-on:click="delete_confirm(data.item._id)"
                style="cursor: pointer"
                :id="data.index + 't'"
              ></b-icon>
              <b-tooltip :target="data.index + 't'" triggers="hover">
                Delete certificate
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
          :total-rows="this.single_certificates.totalcount"
          :per-page="5"
          aria-controls="SingleCertificateData"
          v-on:change="page"
          pills
        ></b-pagination>
      </div>
    </b-overlay>

    <!-- <div v-if="loading" class="text-center">
      <b-spinner label="Spinning"></b-spinner>
    </div> -->
  </div>
</template>

<script>
// import daterange from '../components/daterange'
import msgbox from "./confirmbox";
import deletebox from "./delete_box";
import filters from "../components/filter";
import { mapState } from "vuex";
import loader from "../js/loader";
export default {
  name: "SingleCertificates",
  mixins: [loader],

  components: {
    filters,
    deletebox,
    msgbox,
    // daterange
  },
  methods: {
    CodeSearch(value) {
      console.log(value);
    },
    DateSearch(value) {
      console.log(value);
    },
    page(pageno) {
      this.show_loader("Fetching...");
      this.$store
        .dispatch("cert_state/GetSingleCertificates", {
          pageno: pageno,
        })
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delete_confirm(id) {
      //confirmation for delete we send id and if we press yes than it will reurn id to its parent in emit event
      if (id) {
        this.$refs.d1.modalShow = true;
        this.$refs.d1.del_id = id;
      } else {
        this.$refs.d1.modalShow = false;
        this.$refs.d1.del_id = null;
      }
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

      this.$router.push({
        name: "ViewCertificate",
        params: { id: id },
      });
    },
    Edit_Certificate(id) {
      this.AddHistory();
      this.$router.push({ name: "Edit", params: { id: id, IsBatch: false } });
    },
    del_cert(id) {
      this.delete_confirm();
      this.show_loader("Deleting...");
      this.$store
        .dispatch("cert_state/Delete_Certificate", id)
        .then((res) => {
          console.log(res);
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    publish(id) {
      console.log(id);
      this.show_loader("Publishing...");
      this.$store
        .dispatch("cert_state/Publish_Certificate", id)
        .then((res) => {
          console.log(res);
          this.Hide_loader();
          if (this.single_certificates.list.length > 1) {
            this.page(this.currentPage);
          } else if (
            this.single_certificates.list.length == 1 &&
            this.currentPage == 1
          ) {
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
      var text = "Are you sure u want to publish this certificate";
      this.$refs.cf.show(text, id);
    },
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
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
          key: "issuedby",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "issue_date",
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
    ...mapState("cert_state", ["single_certificates"]),
  },
  created() {
    var PageNo = 1;
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetSingleCertificates", {
        pageno: PageNo,
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
