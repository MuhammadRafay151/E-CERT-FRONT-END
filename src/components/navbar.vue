<template>
  <div>
    <b-navbar toggleable="lg" class="p-2 shadow fixed-top dark" type="dark">
      <b-navbar-brand href="#">
        <img
          width="200"
          src="/logo/Certifis Logo Final-01.png"
          class="d-inline-block align-top"
          alt="Kitten"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="!IsLoggedIn" href="#" to="/">Home</b-nav-item>
          <b-nav-item v-if="IsLoggedIn" href="#" to="/dashboard"
            >DashBoard</b-nav-item
          >

          <b-nav-item
            v-if="IsLoggedIn && !Authorization.SuperAdmin"
            href="#"
            to="/create"
            >Create</b-nav-item
          >
          <b-nav-item
            v-if="IsLoggedIn && Authorization.SuperAdmin"
            to="/organizations"
            >Organizations</b-nav-item
          >
          <b-nav-item
            v-if="IsLoggedIn && !Authorization.SuperAdmin"
            href="#"
            to="/certificates"
            >Certificates</b-nav-item
          >
          <b-nav-item
            v-if="IsLoggedIn && !Authorization.SuperAdmin"
            href="#"
            to="/publications"
            >Publications</b-nav-item
          >
          <b-nav-item href="#" to="/verification"
            >Verify Certificate</b-nav-item
          >
          <b-nav-item href="#" to="/about">About</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav href="#" class="ml-auto">
          <b-nav-item v-if="!IsLoggedIn" href="#" to="/login">Login</b-nav-item>
          <b-avatar
            :badge="NewCount > 0 ? NewCount.toString() : false"
            variant="white"
            badge-variant="danger"
            button
            @click="OpenNotification"
            v-if="IsLoggedIn && !Authorization.SuperAdmin"
          >
            <template #default
              ><b-icon icon="bell-fill" variant="white"></b-icon
            ></template>
          </b-avatar>
          <notification
            v-if="ShowNotifications"
            v-on-clickaway="HideNotification"
          />
          <b-nav-item-dropdown v-if="IsLoggedIn" right no-caret>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span class="mr-1">{{ user.Name }}</span
              ><img src="../assets/ssswees22.png" width="30" alt="" />
            </template>
            <template #default>
              <div class="dp">
                <b-dropdown-item href="#">
                  <div class="d-flex justify-content-center">
                    <b-avatar
                      variant="primary"
                      :text="AvatarName"
                      size="6rem"
                    ></b-avatar>
                  </div>
                  <div>
                    <p class="mt-2 text-center">{{ user.name }}</p>
                    <p class="text-center">{{ user.email }}</p>
                  </div>
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item v-if="user.organization" href="#">
                  <div class="d-flex justify-content-center">
                    <div class="align-items-center">
                      {{ user.organization.name }}
                    </div>
                  </div>
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item to="/userprofile">
                  <div class="d-flex justify-content-center">Profile</div>
                </b-dropdown-item>
                <b-dropdown-item v-if="Authorization.Admin" v-on:click="config">
                  <div class="d-flex justify-content-center">Config</div>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <button v-on:click="signout" class="btn btn-wb btn-block">
                    Sign Out
                  </button>
                </b-dropdown-item>
              </div>
            </template>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import notification from "../components/Notification";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { directive as onClickaway } from "vue-clickaway";
export default {
  name: "navbar",
  directives: {
    onClickaway: onClickaway,
  },
  computed: {
    ...mapGetters("user_state", ["IsLoggedIn"]),
    ...mapState("user_state", ["user", "Authorization"]),
    ...mapState("notification_state", ["NewCount"]),
    AvatarName() {
      if (this.$store.state.user_state.user.name)
        return this.$store.state.user_state.user.name
          .split(" ")
          .map((str) => str[0])
          .join("");
      else return "NM";
    },
  },
  methods: {
    signout() {
      this.$store.dispatch("user_state/signout").then(() => {
        this.$router.push("/");
        this.$store.dispatch("ResetState");
      });
    },
    config() {
      this.$router.push("/organization/config/");
    },
    OpenNotification() {
      this.ShowNotifications = !this.ShowNotifications;
    },
    HideNotification() {
      this.ShowNotifications = false;
     
    },
  },
  components: {
    notification,
  },
  data: () => {
    return {
      ShowNotifications: false,
    };
  },
};
</script>
<style  scoped>
.dark {
  background-color: #000d0d;
}
.navbar-dark .navbar-nav .nav-link {
  color: white;
}
.dp {
  /* width: calc(200px + (400 - 200) * ((100vw - 300px) / (1600 - 300))); */
  width: 100%;
}
</style>
