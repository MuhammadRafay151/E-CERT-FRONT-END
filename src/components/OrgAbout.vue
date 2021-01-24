<template>
  <div class="container">
    <div class="row">
      <div class="col m-1 p-3 shadow">
        <strong>Name</strong>: {{ org.name }}
      </div>
      <div class="col m-1 p-3 shadow">
        <strong>Email:</strong> {{ org.email }}
      </div>
    </div>
    <div class="row">
      <div class="col m-1 p-3 shadow">
        <strong>Phone</strong>:
        <span v-if="org.phone">+{{ org.country_code }} {{ org.phone }}</span>
        <span v-else> Empty</span>
      </div>
      <div class="col m-1 p-3 shadow">
        <strong>Adddress: </strong>
        <span v-if="org.address">{{ org.address }}</span>
        <span v-else>Empty</span>
      </div>
    </div>
    <div class="row">
      <div class="col m-1 p-3 shadow">
        <strong>User Limit</strong>: {{ org.user_limit }}
      </div>
      <div class="col m-1 p-3 shadow">
        <strong>Ecert Count</strong>: {{ org.ecertcount }}
      </div>
    </div>
    <div class="row">
      <div class="col m-1 p-3 shadow">
        <strong>Registeration Date:</strong>
        {{ new Date(org.register_date).toLocaleDateString() }}
      </div>
      <div class="col m-1 p-3 shadow">
        <strong>Status: </strong>
        <b-badge :variant="org.status.active ? 'success' : 'danger'">{{
          org.status.active ? "Active" : "Disbaled"
        }}</b-badge>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "OrgAbout",
  computed: {
    ...mapState("org_state", ["org"]),
  },
  data: () => {
    return {
      fields: [
        "name",
        "email",
        "phone",
        "address",
        "user_limit",
        "ecertcount",
        "status",
        "register_date",
      ],
    };
  },
};
</script>