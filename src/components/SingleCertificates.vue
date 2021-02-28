<template>
  <div class="shadow p-3">
    <msgbox ref="cf" v-on:yes="publish" />
    <deletebox ref="d1" v-on:delete="del_cert" />
    <!-- <p>{{this.single_certificates}}</p> -->
    <!-- <div class="shadow mb-2" v-if="SQuery">
      <br />
      <h4 class="text-left ml-4">
        Search query: <span style="cursor: pointer" @click="ClearSQ"> x</span>
      </h4>
      <div class="row pb-3 pl-3 pr-3">
        <div class="col border mr-2 ml-2" v-if="SQuery.data.name">
          <strong>Candidate Name: </strong> {{ SQuery.data.name }}
        </div>
        <div class="col border mr-2 ml-2" v-if="SQuery.data.title">
          <strong>Title: </strong> {{ SQuery.data.title }}
        </div>
        <div class="col border mr-2 ml-2" v-if="SQuery.data.fromdate">
          <strong>From date: </strong> {{ SQuery.data.fromdate }}
        </div>
        <div class="col border mr-2 ml-2" v-if="SQuery.data.todate">
          <strong>To date: </strong> {{ SQuery.data.todate }}
        </div>
      </div>
    </div> -->
    <b-input-group class="mb-2" v-if="value.length > 0">
      <b-form-tags
        v-model="value"
        no-outer-focus
        no-tag-remove
        class="text-left"
      >
        <template v-slot="{ noTagRemove, tags, tagVariant }">
          <div class="d-inline-block p-2" style="font-size: 1.3rem">
            <b-form-tag
              v-for="tag in tags"
              :key="tag"
              :title="tag"
              :variant="tagVariant"
              class="mr-1"
              :no-remove="noTagRemove"
              >{{ tag }}</b-form-tag
            >
          </div>
        </template>
      </b-form-tags>
      <b-input-group-append>
        <button class="btn btn-wb btn-block" v-on="{ click: ClearSQ }">
          Clear Search
        </button>
      </b-input-group-append>
    </b-input-group>

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
          :per-page="perPage"
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
import { mapState } from "vuex";
import loader from "../js/loader";
import search_tag from "../components/Search/SearchTag";
export default {
  name: "SingleCertificates",
  mixins: [loader, search_tag],
  props: ["SearchQuery", "SortQuery"],
  components: {
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
      let payload = {
        pageno: pageno,
        sort: this.sort,
      };
      if (this.SQuery) {
        payload.query = this.SQuery.query;
      }
      this.$store
        .dispatch("cert_state/GetSingleCertificates", payload)
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
        .then(() => {
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
      perPage: 10,
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
      SQuery: null,
      sort: "dsc",
    };
  },
  watch: {
    SearchQuery: function (NewVal) {
      this.SQuery = NewVal;
      this.value = [];
      NewVal.data.name ? this.value.push("Name: " + NewVal.data.name) : null;
      NewVal.data.title ? this.value.push("title: " + NewVal.data.title) : null;
      NewVal.data.fromdate
        ? this.value.push("From date: " + NewVal.data.fromdate)
        : null;
      NewVal.data.todate
        ? this.value.push("To date: " + NewVal.data.todate)
        : null;
      this.page(1);
      this.currentPage = 1;
    },
    SortQuery: function (NewVal) {
      this.sort = NewVal;
      this.page(1);
      this.currentPage = 1;
    },
  },
  computed: {
    ...mapState("cert_state", ["single_certificates"]),
  },
  created() {
    var PageNo = 1;
    this.sort = this.SortQuery || "dsc";
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.page(PageNo);
    this.currentPage = 1;
  },
};
</script>
