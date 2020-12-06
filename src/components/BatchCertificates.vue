<template>
  <div class="shadow p-3">
    <b-modal v-model="openedit" centered title="Edit">
      <div class="form-group">
        <label>Name</label>
        <input
          v-model.trim="$v.edit_row.name.$model"
          type="text"
          class="form-control"
          placeholder="Name"
        />
        <sub class="text-danger text-left" v-if="$v.edit_row.name.$error">
          Field is required
        </sub>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="edit_row.email"
          type="text"
          class="form-control"
          placeholder="Email"
        />
        <sub class="text-danger text-left" v-if="!$v.edit_row.email.required">
          Field is required
        </sub>
        <sub class="text-danger" v-if="!$v.edit_row.email.email">
          Not a valid email
        </sub>
      </div>
      <template #modal-footer="{ cancel }">
        <button class="btn btn_gray" @click="cancel()">Cancel</button>
        <button class="btn btn_fr" @click="SaveChanges">Save</button>
      </template>
    </b-modal>
    <deletebox ref="d1" v-on:delete="del" />
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
        id="BatchDetail"
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="batch_certs.list"
        :fields="fields"
      >
        <template #cell(issue_date)="data">
          {{ new Date(data.value).toLocaleString() }}
        </template>
        <template #cell(Candidate_Name)="data">
          <p>{{ data.item.name }}</p>
        </template>
        <template #cell(Candidate_Email)="data">
          {{ data.item.email }}
        </template>
        <template #cell(issued_by)="data">
          {{ data.item.issuedby.name }}
        </template>

        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
              <b-icon
                icon="eye-fill"
                style="cursor: pointer"
                @click="view(data.item._id, data.item.batch_id)"
              ></b-icon>
            </div>
            <div class="col">
              <b-icon
                icon="pencil-fill"
                style="cursor: pointer"
                @click="edit(data.item)"
              ></b-icon>
            </div>
            <div class="col">
              <b-icon
                icon="x-circle-fill"
                style="cursor: pointer"
                @click="
                  $refs.d1.show({
                    id: data.item._id,
                    batch_id: data.item.batch_id,
                  })
                "
              ></b-icon>
            </div>
          </div>
        </template>
      </b-table>

      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="batch_certs.totalcount"
          :per-page="5"
          aria-controls="SingleCertificateData"
          v-on:change="page"
          pills
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
import loader from "../js/loader";
import deletebox from "./delete_box";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "BatchCerts",
  mixins: [loader],
  components: { deletebox },
  data() {
    return {
      edit_row: { name: "", email: "", id: "", batch_id: "" },
      openedit: false,
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "issue_date",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Candidate_Name",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Candidate_Email",
          sortable: true,
          class: "align-middle",
        },
        { key: "Issued_by", sortable: true, class: "align-middle" },
        {
          key: "Actions",
          class: "align-middle",
        },
      ],
    };
  },
  methods: {
    page(pageno) {
      console.log(pageno);
      this.show_loader("Fetching...");
      this.$store
        .dispatch("cert_state/GetBatchCerts", {
          id: this.$route.params.id,
          pageno: pageno,
        })
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(obj) {
      this.$refs.d1.close();
      this.show_loader("Deleting...");
      this.$store
        .dispatch("cert_state/DeleteBatchCert", obj)
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          this.loading_text = err;
        });
    },
    AddHistory() {
      this.$store.commit("AddToHistory", {
        RouteName: this.$route.name,
        PageNo: this.currentPage,
        params: { id: this.$route.params.id },
      });
    },
    view(id, batch_id) {
      this.AddHistory();
      this.$router.push({
        name: "ViewCertificate",
        params: { id: id, batch_id: batch_id },
      });
    },
    edit(obj) {
      if (obj) {
        this.openedit = true;
        this.edit_row = {
          name: obj.name,
          email: obj.email,
          id: obj._id,
          batch_id: obj.batch_id,
        };
      }
    },
    SaveChanges() {
      this.openedit = false;
      this.show_loader("Updating...");
      this.$store
        .dispatch("cert_state/UpdateBatchCert", this.edit_row)
        .then(() => {
          (this.edit_row = { name: "", email: "", id: "", batch_id: "" }),
            this.Hide_loader();
        })
        .catch((err) => {
          this.loading_text = err;
        });
    },
  },
  computed: {
    ...mapState("cert_state", ["batch_certs"]),
  },
  created() {
    var PageNo = 1;
    if (this.$route.query.PageNo) {
      PageNo = this.$route.query.PageNo;
    }
    this.show_loader("Fetching...");
    this.$store
      .dispatch("cert_state/GetBatchCerts", {
        id: this.$route.params.id,
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
  validations: {
    edit_row: {
      name: { required },
      email: { required, email },
    },
  },
};
</script>