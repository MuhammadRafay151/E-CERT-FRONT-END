<template>
  <div class="shadow p-2">
    <confirmbox
      ref="c1"
      v-on:yes="ChangeStatus"
      v-on:cancel="CancelChangeStatus"
    />
    <b-modal
      no-close-on-backdrop
      id="modal-3"
      hide-footer
      centered
      title="Update Profile"
    >
      <UserRegisteration :id="id" v-on:done="ClodeReg" :Edit="true"  />
    </b-modal>
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
        bordered
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="users.list"
        :fields="fields"
      >
        <template #cell(register_date)="data">
          <p>{{ new Date(data.value).toLocaleDateString() }}</p>
        </template>
        <template #head(Actions)>
          <p>Actions</p>
          <div class="row">
            <div class="col p-0 border-right">
              <span>Enable/<br />Disable</span>
            </div>
            <div class="col p-0">
              <span>Update<br />Profile</span>
            </div>
            <div class="col p-0">
              <span>Reset<br />Password</span>
            </div>
          </div>
        </template>
        <template #cell(roles)="data">
          <p v-for="item in data.item.roles" v-bind:key="item">{{ item }}</p>
        </template>

        <template #cell(Actions)="data">
          <div class="row">
            <div class="col" :id="data.index + 'f'">
              <b-form-checkbox
                v-model="data.item.status.active"
                @change="ConfirmChangeStatus(data.item)"
                switch
                :disabled="!id && IsDisabled(data.item.roles)"
              >
              </b-form-checkbox>
              <b-tooltip :target="data.index + 'f'" triggers="hover">
                <span v-if="data.item.status.active">Enabled</span>
                <span v-else>Disabled</span>
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                style="cursor: pointer"
                icon="pencil-square"
                :id="data.index + 's'"
                v-b-modal.modal-3
              ></b-icon>
              <b-tooltip :target="data.index + 's'" triggers="hover">
                Update user profile
              </b-tooltip>
            </div>
            <div class="col">
              <b-icon
                :id="data.index + 't'"
                icon="link45deg"
                style="cursor: pointer"
                scale="1.5"
              ></b-icon>
              <b-tooltip :target="data.index + 't'" triggers="hover">
                <span>Send reset password link on user's email address</span>
              </b-tooltip>
            </div>
          </div>
        </template>
      </b-table>
      <b-alert :show="isempty" variant="dark">Can't find any records</b-alert>
      <div class="d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="this.users.totalcount"
          :per-page="5"
          v-on:change="page"
          pills
        ></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>
<script>
import loader from "../js/loader";
import confirmbox from "../components/confirmbox";
import UserRegisteration from "./Registeration";
import { mapState } from "vuex";
import { Roles } from "../js/Roles";
import { CheckAuthorization } from "../js/Authorization";
export default {
  name: "Users",
  mixins: [loader],
  props: ["id"],
  components: {
    confirmbox,
    UserRegisteration,
  },
  data: () => {
    return {
      isempty: false,
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
          key: "roles",
          sortable: true,
          class: "align-middle",
        },
        {
          key: "Actions",
          class: "align-middle",
        },
      ],
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("org_state", ["users"]),
  },
  methods: {
    page(pageno) {
      this.show_loader("Fetching...");
      this.$store
        .dispatch("org_state/GetOrgUsers", { pageno: pageno, id: this.id })
        .then(() => {
          this.Hide_loader();
        })
        .catch((err) => {
          this.Hide_loader();
          if (err.response.status == 404) {
            this.isempty = true;
          }
          console.log(err);
        });
    },
    ConfirmChangeStatus(obj) {
      if (obj.status.active) {
        this.$refs.c1.show(`Are you sure you want to disable this user`, obj);
      } else {
        this.$refs.c1.show(`Are you sure you want to enable this user`, obj);
      }
    },
    ChangeStatus(obj) {
      this.$store
        .dispatch("user_state/ToggleUserStatus", {
          orgid: this.id,
          userid: obj._id,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
          this.CancelChangeStatus(obj);
        });
    },
    CancelChangeStatus(obj) {
      obj.status.active = !obj.status.active;
    },
    IsDisabled(UserRoles) {
      var x = CheckAuthorization(UserRoles, [Roles.SuperAdmin, Roles.Admin]);
      console.log(x);
      return x;
    },
    UpdateProfile() {
      alert();
    },
    ClodeReg() {
      this.$bvModal.hide("modal-3");
      this.page(this.currentPage);
    },
  },
  created() {
    this.$store.commit("org_state/ClearUsers");
    this.page(1);
  },
};
</script>