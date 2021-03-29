<template>
  <div class="shadow p-3">
    <confirmbox
      ref="c1"
      v-on:yes="ChangeStatus"
      v-on:cancel="CancelChangeStatus"
    />
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
        id="OrganizationData"
        bordered
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="organizations.list"
        :fields="fields"
      >
        <template #head(name)="data">
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #head(Actions)>
          <p>Actions</p>
          <div class="row">
            <div class="col p-0 border-right">
              <span>View<br />Publications</span>
            </div>
            <div class="col p-0 border-right">
              <span>Setting</span>
            </div>
            <div class="col p-0 border-right">
              <span>Enable/<br />Disable</span>
            </div>
          </div>
        </template>
        <template #cell(register_date)="data">
          <p>{{ new Date(data.value).toLocaleDateString() }}</p>
        </template>
        <template #cell(Actions)="data">
          <div class="row">
            <div class="col p-0">
              <b-icon
                icon="eye-fill"
                style="cursor: pointer"
                :id="data.index + 'f'"
                v-on:click="ViewCertificate(data.item._id)"
              >
              </b-icon>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                View organization's certificates
              </b-tooltip>
            </div>
            <div class="col p-0">
              <b-icon
                icon="gear-fill"
                style="cursor: pointer"
                :id="data.index + 's'"
                v-on:click="config(data.item._id)"
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Setting
              </b-tooltip>
            </div>
            <div class="col p-0" :id="data.index + 't'">
              <b-form-checkbox
                v-model="data.item.status.active"
                @change="ConfirmChangeStatus(data.item)"
                switch
              >
              </b-form-checkbox>
              <b-tooltip :target="data.index + 't'" triggers="hover">
                <span v-if="data.item.status.active">Enabled</span>
                <span v-else>Disabled</span>
              </b-tooltip>
            </div>
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="this.organizations.totalcount"
          :per-page="5"
          aria-controls="OrganizationData"
          v-on:input="page"
          pills
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
import loader from "../js/loader";
import confirmbox from "../components/confirmbox";
export default {
  name: "Organizations",
  mixins: [loader],
  components: {
    confirmbox,
  },
  methods: {
    CodeSearch(value) {
      console.log(value);
    },
    Send_OrgID(id) {
      this.$router.push({ name: "CertificateCount", params: { id: id } });
    },
    updatecert(id) {
      this.$store.commit("certcount/getorg_id", id);
    },
    DateSearch(value) {
      console.log(value);
    },
    page(evt) {
      this.loading = true;
      this.$store
        .dispatch("org_state/GetOrgs", evt)
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    view_Org(id) {
      this.$router.push({ name: "ViewOrg", params: { id: id } });
    },
    Edit_Org(id) {
      this.$router.push({ name: "ViewOrg", params: { id: id } });
    },
    config(id) {
      this.$router.push("/organization/config/" + id);
    },
    ConfirmChangeStatus(obj) {
      if (obj.status.active) {
        this.$refs.c1.show(
          `Are you sure you want to disable this organization`,
          obj
        );
      } else {
        this.$refs.c1.show(
          `Are you sure you want to enable this organization`,
          obj
        );
      }
    },
    ChangeStatus(obj) {
      this.$store
        .dispatch("org_state/ToggleOrgStatus", obj._id)
        .then(() => {})
        .catch((err) => {
          console.log(err);
          this.CancelChangeStatus(obj);
        });
    },
    CancelChangeStatus(obj) {
      obj.status.active = !obj.status.active;
    },
    ViewCertificate(id) {
      this.$router.push("/organization/publications/" + id);
    },
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      fields: [
        {
          key: "name",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "email",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "ecertcount",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "register_date",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Actions",
          class: "align-middle",
        },
      ],
      status: [],
    };
  },
  computed: {
    ...mapState("org_state", ["organizations"]),
  },
  created() {
    this.show_loader("Fetching...");
    this.$store
      .dispatch("org_state/GetOrgs")
      .then(() => {
        this.Hide_loader();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style >
/* Pagination css */
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background: #000d0d;
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
  box-shadow: 0 0 0 0.2rem rgba(85, 85, 85, 0.226);
}

/* switch css */
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #bfbfbf;
  background-color: #000d0d;
}
.custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.2rem rgba(100, 100, 100, 0.25);
}
.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
  border-color: #868686;
}
.custom-control-input[disabled] ~ .custom-control-label::before,
.custom-control-input:disabled ~ .custom-control-label::before {
  background-color: #e9ecef !important;
}
/* text box style */
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(34 225 255 / 24%);
}
</style>
