<template>
  <div style="margin-top: 120px">
    <b-iconstack
      font-scale="4"
      class="position-fixed mr-auto"
      style="left: -22px; top: 50%"
      v-on:mouseover="Display = true"
    >
      <b-icon stacked icon="chevron-compact-right" variant="dark" scale="0.75"></b-icon>
      <b-icon stacked icon="circle" variant="dark"  shift-h="-3"></b-icon>
    </b-iconstack>

    <b-sidebar v-model="Display" id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
    <div class="container-fluid p-5">
      <b-card no-body class="shadow">
        <b-card-body>
          <b-row>
            <div class="col-4"></div>

            <div class="col text-center">
              <h3>Organizations</h3>
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
  data() {
    return {
      Display: false,
    };
  },
};
</script>

<style scoped>
a {
  color: #46b7de;
}

small {
  color: black;
}

small:hover {
  color: blue;
  text-decoration-color: blue;
}
</style>
