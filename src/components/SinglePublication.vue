<template>
  <div class="shadow p-3">
    <confirmbox ref="c1" v-on:yes="email" />
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
        white
        hover
        bordered
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
              <span>Email</span>
            </div>
          </div>
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
                v-on:click="confirm_email(data.item)"
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
          :per-page="perPage"
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
import { mapState } from "vuex";
import search_tag from "../components/Search/SearchTag";
import Confirmbox from "./confirmbox.vue";
import GlobalNotification from "../js/GlobalNotification";
export default {
  name: "SinglePublication",
  mixins: [loader, search_tag, GlobalNotification],
  props: ["id", "SearchQuery", "SortQuery"],
  //id is passed for viweing anpther org certificates if id not passed it will by default show current org data
  components: {
    Confirmbox,
  },
  computed: { ...mapState("cert_state", ["single_certificates"]) },
  data: () => {
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
          key: "publish_by",
          sortable: true,
          class: "align-middle",
        },
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
          key: "Actions",
          class: "align-middle",
        },
      ],
      SQuery: null,
      sort: "dsc",
    };
  },
  methods: {
    page(pageno) {
      this.show_loader("Fetching...");
      let payload = {
        pageno: pageno,
        sort: this.sort,
        id: this.id,
      };
      if (this.SQuery) {
        payload.query = this.SQuery.query;
      }
      this.$store
        .dispatch("cert_state/GetPublishCertificates", payload)
        .then(() => {
          this.Hide_loader();
          this.currentPage=pageno
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddHistory() {
      if (this.id) {
        this.$store.commit("AddToHistory", {
          RouteName: this.$route.name,
          IsBatch: false,
          params: { id: this.id },
          PageNo: this.currentPage,
        });
      } else {
        this.$store.commit("AddToHistory", {
          RouteName: this.$route.name,
          IsBatch: false,
          PageNo: this.currentPage,
        });
      }
    },
    view_Certificate(id) {
      this.AddHistory();
      if (this.id) {
        this.$router.push({
          name: "vieworgcertificate",
          params: { id: id, orgid: this.id },
        });
      } else {
        this.$router.push({
          name: "ViewCertificate",
          params: { id: id },
        });
      }
    },
    confirm_email(obj) {
      this.$refs.c1.show(
        `Are you sure you want to email this certificate to ${obj.email}?`,
        obj
      );
    },
    email(obj) {
      this.$store
        .dispatch("cert_state/EmailSingleCert", obj._id)
        .then(() => {
           this.GlobalNotify(`Email has been sended successfully to ${obj.email}`)
        })
        .catch(() => {
          this.GlobalNotify(`Error occurs while sending email to ${obj.email}`)
        });
    },
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
  created() {
    this.show_loader("Fetching...");
    let PageNo = 1;
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.page(PageNo);
  },
};
</script>