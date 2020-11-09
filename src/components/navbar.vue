<template>
  <div>
    <b-navbar
      toggleable="lg"
      class="p-4 shadow fixed-top"
      type="light"
      variant="white"
    >
      <b-navbar-brand href="#" class="ml-auto my-auto" >CERTIFIS</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
          <b-nav-item v-if="!IsLoggedIn" href="#" to="/">Home</b-nav-item>
          <b-nav-item v-if="IsLoggedIn" href="#" to="/dashboard"
            >DashBoard</b-nav-item
          >
       
          <b-nav-item v-if="IsLoggedIn" href="#" to="/create">Create</b-nav-item>
          <b-nav-item v-if="IsLoggedIn && roles.SuperAdmin" href="#" to="">Organizations</b-nav-item>
          <b-nav-item v-if="IsLoggedIn" href="#" to="/certificates">Certificates</b-nav-item>
          <b-nav-item href="#" to="/verification">Verify Certificate</b-nav-item>
          <b-nav-item href="#" to="/about">About</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav href="#" class="ml-auto">
          <b-nav-item v-if="!IsLoggedIn" href="#" to="/login">Login</b-nav-item>
          <b-nav-item-dropdown v-if="IsLoggedIn" right no-caret>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span class="mr-1">{{ user.Name }}</span
              ><img src="../assets/ssswees22.png" width="30" alt="" />
            </template>
            <b-dropdown-item href="#">Name: {{user.name}}</b-dropdown-item>
            <b-dropdown-item href="#">Email: {{user.email}}</b-dropdown-item>
             <b-dropdown-item href="#">Org: {{user.organization.name}}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="signout"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  name: "navbar",
  computed: {
    ...mapGetters("user_state", ["IsLoggedIn"]),
    ...mapState("user_state", ["user","roles"])
  },
  methods: {
    signout() {
      this.$store.dispatch("user_state/signout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
<style  scoped>

</style>