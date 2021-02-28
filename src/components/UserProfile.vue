<template>
  <div class="container shadow p-5">
    <b-modal
      id="modal-1"
      title="Change Password"
      hide-footer
      no-close-on-backdrop
      centered
    >
      <Password v-on:done="close" />
    </b-modal>
    <div class="row justify-content-between">
      <div class="col"></div>
      <div class="col">
        <h1 class="text-secondary">Profile</h1>
      </div>
      <div class="col d-flex align-self-center justify-content-end">
        <b-dropdown
          size="lg"
          variant="white"
          toggle-class="text-decoration-none"
          no-caret
          right
          v-if="Authorization.SuperAdmin || Authorization.Admin"
        >
          <template #button-content>
            <b-icon
              icon="three-dots-vertical"
              aria-hidden="true"
              style="cursor: pointer"
            ></b-icon>
          </template>
          <b-dropdown-item href="#" v-b-modal.modal-1
            >Change Password</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div>
    <hr />
    <div class="row mt-3 justify-content-center">
      <div class="col-6 shadow p-3 mr-2">
        <strong class="border-right mr-2">Name </strong> {{ user.name }}
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-6 shadow p-3">
        <strong class="border-right mr-2">Email </strong> {{ user.email }}
      </div>
    </div>
    <div v-if="user.organization" class="row mt-3 justify-content-center">
      <div class="col-6 shadow p-3 mr-2">
        <strong class="border-right mr-2">Organization Name </strong>
        {{ user.organization.name }}
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-6 shadow p-3">
        <strong class="border-right mr-2">Roles </strong
        ><span v-for="(i, index) in user.roles" :key="index"
          >{{ i }}{{ user.roles.length - 1 != index ? "," : "" }}
        </span>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-6 shadow p-3 mr-2">
        <strong class="border-right mr-2">Address </strong
        ><span v-if="user.address">{{ user.address }}</span
        ><span v-else>Not updated</span>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-6 shadow p-3">
        <strong class="border-right mr-2">Contact </strong>
        <span v-if="user.phone"
          >+ {{ user.country_code + " " + user.phone }}</span
        >
        <span v-else>Not Updated</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Password from "./Password.vue";
export default {
  components: { Password },
  name: "Profile",
  computed: {
    ...mapState("user_state", ["user", "Authorization"]),
  },
  methods: {
    close() {
      this.$bvModal.hide("modal-1");
    },
  },
};
</script>