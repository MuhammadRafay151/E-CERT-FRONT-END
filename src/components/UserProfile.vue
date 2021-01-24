<template>
  <div class="container shadow p-5">
    <h1 class="text-secondary">Profile</h1>
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
export default {
  name: "Profile",
  computed: {
    ...mapState("user_state", ["user"]),
  },
};
</script>