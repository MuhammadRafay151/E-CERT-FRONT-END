<template>
  <div class="container">
    <b-modal
      no-close-on-backdrop
      id="modal-2"
      hide-footer
      centered
      title="Update User Limit"
    >
      <UserLimit
        :id="id"
        :userlimit="org.user_limit"
        :enrolled_count="users.totalcount"
        v-on:done="CloseUL"
      />
    </b-modal>
    <b-modal
      no-close-on-backdrop
      id="modal-1"
      hide-footer
      centered
      :title="users.list.length == 0 ? 'Register Admin' : 'Register Issuer'"
    >
      <UserRegisteration
        :id="id"
        v-on:done="CloseReg"
        :ULimit="org.user_limit == users.totalcount"
      />
    </b-modal>
    <div class="row shadow justify-content-between p-3">
      <div class="col d-flex">
        <b-icon
          v-if="Authorization.SuperAdmin && id"
          font-scale="1.5"
          variant="wb"
          class="align-self-center"
          icon="pencil-square"
          style="cursor: pointer"
          v-b-modal.modal-2
          id="a1"
        ></b-icon>
        <span
          class="ml-2 align-self-center text-wb"
          v-if="Authorization.SuperAdmin && !id"
        >
          User Count: {{ users.totalcount || 0 }}
        </span>
        <span v-else class="ml-2 align-self-center text-wb"
          >User Limit: {{ users.totalcount || 0 }}/{{ org.user_limit }}</span
        >
      </div>
      <div class="col">
        <h3 class="d-inline-block text-wb">Users</h3>
      </div>
      <div class="col d-flex justify-content-end">
        <b-icon
          font-scale="2"
          class="float-right"
          icon="plus-square-fill"
          style="cursor: pointer"
          v-b-modal.modal-1
          variant="wb"
          id="a1"
        ></b-icon>
        <b-tooltip target="a1" triggers="hover"> Register new user </b-tooltip>
      </div>
    </div>

    <users class="mt-5" :id="id" ref="u1" />
  </div>
</template>
<script>
import users from "./Users";
import UserRegisteration from "./Registeration";
import UserLimit from "./UserLimit";
import { mapState } from "vuex";
export default {
  name: "UserManagement",
  props: ["id"],
  components: { users, UserRegisteration, UserLimit },
  computed: {
    ...mapState("user_state", ["user", "Authorization"]),
    ...mapState("org_state", ["users"]),
    ...mapState("org_state", ["org"]),
  },
  methods: {
    RegisterUser() {},
    CloseReg() {
      this.$bvModal.hide("modal-1");
      this.$refs.u1.page();
    },
    CloseUL() {
      this.$bvModal.hide("modal-2");
    },
  },
};
</script>