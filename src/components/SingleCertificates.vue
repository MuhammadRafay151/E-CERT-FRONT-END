<template>
  <div class="shadow p-3">
    <deletebox ref="d1" v-on:delete="del_cert" />
    <!-- <p>{{this.single_certificates}}</p> -->
    <b-overlay :show="loading" rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>

          <p id="cancel-label">{{ processing_text }}</p>
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
        <template #head(issue_date)="data">
          <filters
            search_label="Enter Code"
            class="d-inline"
            v-on:TextSearch="CodeSearch"
            v-on:DateSearch="DateSearch"
          />
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #cell(issue_date)="data">
          <p>{{ new Date(data.value).toLocaleString() }}</p>
        </template>
        <template #cell(expiry_date)="data">
          <p v-if="data.value != ''">
            {{ new Date(data.value).toLocaleDateString() }}
          </p>
          <p v-else>Life time</p>
        </template>

        <template #cell(issuedby)="data">
          <p>{{ data.value.issuer_name }}</p>
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon
                icon="eye-fill"
                style="cursor: pointer"
                v-on:click="view_Certificate(data.item._id)"
              >
              </b-icon>
            </div>
            <div class="col">
              <b-icon
                style="cursor: pointer"
                icon="pencil-square"
                v-on:click="Edit_Certificate(data.item._id)"
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
          :total-rows="this.single_certificates.totalcount"
          :per-page="5"
          aria-controls="SingleCertificateData"
          v-on:input="page"
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
import deletebox from "./delete_box";
import filters from "../components/filter";
import { mapState } from "vuex";

export default {
  name: "SingleCertificates",
  components: {
    filters,
    deletebox,
    // daterange
  },

  methods: {
    CodeSearch(value) {
      console.log(value);
    },
    DateSearch(value) {
      console.log(value);
    },
    page(evt) {
    this.show_loader("Fetching...")
      this.$store
        .dispatch("cert_state/GetSingleCertificates", evt)
        .then(() => {
        this.Hide_loader()
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
    view_Certificate(id) {
      this.$router.push({ name: "ViewCertificate", params: { id: id } });
    },
    Edit_Certificate(id) {
      this.$router.push({ name: "Edit", params: { id: id, IsBatch: false } });
    },
    show_loader(text) {
      this.processing_text = text;
      this.loading = true;
    },
    Hide_loader() {
      this.loading = false;
    },
    del_cert(id) {
      this.delete_confirm();
      this.show_loader("Deleting...");
      this.$store
        .dispatch("cert_state/Delete_Certificate", id)
        .then((res) => {
          console.log(res);
          this.Hide_loader()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      processing_text: null,
      loading: false,
      perPage: 3,
      currentPage: 1,
      fields: [
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
          key: "Actions",
          class: "align-middle",
        },
      ],
    };
  },
  computed: {
    ...mapState("cert_state", ["single_certificates"]),
  },
  created() {
    this.show_loader("Fetching...")
    this.$store
      .dispatch("cert_state/GetSingleCertificates")
      .then(() => {
        this.Hide_loader()
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style >
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background: linear-gradient(60deg, #26c6da, #0097a7);
  border-color: #ffffff;
}
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: black;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
.page-link:focus {
  z-index: 3;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 195, 255, 0.226);
}
</style>