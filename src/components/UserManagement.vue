<template>
  <div class="container">
    <div class="shadow p-3">
      <h3 class="d-inline-block">Users</h3>
      <b-icon
        font-scale="2"
        class="float-right"
        icon="plus-square-fill"
        style="cursor: pointer"
        v-on:click="RegisterUser"
        id="a1"
      ></b-icon>
      <b-tooltip target="a1" triggers="hover">
        Register new user
      </b-tooltip>
    </div>
    <users class="mt-5" :id="id" />
  </div>
</template>
<script>
import users from "./Users";
export default {
  name: "UserManagement",
  props: ["id"],
  components: { users },
  methods:{
      RegisterUser(){}
  }
};
</script>