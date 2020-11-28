<template>
  <div class="shadow p-3">
    <!-- <p>{{organizations}}</p> -->
    <b-overlay :show="loading" rounded="sm">
      <b-table
        id="OrganizationData"
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="organizations.list"
        :fields="fields"
      >
        <template #head(register_date)="data">
          <filters
            search_label="Enter Code"
            class="d-inline"
            v-on:TextSearch="CodeSearch"
            v-on:DateSearch="DateSearch"
          />
          <span class="d-inline">{{ data.label }}</span>
        </template>
        <template #cell(register_date)="data">
          <p>{{ new Date(data.value).toISOString().split("T")[0] }}</p>
        </template>

        <template #cell(status)="Status">
          <span v-if="Status.value" class="badge badge-success">Active</span>
          <span v-else class="badge badge-danger">Disable</span>
        </template>

        <template #cell(Actions)="data">
          <div class="row">
            <div class="col">
                <b-icon
                  icon="eye-fill"
                  style="cursor: pointer"
                  :id="data.index + 'f'"
                >
                </b-icon>
                 <b-tooltip :target="data.index + 'f'" triggers="hover">
                View organization's certificates
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                icon="gear-fill"
                style="cursor: pointer"
                :id="data.index + 's'"
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Config
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
import filters from "../components/filter";
import { mapState } from "vuex";

export default {
  name: "Organizations",
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
        .dispatch("org_state/GetOrg", evt)
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
  },
  data() {
    return {
      loading: true,
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: "register_date",
          sortable: true,
          class: "align-middle",
        },
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
          key: "status",
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
    ...mapState("org_state", ["organizations"]),
  },
  created() {
    this.$store
      .dispatch("org_state/GetOrg")
      .then(() => {
        this.loading = false;
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