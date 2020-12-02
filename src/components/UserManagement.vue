<template>
  <div class="container">
    <b-modal
      no-close-on-backdrop
      id="modal-1"
      hide-footer
      centered
      :title="users.list.length == 0 ? 'Register Admin' : 'Register Issuer'"
    >
      <UserRegisteration :id="id" v-on:done="CloseReg" />
    </b-modal>
    <div class="row shadow justify-content-between p-3">
      <div class="col d-flex align-self-center">
        <span class="float-left">User Limit:5</span>
      </div>
      <div class="col">
        <h3 class="d-inline-block">Users</h3>
      </div>
      <div class="col d-flex justify-content-end">
        <b-icon
          font-scale="2"
          class="float-right"
          icon="plus-square-fill"
          style="cursor: pointer"
          v-b-modal.modal-1
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
import { mapState } from "vuex";
export default {
  name: "UserManagement",
  props: ["id"],
  components: { users, UserRegisteration },
  computed: {
    ...mapState("org_state", ["users"]),
  },
  methods: {
    RegisterUser() {},
    CloseReg() {
      this.$bvModal.hide("modal-1");
      this.$refs.u1.page(1);
    },
  },
};
</script>