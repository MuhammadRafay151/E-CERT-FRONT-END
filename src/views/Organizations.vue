<template>
  <div style="margin-top: 120px">
    <div class="container-fluid p-5">
      <b-card no-body class="shadow">
        <b-card-body>
          <b-row>
            <div class="col-4"></div>

            <div class="col text-center">
              <h3 class="text-wb">Organizations</h3>
            </div>
            <div class="col text-left">
              <b-icon
                font-scale="2"
                class="float-right"
                icon="plus-square-fill"
                style="cursor: pointer"
                v-on:click="RegisterOrg"
                id="a1"
              ></b-icon>
              <b-tooltip target="a1" triggers="hover">
                Register new organization
              </b-tooltip>
            </div>
          </b-row>
        </b-card-body>
      </b-card>

      <OrganizationsDetails />
    </div>
  </div>
</template>

<script>
import OrganizationsDetails from "../components/Organizations";
export default {
  name: "OrganizationsView",
  components: {
    OrganizationsDetails,
  },
  methods: {
    RegisterOrg() {
      this.$router.push("register/organization");
    },
  },
 
};
</script>

